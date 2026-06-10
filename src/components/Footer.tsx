import { Marquee } from './Marquee'
import { Sparkle } from '../art'
import logoLockup from '../assets/logo-lockup.png'

const SOCIALS = [
  { label: 'Instagram', short: 'IG', bg: 'bg-pink-soft' },
  { label: 'TikTok', short: 'TT', bg: 'bg-sky' },
  { label: 'YouTube', short: 'YT', bg: 'bg-tang' },
  { label: 'X', short: 'X', bg: 'bg-lemon' },
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
          <div className="inline-block -rotate-2 rounded-2xl border-3 border-ink bg-cream px-4 py-2.5 sticker-shadow">
            <img src={logoLockup} alt="K'Lemonade" className="h-9 w-auto md:h-10" width="720" height="167" />
          </div>
          <p className="mt-4 max-w-xs font-body text-sm font-medium text-cream/70">
            Made with real fruit and unreasonable amounts of joy in San Diego, CA.
          </p>
        </div>

        <nav className="flex items-center gap-3" aria-label="Social media">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href="#top"
              aria-label={`${s.short} — ${s.label}`}
              className={`flex h-12 w-12 items-center justify-center rounded-full border-3 border-cream font-display text-base font-extrabold text-ink sticker-shadow-sm hover-wiggle ${s.bg}`}
            >
              {s.short}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 px-5 font-body text-xs font-semibold text-cream/70 md:text-sm">
        <span>© 2026 K Lemonade</span>
        <Sparkle className="w-3" fill="var(--color-lemon)" />
        <span>Stay juicy・またね！</span>
        <Sparkle className="w-3" fill="var(--color-pink)" />
        <span>fresh-squeezed, always</span>
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
