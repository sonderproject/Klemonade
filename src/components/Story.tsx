import { useRef } from 'react'
import { useGsapSetup } from '../anim'
import { useReducedMotion } from '../hooks'
import { Remi, Sparkle, Heart, Squiggle, WaveDivider } from '../art'
import photoBluerazzle from '../assets/photo-bluerazzle.jpg'
import photoCutecumber from '../assets/photo-cutecumber.jpg'

const INK = 'var(--color-ink)'

/** Polaroid scene: the original lemonade stand */
function SceneStand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 180" className={className} aria-hidden="true">
      <rect width="240" height="180" fill="var(--color-sky-soft)" />
      <circle cx="200" cy="34" r="22" fill="var(--color-lemon)" stroke={INK} strokeWidth="5" />
      {/* awning */}
      <rect x="28" y="22" width="150" height="16" fill="var(--color-pink)" stroke={INK} strokeWidth="5" />
      <g stroke={INK} strokeWidth="5">
        <path d="M28 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-cream)" />
        <path d="M53 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-pink)" />
        <path d="M78 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-cream)" />
        <path d="M103 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-pink)" />
        <path d="M128 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-cream)" />
        <path d="M153 38 a12.5 12 0 0 0 25 0 Z" fill="var(--color-pink)" />
      </g>
      {/* counter */}
      <rect x="36" y="118" width="134" height="46" rx="8" fill="var(--color-lemon)" stroke={INK} strokeWidth="5" />
      <text x="103" y="149" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="20" fill={INK}>¢25</text>
      {/* Remi peeking over the counter */}
      <g transform="translate(56 62) scale(0.48)">
        <Remi className="" />
      </g>
      {/* cup on counter */}
      <g transform="translate(140 92)">
        <path d="M0 0 L22 0 L19 26 L3 26 Z" fill="var(--color-pink-soft)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <line x1="14" y1="2" x2="20" y2="-12" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function Polaroid({
  scene,
  caption,
  className = '',
}: {
  scene: React.ReactNode
  caption: string
  className?: string
}) {
  return (
    <figure
      className={`story-polaroid relative w-56 rounded-xl border-3 border-ink bg-cream p-2.5 pb-1 sticker-shadow hover-wiggle md:w-64 ${className}`}
    >
      {/* tape strip */}
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 rounded-sm border-2 border-ink/30 bg-lemon/80" />
      <div className="overflow-hidden rounded-lg border-2 border-ink">{scene}</div>
      <figcaption className="py-2 text-center font-display text-sm font-bold">{caption}</figcaption>
    </figure>
  )
}

