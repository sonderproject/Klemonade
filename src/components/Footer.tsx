import { Marquee } from './Marquee'
import { Remi, Sparkle } from '../art'

const SOCIALS = [
  { label: 'Instagram', short: 'IG', bg: 'bg-pink', text: 'text-cream' },
  { label: 'TikTok', short: 'TT', bg: 'bg-sky', text: 'text-ink' },
  { label: 'YouTube', short: 'YT', bg: 'bg-tang', text: 'text-cream' },
  { label: 'X', short: 'X', bg: 'bg-lemon', text: 'text-ink' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-8 text-cream">
      <Marquee
        items={['SQUEEZE THE DAY', 'レモネード', 'STAY JUICY', 'キラキラ', 'K LEMONADE']}
        fast
        className="rotate-1 border-y-3 border-cream/20 bg-lemon py-2.5 font-display text-lg font-extrabold uppercase text-ink md:text-xl"
      />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 pt-14 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Remi className="w-16 -rotate-6" />
            <p className="font-jp text-xl text-lemon">レモネード</p>
          </div>
          <p className="mt-4 max-w-xs font-body text-sm font-medium text-cream/70">
            Made with real fruit and unreasonable amounts of joy in Los Angeles, CA.
          </p>
        </div>

        <nav className="flex items-center gap-3" aria-label="Social media">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href="#top"
              aria-label={s.label}
              className={`flex h-12 w-12 items-center justify-center rounded-full border-3 border-cream font-display text-base font-extrabold sticker-shadow-sm hover-wiggle ${s.bg} ${s.text}`}
            >
              {s.short}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 px-5 font-body text-xs font-semibold text-cream/50 md:text-sm">
        <span>© 2026 K Lemonade</span>
        <Sparkle className="w-3" fill="var(--color-lemon)" />
        <span>Stay juicy・またね！</span>
        <Sparkle className="w-3" fill="var(--color-pink)" />
        <span>100% recyclable cans</span>
      </div>

      {/* oversized cropped wordmark */}
      <div aria-hidden="true" className="pointer-events-none mt-6 select-none overflow-hidden">
        <p className="translate-y-[32%] whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-none tracking-tight text-lemon md:text-[16.5vw]">
          K&nbsp;LEMONADE
        </p>
      </div>
    </footer>
  )
}
