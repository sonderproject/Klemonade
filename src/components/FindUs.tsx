import { useRef } from 'react'
import { useGsapSetup } from '../anim'
import { useReducedMotion } from '../hooks'
import { Sparkle, LemonSlice, WaveDivider } from '../art'

const INK = 'var(--color-ink)'

const SPOTS: { name: string; note: string; x: string; y: string; color: string }[] = [
  { name: 'Venice Boardwalk', note: 'OG stand・since day one', x: '12%', y: '58%', color: 'var(--color-pink)' },
  { name: 'Santa Monica Pier', note: 'weekends + sunsets', x: '30%', y: '24%', color: 'var(--color-tang)' },
  { name: 'Silver Lake', note: 'farmers market sat.', x: '56%', y: '14%', color: 'var(--color-sky-deep)' },
  { name: 'Little Tokyo', note: 'pop-up・ポップアップ', x: '72%', y: '52%', color: 'var(--color-pink-deep)' },
]

/** Hand-drawn map doodles behind the pins */
function MapDoodle() {
  return (
    <svg viewBox="0 0 600 360" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* roads */}
      <g stroke={INK} strokeWidth="4" strokeDasharray="12 10" strokeLinecap="round" fill="none" opacity="0.35">
        <path d="M-10 240 Q150 180 300 220 Q450 260 610 190" />
        <path d="M120 -10 Q160 120 90 250 Q60 310 110 370" />
        <path d="M420 -10 Q380 110 460 200 Q520 270 480 370" />
      </g>
      {/* ocean corner */}
      <g stroke="var(--color-sky-deep)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M10 320 q15 -12 30 0 q15 12 30 0" />
        <path d="M30 345 q15 -12 30 0 q15 12 30 0" />
      </g>
      {/* sun */}
      <circle cx="544" cy="46" r="22" fill="var(--color-lemon)" stroke={INK} strokeWidth="4.5" />
      <g stroke={INK} strokeWidth="4" strokeLinecap="round">
        <line x1="544" y1="10" x2="544" y2="18" />
        <line x1="516" y1="22" x2="522" y2="28" />
        <line x1="572" y1="22" x2="566" y2="28" />
      </g>
      {/* palm */}
      <g transform="translate(60 80)">
        <path d="M0 60 Q6 28 4 6" stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none" />
        <g fill="var(--color-mint)" stroke={INK} strokeWidth="4" strokeLinejoin="round">
          <path d="M4 8 Q-22 -8 -40 6 Q-18 14 4 8 Z" />
          <path d="M4 8 Q30 -8 48 6 Q26 14 4 8 Z" />
          <path d="M4 8 Q0 -22 -14 -30 Q-4 -8 4 8 Z" />
          <path d="M4 8 Q12 -22 26 -28 Q12 -6 4 8 Z" />
        </g>
      </g>
    </svg>
  )
}

function Pin({ spot }: { spot: (typeof SPOTS)[number] }) {
  return (
    <div className="findus-pin group absolute -translate-x-1/2 -translate-y-full" style={{ left: spot.x, top: spot.y }}>
      <svg viewBox="0 0 48 60" className="mx-auto w-9 drop-shadow-[2px_3px_0_rgba(67,39,59,0.3)] transition-transform group-hover:-translate-y-1 md:w-11" aria-hidden="true">
        <path d="M24 58 C10 40 3 30 3 21 A21 21 0 0 1 45 21 C45 30 38 40 24 58 Z" fill={spot.color} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <circle cx="24" cy="21" r="9" fill="var(--color-cream)" stroke={INK} strokeWidth="3.5" />
        <circle cx="24" cy="21" r="4.5" fill="var(--color-lemon)" stroke={INK} strokeWidth="2.5" />
      </svg>
      <div className="mt-1 -rotate-2 rounded-xl border-2 border-ink bg-cream px-2.5 py-1 text-center sticker-shadow-sm">
        <p className="font-display text-xs font-extrabold leading-tight md:text-sm">{spot.name}</p>
        <p className="font-body text-[10px] font-semibold text-ink/90 md:text-xs">{spot.note}</p>
      </div>
    </div>
  )
}

export function FindUs() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapSetup(
    root,
    (gsap) => {
      if (reducedMotion) return
      gsap.from('.findus-pin', {
        y: -40,
        opacity: 0,
        scale: 0.3,
        duration: 0.55,
        ease: 'bounce.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.findus-map', start: 'top 70%' },
      })
      gsap.from('.findus-cta', {
        scale: 0.6,
        opacity: 0,
        rotation: 4,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.findus-cta', start: 'top 85%' },
      })
    },
    [reducedMotion],
  )

  return (
    <section ref={root} id="find-us" className="relative overflow-hidden bg-sky-soft pb-28 pt-14 md:pb-36 md:pt-20">
      <div aria-hidden="true" className="bg-halftone absolute right-0 top-10 h-44 w-44 text-sky-deep/25 md:h-64 md:w-64" />
      <LemonSlice className="absolute -left-8 top-1/3 w-24 rotate-12 opacity-70 md:w-36" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <span className="inline-block rotate-1 rounded-full border-3 border-ink bg-lemon px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider text-ink sticker-shadow-sm">
            IRL・どこで買える？
          </span>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
            FIND YOUR <span className="text-pink-deep">SQUEEZE.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg font-medium">
            Catch us around LA — follow the sparkles (and the line of happy people).
          </p>
        </div>

        {/* the map */}
        <div className="findus-map relative mx-auto mt-12 h-105 max-w-3xl rounded-[2rem] border-3 border-ink bg-cream sticker-shadow-lg md:h-120 md:rounded-[3rem]">
          <MapDoodle />
          {SPOTS.map((spot) => (
            <Pin key={spot.name} spot={spot} />
          ))}
          <span className="absolute bottom-4 right-5 -rotate-2 font-display text-xs font-extrabold uppercase tracking-wider text-ink/90 md:text-sm">
            not to scale, obviously ☆
          </span>
        </div>

        {/* order CTA */}
        <div className="findus-cta relative mx-auto mt-16 max-w-xl -rotate-1 rounded-[2.5rem] border-3 border-ink bg-lemon px-6 py-9 text-center sticker-shadow-lg md:px-12">
          <Sparkle className="absolute -left-5 -top-5 w-12 hover-wiggle" fill="var(--color-pink)" />
          <Sparkle className="absolute -bottom-4 -right-4 w-9 hover-wiggle" fill="var(--color-sky)" />
          <h3 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">
            Not in LA? <span className="text-pink-deep">We ship.</span>
          </h3>
          <p className="mt-2 font-body text-base font-medium md:text-lg">
            Four-packs, merch, and a mystery sticker in every single box. それ、かわいい！
          </p>
          <a
            href="#top"
            className="btn-puffy mt-6 inline-flex min-h-13 items-center bg-pink px-10 font-display text-2xl font-extrabold text-ink"
          >
            Order Online
          </a>
          <p className="mt-3 font-body text-sm font-bold text-ink/90">free shipping over $25 ・ stickers always free</p>
        </div>
      </div>

      {/* wave into footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <WaveDivider fill="var(--color-ink)" className="h-10 md:h-16" />
      </div>
    </section>
  )
}