export function Story() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapSetup(
    root,
    (gsap) => {
      if (reducedMotion) return

      gsap.from('.story-line', {
        y: 70,
        opacity: 0,
        rotation: 2,
        duration: 0.7,
        ease: 'back.out(1.6)',
        stagger: 0.12,
        scrollTrigger: { trigger: '.story-type', start: 'top 75%' },
      })

      gsap.utils.toArray<HTMLElement>('.story-polaroid').forEach((el, i) => {
        gsap.from(el, {
          scale: 0.5,
          opacity: 0,
          rotation: i % 2 ? 14 : -14,
          duration: 0.6,
          ease: 'back.out(1.8)',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
        // gentle parallax drift, alternating directions
        gsap.to(el, {
          y: i % 2 ? -36 : 36,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        })
      })

      gsap.from('.story-quote', {
        scale: 0,
        rotation: -10,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.story-quote', start: 'top 85%' },
      })
    },
    [reducedMotion],
  )

  return (
    <section ref={root} id="story" className="relative overflow-hidden bg-pink-soft pb-24 pt-10 md:pb-32">
      {/* texture */}
      <div aria-hidden="true" className="bg-halftone absolute left-0 top-24 h-48 w-48 text-pink/30 md:h-72 md:w-72" />
      <div aria-hidden="true" className="bg-checker absolute -right-6 bottom-40 h-24 w-48 rotate-6 text-lemon/60 md:w-72" />
      <Sparkle className="absolute right-[8%] top-16 w-8 md:w-12" fill="var(--color-sky)" />
      <Heart className="absolute left-[5%] bottom-24 w-10 -rotate-12 md:w-14" fill="var(--color-tang)" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <span className="inline-block -rotate-2 rounded-full border-3 border-ink bg-lemon px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider sticker-shadow-sm">
          Our story・ものがたり
        </span>

        <div className="mt-10 flex flex-col gap-12 md:flex-row md:items-start md:gap-8">
          {/* editorial type block */}
          <div className="story-type md:w-1/2">
            <h2 className="font-display font-extrabold leading-[1.02] tracking-tight">
              <span className="story-line block text-4xl md:text-6xl">Made in</span>
              <span className="story-line block -rotate-1 text-5xl text-pink text-outline-cream-[0.05em] [text-shadow:0.04em_0.05em_0_var(--color-ink)] md:text-7xl">
                Normal Heights.
              </span>
              <span className="story-line mt-3 block text-4xl md:text-6xl">Powered by</span>
              <span className="story-line block rotate-1 text-6xl text-sky-deep text-outline-cream-[0.05em] [text-shadow:0.04em_0.05em_0_var(--color-ink)] md:text-8xl">
                The JOI.
              </span>
            </h2>

            <p className="story-line mt-8 max-w-md font-body text-lg font-medium leading-relaxed">
              Hi, I’m K’LE JOI — born and raised right here in Normal Heights, San Diego.
              What started as a
              <em className="px-1 font-bold not-italic [background:linear-gradient(transparent_55%,var(--color-lemon)_55%)]">
                weekend lemonade stand
              </em>
              got its big break at PHATCAMP, where I first sold my homemade lemonades
              between softball games with my mom.
            </p>
            <p className="story-line mt-4 max-w-md font-body text-lg font-medium leading-relaxed">
              I mix every flavor myself and put my whole personality into every cup — so
              pretty soon people weren’t just buying lemonade, they were coming back for
              <em className="px-1 font-bold not-italic [background:linear-gradient(transparent_55%,var(--color-pink-soft)_55%)]">
                The JOI
              </em>
              . Your tips and support go straight into my school trips, sports, and
              activities. Instead of asking, I work for my extras — my own hard-earned coins.
            </p>
            <p className="story-line mt-4 max-w-md font-body text-lg font-medium leading-relaxed">
              I’m 14, still mixing, blending, and dreaming big — proof that small ideas can
              grow into something real. One day:
              <em className="px-1 font-bold not-italic [background:linear-gradient(transparent_55%,var(--color-lemon)_55%)]">
                a K’LEmonade Bar
              </em>
              with endless flavors and a whole lot of community. Until then, see you at the stand.
            </p>

            <Squiggle className="story-line mt-8 w-40" stroke="var(--color-pink)" />
          </div>

          {/* sticker collage */}
          <div className="relative mx-auto h-[660px] w-full max-w-sm md:h-[700px] md:w-1/2 md:max-w-none">
            <Polaroid
              scene={<SceneStand className="block" />}
              caption="the OG weekend stand ☀️"
              className="absolute left-0 top-0 -rotate-6"
            />
            <Polaroid
              scene={
                <img
                  src={photoBluerazzle}
                  alt="A cup of bright teal-blue Bluerazzle lemonade with a lemon wheel and blue ice"
                  loading="lazy"
                  width="800"
                  height="1000"
                  className="block w-full border-3 border-lemon"
                />
              }
              caption="Bluerazzle, fresh pour・ブルー"
              className="absolute right-0 top-28 rotate-4"
            />
            <Polaroid
              scene={
                <img
                  src={photoCutecumber}
                  alt="A cup of green Cute-cumber lemonade held up in the sunshine"
                  loading="lazy"
                  width="800"
                  height="998"
                  className="block w-full border-3 border-lemon"
                />
              }
              caption="Cute-cumber — today’s special・きゅうり"
              className="absolute bottom-0 left-6 -rotate-3 md:left-10"
            />
            <Sparkle className="absolute -left-4 top-52 w-9" />
            <Sparkle className="absolute right-2 top-6 w-6" fill="var(--color-tang)" />
          </div>
        </div>

        {/* pull quote busting the grid */}
        <div className="story-quote relative mx-auto mt-20 max-w-2xl -rotate-2 md:mt-28">
          <blockquote className="rounded-[2.5rem] border-3 border-ink bg-cream px-8 py-8 text-center sticker-shadow-lg md:px-14 md:py-10">
            <p className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
              “People come back for <span className="text-pink-deep">The JOI</span>.”
            </p>
            <footer className="mt-3 font-body text-base font-bold text-ink/90">— K’LE JOI, founder, age 14・ジョイ</footer>
          </blockquote>
          {/* speech tail */}
          <span aria-hidden="true" className="absolute -bottom-5 left-16 h-10 w-10 rotate-45 border-b-3 border-r-3 border-ink bg-cream" />
          <Remi className="absolute -right-6 -top-10 w-24 rotate-12 md:-right-12 md:w-28" mood="wow" />
        </div>
      </div>

      {/* wave into find-us */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <WaveDivider fill="var(--color-sky-soft)" className="h-10 md:h-16" />
      </div>
    </section>
  )
}
