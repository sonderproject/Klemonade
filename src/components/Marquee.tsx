import type { ReactNode } from 'react'
import { Sparkle } from '../art'

/**
 * Infinite brand ticker. Content is duplicated once and slid -50% on loop,
 * so the scroll is seamless. CSS reduced-motion rules freeze it in place.
 */
export function Marquee({
  items,
  className = '',
  fast = false,
  separator,
}: {
  items: string[]
  className?: string
  fast?: boolean
  separator?: ReactNode
}) {
  const sep = separator ?? <Sparkle className="h-[0.8em] w-[0.8em] shrink-0" />
  const strip = (
    <div className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10">
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6 md:gap-10">
          <span className="whitespace-nowrap">{item}</span>
          {sep}
        </span>
      ))}
    </div>
  )

  return (
    <div className={`flex overflow-hidden ${className}`} aria-hidden="true">
      <div className={`flex w-max ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {strip}
        {strip}
      </div>
    </div>
  )
}
