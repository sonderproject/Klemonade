import { useEffect, type RefObject } from 'react'

type Gsap = (typeof import('gsap'))['gsap']
type GsapContext = ReturnType<Gsap['context']>

let gsapPromise: Promise<Gsap> | null = null

/** Load GSAP + ScrollTrigger on demand (kept out of the critical bundle). */
export function loadGsap(): Promise<Gsap> {
  gsapPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
    core.gsap.registerPlugin(st.ScrollTrigger)
    return core.gsap
  })
  return gsapPromise
}

/**
 * Run a GSAP setup function inside a reverted-on-cleanup context, with the
 * library itself fetched at browser idle so it never blocks first paint.
 */
export function useGsapSetup(
  scope: RefObject<HTMLElement | null>,
  setup: (gsap: Gsap) => void,
  deps: readonly unknown[] = [],
) {
  useEffect(() => {
    let ctx: GsapContext | null = null
    let cancelled = false

    const start = () => {
      void loadGsap().then((g) => {
        if (cancelled) return
        ctx = g.context(() => setup(g), scope.current ?? undefined)
      })
    }

    const w = window as Window &
      Partial<{
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number
        cancelIdleCallback: (id: number) => void
      }>
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 350)

    return () => {
      cancelled = true
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else window.clearTimeout(id)
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
