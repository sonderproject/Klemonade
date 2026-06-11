import { useRef } from 'react'
import { useGsapSetup } from '../anim'
import { useReducedMotion } from '../hooks'
import { Remi, Kori, Ichigo, Sparkle, Heart, Squiggle, LemonSlice, WaveDivider } from '../art'
import { Polaroid } from './Story'

// Served from /public with a stable name so story/index.html can preload it
// (it's the page's LCP element).
const photoStand = '/photo-stand.webp'

/** Marker-highlighted phrase, same treatment as the home page. */
function Mark({ children, color = 'lemon' }: { children: React.ReactNode; color?: 'lemon' | 'pink' }) {
  const bg = color === 'lemon' ? 'var(--color-lemon)' : 'var(--color-pink-soft)'
  return (
    <em
      className="px-1 font-bold not-italic"
      style={{ background: `linear-gradient(transparent 55%, ${bg} 55%)` }}
    >
      {children}
    </em>
  )
}

type Chapter = {
  no: string
  badge: string
  dot: string
  paras: React.ReactNode[]
}

const CHAPTERS: Chapter[] = [
  {
    no: '01',
    badge: 'The Roots・ルーツ',
    dot: 'bg-lemon',
    paras: [
      <>
        My name is K’LE JOI, and K’LEmonade started right here in the{' '}
        <Mark>Normal Heights community</Mark> — the place I’ve proudly called home my entire
        life.
      </>,
      <>
        Growing up, I watched my family support local businesses, neighborhood events, schools,
        and community gatherings. This community helped raise me, and I wanted to find a way to
        give a little <Mark color="pink">JOI back</Mark> — while learning responsibility and
        entrepreneurship along the way.
      </>,
    ],
  },
  {
    no: '02',
    badge: 'The Spark・きっかけ',
    dot: 'bg-pink-soft',
    paras: [
      <>
        What started as a small weekend lemonade stand quickly became something bigger. While
        playing softball with my mom, I was given an opportunity to vend my homemade lemonades
        at <Mark>PHATCAMP</Mark>. That’s where K’LEmonade truly came to life.
      </>,
      <>
        I began creating fun flavors, mixing ingredients, and putting my own personality into
        every cup. Before long, people weren’t just buying lemonade — they were coming back for{' '}
        <Mark color="pink">“The JOI.”</Mark>
      </>,
    ],
  },
  {
    no: '03',
    badge: 'The Hustle・がんばり',
    dot: 'bg-sky',
    paras: [
      <>
        Here’s something many people don’t know: much of the support, tips, and donations I’ve
        received through K’LEmonade has gone right back into my{' '}
        <Mark>school wants and extras</Mark>. Activities, events, trips, sports — all the fun
        things students want to be part of — can get expensive.
      </>,
      <>
        Instead of always asking for things, I decided to work for them and spend my own{' '}
        <Mark color="pink">hard-earned coins</Mark>.
      </>,
    ],
  },
  {
    no: '04',
    badge: 'The Lesson・まなび',
    dot: 'bg-tang',
    paras: [
      <>
        K’LEmonade has taught me the value of <Mark>hard work, consistency, community</Mark> —
        and believing in myself.
      </>,
      <>
        My hope is not only to keep sharing delicious lemonades, but to inspire other young
        people to create something of their own, work toward their goals, and discover that{' '}
        <Mark color="pink">they can make things happen for themselves</Mark>.
      </>,
    ],
  },
  {
    no: '05',
    badge: 'The Dream・ゆめ',
    dot: 'bg-mint',
    paras: [
      <>
        At just 14 years old, I’m still mixing, blending, creating, and dreaming big. One day, I
        hope to open a <Mark>K’LEmonade Bar</Mark> — endless flavors, fresh ingredients, and a
        space filled with community, creativity, and love.
      </>,
    ],
  },
]

