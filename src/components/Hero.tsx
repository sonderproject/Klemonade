import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useGsapSetup } from '../anim'
import { useIsDesktop, useReducedMotion } from '../hooks'
import { Remi, Kori, Ichigo, Sparkle, LemonSlice, Heart } from '../art'
import { Marquee } from './Marquee'

const HeroScene = lazy(() => import('./HeroScene'))

/** Static kawaii composition for mobile / reduced-motion (no WebGL cost). */
function HeroFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Remi className="absolute left-1/2 top-[68%] w-52 -translate-x-1/2 animate-bob md:top-[56%] md:w-80" />
      <LemonSlice className="absolute left-[4%] top-[19%] w-14 rotate-12 animate-bob-slow md:w-24" />
      <LemonSlice className="absolute right-[4%] top-[66%] w-14 -rotate-12 animate-bob md:w-20" />
      <Kori className="absolute left-[7%] top-[72%] w-16 -rotate-6 animate-bob md:w-24" />
      <Ichigo className="absolute right-[5%] top-[18%] w-12 rotate-6 animate-bob-slow md:w-20" />
      <Sparkle className="absolute left-[15%] top-[51%] w-6 md:w-10" />
      <Sparkle className="absolute right-[16%] top-[49%] w-5 md:w-8" fill="var(--color-tang)" />
      <Sparkle className="absolute right-[40%] top-[12%] w-5 md:w-7" fill="var(--color-sky)" />
    </div>
  )
}

function SplitWord({ word, className = '' }: { word: string; className?: string }) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {word.split('').map((ch, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()
  const reducedMotion = useReducedMotion()
  const [sceneReady, setSceneReady] = useState(false)

  const useScene = isDesktop && !reducedMotion

  // Defer the Three.js chunk until the browser is idle so it never
  // competes with first paint.
  useEffect(() => {
    if (!useScene) return
    const w = window as Window &
      Partial<{
        requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number
        cancelIdleCallback: (id: number) => void
      }>
    const show = () => setSceneReady(true)
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(show, { timeout: 1500 })
      : window.setTimeout(show, 600)
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [useScene])

  useGsapSetup(
    root,
    (gsap) => {
      if (reducedMotion) return
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.9)' } })
      tl.from('.hero-char', {
        y: 90,
        opacity: 0,
        rotation: () => gsap.utils.random(-18, 18),
        duration: 0.7,
        stagger: 0.035,
      })
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.5 }, '-=0.35')
        .from('.hero-cta', { scale: 0, rotation: -8, duration: 0.45, stagger: 0.12 }, '-=0.25')
        .from('.hero-badge', { scale: 0, rotation: 25, duration: 0.5, stagger: 0.15 }, '-=0.4')
    },
    [reducedMotion],
  )

  return (
    <section ref={root} id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-cream">
      {/* ambient color blobs */}
      <div aria-hidden="true" className="absolute -left-32 top-12 h-96 w-96 rounded-full bg-pink-soft blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-sky-soft blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-24 left-1/4 h-72 w-72 rounded-full bg-lemon-soft blur-3xl" />
      <div aria-hidden="true" className="bg-halftone absolute right-6 top-24 h-40 w-40 text-pink/25 md:h-64 md:w-64" />
      <div aria-hidden="true" className="bg-halftone absolute bottom-32 left-4 h-32 w-32 text-sky/25 md:h-48 md:w-48" />

      {/* 3D layer (desktop) / static art (mobile + reduced motion) */}
      {useScene && sceneReady ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroScene />
        </Suspense>
      ) : (
        <HeroFallback />
      )}

      {/* vertical katakana accent */}
      <p
        aria-hidden="true"
        className="writing-vertical absolute right-3 top-28 z-10 hidden select-none font-jp text-2xl tracking-[0.4em] text-pink/70 lg:block"
      >
        レモネード
      </p>
      <p
        aria-hidden="true"
        className="writing-vertical absolute left-3 top-1/3 z-10 hidden select-none font-jp text-xl tracking-[0.4em] text-sky-deep/60 lg:block"
      >
        キラキラ
      </p>

      {/* headline overlay */}
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-40 pt-28 text-center md:pb-44">
        <div className="hero-badge pointer-events-auto mb-5 -rotate-3 rounded-full border-3 border-ink bg-lemon px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider sticker-shadow-sm md:text-base">
          ☀️ Sun-squeezed in California
        </div>

        <h1 className="font-display font-extrabold leading-[0.92] tracking-tight">
          <span className="block text-[17vw] text-pink text-outline-cream-[0.06em] [text-shadow:0.045em_0.05em_0_var(--color-ink)] md:text-[9.5rem]">
            <SplitWord word="SQUEEZE" />
          </span>
          <span className="mt-1 block text-[13vw] text-sky-deep text-outline-cream-[0.06em] [text-shadow:0.045em_0.05em_0_var(--color-ink)] md:text-[7.25rem]">
            <SplitWord word="THE" className="mr-[0.35em]" />
            <SplitWord word="DAY!" />
          </span>
        </h1>

        <p className="hero-sub mt-6 max-w-md font-body text-lg font-medium md:text-xl">
          Kawaii lemonade with West Coast sunshine in every can.
          Meet <span className="px-0.5 font-bold [background:linear-gradient(transparent_55%,var(--color-lemon)_55%)]">Remi</span> — your new juiciest friend.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <span className="hero-cta inline-block">
            <a
              href="#find-us"
              className="btn-puffy pointer-events-auto flex min-h-12 items-center bg-pink px-8 font-display text-xl font-extrabold text-ink"
            >
              Find a Stand
            </a>
          </span>
          <span className="hero-cta inline-block">
            <a
              href="#flavors"
              className="btn-puffy pointer-events-auto flex min-h-12 items-center bg-lemon px-8 font-display text-xl font-extrabold"
            >
              Peep the Flavors
            </a>
          </span>
        </div>
      </div>

      {/* corner stickers */}
      <div className="hero-badge absolute bottom-36 right-4 z-10 rotate-6 md:bottom-40 md:right-12">
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-3 border-ink bg-tang text-center font-display text-xs font-extrabold uppercase leading-tight text-ink sticker-shadow hover-wiggle md:h-28 md:w-28 md:text-sm">
          <span>100%</span>
          <span>Real</span>
          <span>Lemons</span>
        </div>
      </div>
      <div className="hero-badge absolute bottom-40 left-4 z-10 -rotate-12 md:left-12">
        <Heart className="w-14 hover-wiggle md:w-16" />
      </div>

      {/* bottom marquee strip */}
      <Marquee
        items={['K LEMONADE', 'レモネード', 'SQUEEZE THE DAY', 'すっぱい！', 'WEST COAST KAWAII']}
        className="relative z-10 -rotate-1 border-y-3 border-ink bg-pink py-3 font-display text-xl font-extrabold uppercase text-ink md:text-2xl"
      />
    </section>
  )
}
