import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks'

const COLORS = ['var(--color-pink)', 'var(--color-lemon-deep)', 'var(--color-sky)', 'var(--color-tang)']
const SPARKLE_PATH =
  'M50 2 Q56 42 98 50 Q56 58 50 98 Q44 58 2 50 Q44 42 50 2 Z'

/** Desktop-only sparkle trail that follows the cursor. */
export function SparkleCursor() {
  const finePointer = useFinePointer()
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const lastSpawn = useRef(0)

  useEffect(() => {
    if (!finePointer || reducedMotion) return

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastSpawn.current < 55) return
      lastSpawn.current = now

      const container = containerRef.current
      if (!container || container.childElementCount > 18) return

      const size = 8 + Math.random() * 12
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      el.setAttribute('viewBox', '0 0 100 100')
      el.style.cssText = `position:fixed;left:${e.clientX + (Math.random() * 28 - 14)}px;top:${
        e.clientY + (Math.random() * 28 - 14)
      }px;width:${size}px;height:${size}px;pointer-events:none;animation:sparkle-fly 0.7s ease-out forwards;`
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', SPARKLE_PATH)
      path.setAttribute('fill', COLORS[Math.floor(Math.random() * COLORS.length)])
      el.appendChild(path)
      el.addEventListener('animationend', () => el.remove())
      container.appendChild(el)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [finePointer, reducedMotion])

  if (!finePointer || reducedMotion) return null
  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />
}