export function FullStory() {
  const root = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGsapSetup(
    root,
    (gsap) => {
      if (reducedMotion) return

      gsap.from('.fs-intro', {
        y: 60,
        opacity: 0,
        rotation: 1.5,
        duration: 0.7,
        ease: 'back.out(1.7)',
        stagger: 0.12,
      })
      gsap.from('.fs-photo', {
        scale: 0.6,
        opacity: 0,
        rotation: 14,
        duration: 0.7,
        ease: 'back.out(1.6)',
        delay: 0.3,
      })
      gsap.utils.toArray<HTMLElement>('.fs-chapter').forEach((el) => {
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 0.65,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
      gsap.from('.fs-quote', {
        scale: 0,
        rotation: -8,
        duration: 0.7,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.fs-quote', start: 'top 85%' },
      })
      gsap.from('.fs-signoff', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.fs-signoff', start: 'top 88%' },
      })
    },
    [reducedMotion],
  )

  return (
    <article ref={root}>
      {/* ---- compact hero ---- */}
      <section className="relative overflow-hidden bg-cream px-5 pb-16 pt-28 md:pb-24 md:pt-36">
        <div aria-hidden="true" className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-lemon-soft blur-3xl" />
        <div aria-hidden="true" className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-pink-soft blur-3xl" />
        <div aria-hidden="true" className="bg-halftone absolute right-8 top-24 h-36 w-36 text-pink/25 md:h-56 md:w-56" />
        <p
          aria-hidden="true"
          className="writing-vertical absolute left-3 top-32 hidden select-none font-jp text-xl tracking-[0.4em] text-sky-deep/60 lg:block"
        >
          ものがたり
        </p>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
          <div className="text-center md:w-1/2 md:text-left">
            <span className="fs-intro inline-block -rotate-2 rounded-full border-3 border-ink bg-pink-soft px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider sticker-shadow-sm">
              The full story・ものがたり
            </span>
            <h1 className="mt-5 font-display font-extrabold leading-[0.98] tracking-tight">
              <span className="fs-intro block text-5xl md:text-6xl">One stand.</span>
              <span className="fs-intro block -rotate-1 text-5xl text-pink text-outline-cream-[0.05em] [text-shadow:0.04em_0.05em_0_var(--color-ink)] md:text-6xl">
                Seven flavors.
              </span>
              <span className="fs-intro block rotate-1 text-6xl text-sky-deep text-outline-cream-[0.05em] [text-shadow:0.04em_0.05em_0_var(--color-ink)] md:text-7xl">
                Endless JOI.
              </span>
            </h1>
            <p className="fs-intro mx-auto mt-6 max-w-md font-body text-lg font-medium md:mx-0">
              Pull up a chair — here’s the whole thing, straight from the founder,
              in her own words.
            </p>
          </div>

          <div className="fs-photo relative md:w-1/2">
            <Polaroid
              scene={
                <img
                  src={photoStand}
                  alt="K’LE JOI smiling behind her K’LEmonade stand — pink banner, jugs of fresh lemonade, and a sunny parking-lot market"
                  width="768"
                  height="844"
                  fetchPriority="high"
                  className="block w-full border-3 border-lemon"
                />
              }
              caption="the real stand, IRL ☀️ 本物"
              className="mx-auto rotate-2 !w-72 md:!w-96"
            />
            <Sparkle className="absolute -left-5 -top-5 w-10 hover-wiggle" fill="var(--color-tang)" />
            <Heart className="absolute -bottom-4 -right-3 w-12 -rotate-12 hover-wiggle" />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <WaveDivider fill="var(--color-pink-soft)" className="h-10 md:h-16" />
        </div>
      </section>

      {/* ---- the letter, chapter by chapter ---- */}
      <section className="relative overflow-hidden bg-pink-soft px-5 pb-24 pt-14 md:pb-32 md:pt-20">
        <div aria-hidden="true" className="bg-checker absolute -left-8 top-40 h-24 w-44 -rotate-6 text-lemon/60 md:w-64" />
        <div aria-hidden="true" className="bg-halftone absolute bottom-32 right-0 h-44 w-44 text-pink/30 md:h-64 md:w-64" />
        <LemonSlice className="absolute -right-8 top-16 w-24 -rotate-12 opacity-70 md:w-32" />

        <div className="mx-auto max-w-2xl">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.no} className="fs-chapter relative flex gap-5 md:gap-8">
              {/* timeline rail */}
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-3 border-ink font-display text-base font-extrabold sticker-shadow-sm ${ch.dot} ${i % 2 ? 'rotate-6' : '-rotate-6'}`}
                >
                  {ch.no}
                </span>
                {i < CHAPTERS.length - 1 && (
                  <span aria-hidden="true" className="my-2 w-0 flex-1 border-l-3 border-dashed border-ink/25" />
                )}
              </div>

              {/* chapter body */}
              <div className={`pb-10 md:pb-12 ${i === CHAPTERS.length - 1 ? 'pb-0 md:pb-0' : ''}`}>
                <h2
                  className={`inline-block rounded-full border-3 border-ink bg-cream px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider sticker-shadow-sm md:text-base ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
                >
                  {ch.badge}
                </h2>
                {ch.paras.map((p, j) => (
                  <p key={j} className="mt-4 font-body text-lg font-medium leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* pull quote drops in after The Lesson */}
                {ch.no === '04' && (
                  <div className="fs-quote relative mt-10 -rotate-2">
                    <blockquote className="rounded-[2rem] border-3 border-ink bg-cream px-7 py-6 text-center sticker-shadow-lg md:px-10">
                      <p className="font-display text-2xl font-extrabold leading-tight md:text-4xl">
                        “Even <span className="text-pink-deep">small ideas</span> can grow into
                        something meaningful.”
                      </p>
                    </blockquote>
                    <span aria-hidden="true" className="absolute -bottom-4 left-12 h-8 w-8 rotate-45 border-b-3 border-r-3 border-ink bg-cream" />
                    <Remi className="absolute -right-4 -top-9 w-20 rotate-12 md:-right-8" mood="wow" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* sign-off */}
          <div className="fs-signoff mt-14 text-center md:mt-20">
            <Squiggle className="mx-auto w-36" stroke="var(--color-pink)" />
            <p className="mt-6 font-body text-lg font-medium">stay juicy, squeeze the day —</p>
            <p className="mt-2 font-display text-5xl font-extrabold tracking-tight text-pink text-outline-cream-[0.05em] [text-shadow:0.04em_0.05em_0_var(--color-ink)] md:text-6xl">
              K’LE JOI <span aria-hidden="true">♡</span>
            </p>
            <p className="mt-2 font-body text-sm font-bold text-ink/90">founder, flavor scientist, age 14・ジョイ</p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <WaveDivider fill="var(--color-sky-soft)" className="h-10 md:h-16" />
        </div>
      </section>

      {/* ---- come say hi ---- */}
      <section className="relative overflow-hidden bg-sky-soft px-5 pb-28 pt-14 md:pb-32 md:pt-16">
        <Kori className="absolute left-[6%] top-10 w-14 -rotate-6 animate-bob-slow md:w-20" />
        <Ichigo className="absolute right-[7%] top-16 w-12 rotate-6 animate-bob md:w-16" />
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-4xl font-extrabold leading-none tracking-tight md:text-6xl">
            COME SAY <span className="text-pink-deep">HI.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-lg font-medium">
            The story’s still being squeezed — the next chapter happens at the stand.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href="../#find-us"
              className="btn-puffy inline-flex min-h-12 items-center bg-pink px-8 font-display text-xl font-extrabold text-ink"
            >
              Find Us This Week
            </a>
            <a
              href="../#flavors"
              className="btn-puffy inline-flex min-h-12 items-center bg-lemon px-8 font-display text-xl font-extrabold"
            >
              Peep the Flavors
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <WaveDivider fill="var(--color-ink)" className="h-10 md:h-16" />
        </div>
      </section>
    </article>
  )
}
