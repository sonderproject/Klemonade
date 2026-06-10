import { useRef } from 'react'
import { useGsapSetup } from '../anim'
import { useIsDesktop, useReducedMotion } from '../hooks'
import { LemonadeCup, LemonSlice, Sparkle, Heart, Kori, Ichigo, Squiggle, WaveDivider } from '../art'

type Flavor = {
  name: string
  jp: string
  tagline: string
  desc: string
  sour: number
  bg: string
  deep: string
  cup: { drink: string; accent: string; face: string; mood: 'happy' | 'wow' | 'wink' }
  ingredients: string[]
  deco: 'lemon' | 'pink' | 'sky' | 'tang'
}

// TODO(confirm with client): final flavor lineup before launch.
const FLAVORS: Flavor[] = [
  {
    name: 'STRAWBEEZY',
    jp: 'いちご',
    tagline: 'Strawberry sweet, easy breezy.',
    desc: 'Crushed strawberries folded into the fresh squeeze. The stand’s forever crush.',
    sour: 2,
    bg: '#ff5a6e',
    deep: '#e03a50',
    cup: { drink: '#ff7585', accent: '#e03a50', face: '#ffc2ca', mood: 'wow' },
    ingredients: ['crushed strawberries', 'lemon juice', 'cane sugar'],
    deco: 'pink',
  },
  {
    name: 'MANGO GO',
    jp: 'マンゴー',
    tagline: 'Golden mango on the move.',
    desc: 'Juicy mango swirled into the classic squeeze. Sunshine with a passport.',
    sour: 2,
    bg: 'var(--color-tang)',
    deep: 'var(--color-tang-deep)',
    cup: { drink: '#ffb23e', accent: 'var(--color-tang-deep)', face: '#ffd9a3', mood: 'happy' },
    ingredients: ['ripe mango', 'lemon juice', 'cane sugar'],
    deco: 'tang',
  },
  {
    name: 'BLUERAZZLE',
    jp: 'ブルー',
    tagline: 'Blue razz with extra dazzle.',
    desc: 'Electric blue raspberry swirling over fresh lemonade — the bluest thing at the market.',
    sour: 3,
    bg: 'var(--color-sky)',
    deep: 'var(--color-sky-deep)',
    cup: { drink: '#3ecfe0', accent: 'var(--color-sky-deep)', face: 'var(--color-sky-soft)', mood: 'wink' },
    ingredients: ['blue raspberry', 'lemon juice', 'lemon wheel'],
    deco: 'sky',
  },
  {
    name: 'CUTE-CUMBER',
    jp: 'きゅうり',
    tagline: 'Cool as a, well… you know.',
    desc: 'Garden cucumber pressed with lemon. Today’s-special energy, every single time.',
    sour: 2,
    bg: '#7ed957',
    deep: '#54b32e',
    cup: { drink: '#a4dd55', accent: '#54b32e', face: '#d3f0a8', mood: 'happy' },
    ingredients: ['fresh cucumber', 'lemon juice', 'tiny mint'],
    deco: 'lemon',
  },
  {
    name: 'COCONUTTY',
    jp: 'ココナッツ',
    tagline: 'A little nutty, a lotta creamy.',
    desc: 'Toasted coconut cream meets the squeeze. A beach nap in a cup.',
    sour: 1,
    bg: '#d9a36b',
    deep: '#b07a42',
    cup: { drink: '#f3e4c8', accent: '#b07a42', face: '#f7ecd8', mood: 'wow' },
    ingredients: ['coconut cream', 'lemon juice', 'toasted coconut'],
    deco: 'tang',
  },
  {
    name: 'SUNJOI',
    jp: 'サンジョイ',
    tagline: 'Pure sun, pure joy.',
    desc: 'The OG fresh squeeze that started it all — lemons, cane sugar, big smile.',
    sour: 4,
    bg: 'var(--color-lemon)',
    deep: 'var(--color-lemon-deep)',
    cup: { drink: '#ffd21f', accent: 'var(--color-lemon-deep)', face: 'var(--color-lemon)', mood: 'happy' },
    ingredients: ['real lemon juice', 'cane sugar', 'pinch of sea salt'],
    deco: 'lemon',
  },
  {
    name: 'MINT-T',
    jp: 'ミント',
    tagline: 'Fresh to def-mint.',
    desc: 'Cool garden mint muddled into the squeeze. Brain freeze’s polite cousin.',
    sour: 3,
    bg: 'var(--color-mint)',
    deep: '#3ec594',
    cup: { drink: '#8df0c9', accent: '#3ec594', face: '#d2f8e8', mood: 'wink' },
    ingredients: ['garden mint', 'lemon juice', 'cane sugar'],
    deco: 'sky',
  },
]

function SourMeter({ level }: { level: number }) {
  return (
    <div className="inline-flex rotate-1 items-center gap-2 rounded-full border-3 border-ink bg-cream px-4 py-2 sticker-shadow-sm">
      <span className="font-display text-sm font-extrabold uppercase tracking-wide">Sour&nbsp;level</span>
      <span className="flex gap-1" role="img" aria-label={`Sourness ${level} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-full border-2 border-ink ${i < level ? 'bg-lemon-deep' : 'bg-cream'}`}
          />
        ))}
      </span>
    </div>
  )
}

function PanelDeco({ kind }: { kind: Flavor['deco'] }) {
  switch (kind) {
    case 'lemon':
      return (
        <>
          <LemonSlice className="absolute left-[6%] top-[16%] w-16 -rotate-12 md:w-28" />
          <LemonSlice className="absolute bottom-[18%] right-[8%] w-12 rotate-12 md:w-20" />
          <Sparkle className="absolute right-[16%] top-[20%] w-7 md:w-12" fill="var(--color-cream)" />
          <Sparkle className="absolute bottom-[30%] left-[12%] w-5 md:w-8" fill="var(--color-pink)" />
        </>
      )
    case 'pink':
      return (
        <>
          <Ichigo className="absolute left-[7%] top-[18%] w-14 -rotate-12 md:w-24" />
          <Heart className="absolute bottom-[20%] right-[7%] w-10 rotate-12 md:w-16" fill="var(--color-pink-soft)" />
          <Heart className="absolute right-[14%] top-[14%] w-7 -rotate-6 md:w-10" fill="var(--color-lemon)" />
          <Sparkle className="absolute bottom-[32%] left-[13%] w-5 md:w-8" fill="var(--color-cream)" />
        </>
      )
    case 'sky':
      return (
        <>
          <Kori className="absolute left-[6%] top-[17%] w-14 -rotate-6 md:w-24" />
          <span className="absolute right-[10%] top-[22%] h-8 w-8 rounded-full border-3 border-ink bg-white/60 md:h-12 md:w-12" />
          <span className="absolute bottom-[26%] right-[18%] h-5 w-5 rounded-full border-2 border-ink bg-white/60 md:h-7 md:w-7" />
          <span className="absolute bottom-[36%] left-[10%] h-6 w-6 rounded-full border-2 border-ink bg-white/60 md:h-9 md:w-9" />
          <Sparkle className="absolute left-[16%] top-[30%] w-5 md:w-8" fill="var(--color-cream)" />
        </>
      )
    case 'tang':
      return (
        <>
          <Squiggle className="absolute left-[6%] top-[18%] w-24 -rotate-6 md:w-40" stroke="var(--color-cream)" />
          <Sparkle className="absolute right-[10%] top-[16%] w-8 md:w-14" fill="var(--color-lemon)" />
          <Sparkle className="absolute bottom-[24%] left-[10%] w-6 md:w-9" fill="var(--color-cream)" />
          <LemonSlice className="absolute bottom-[16%] right-[7%] w-12 rotate-45 md:w-20" />
        </>
      )
  }
}

function FlavorPanel({ flavor, index }: { flavor: Flavor; index: number }) {
  return (
    <article
      className="fl-panel relative flex h-svh w-screen shrink-0 snap-center flex-col items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: flavor.bg }}
    >
      {/* ghost number */}
      <span
        aria-hidden="true"
        className="fl-num text-outline-[3px] pointer-events-none absolute -top-4 left-2 font-display text-[55vw] font-extrabold leading-none text-transparent opacity-20 md:-top-16 md:text-[30rem]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div aria-hidden="true" className="bg-halftone absolute bottom-10 right-4 h-36 w-36 text-ink/15 md:h-56 md:w-56" />
      <PanelDeco kind={flavor.deco} />

      {/* katakana */}
      <span aria-hidden="true" className="writing-vertical absolute right-4 top-1/4 hidden select-none font-jp text-3xl text-ink/40 md:block">
        {flavor.jp}
      </span>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-2 md:flex-row md:justify-center md:gap-10">
        {/* cup */}
        <div className="fl-cup-wrap relative shrink-0">
          <LemonadeCup
            className="w-40 rotate-3 drop-shadow-[8px_10px_0_rgba(67,39,59,0.25)] md:w-72"
            drink={flavor.cup.drink}
            accent={flavor.cup.accent}
            face={flavor.cup.face}
            mood={flavor.cup.mood}
          />
        </div>

        {/* words */}
        <div className="flex max-w-md flex-col items-center text-center md:items-start md:text-left">
          <h3 className="-rotate-2 font-display text-6xl font-extrabold leading-[0.95] text-cream text-outline-[0.045em] [text-shadow:0.05em_0.06em_0_var(--color-ink)] md:text-8xl">
            {flavor.name}
          </h3>
          <p className="mt-4 inline-block -rotate-1 rounded-2xl border-3 border-ink bg-cream px-4 py-2 font-display text-lg font-bold sticker-shadow-sm md:text-2xl">
            {flavor.tagline}
          </p>
          <p className="mt-4 max-w-sm rounded-2xl bg-cream/80 px-4 py-2 font-body text-base font-medium text-ink md:text-lg">
            {flavor.desc}
          </p>
          <div className="mt-5">
            <SourMeter level={flavor.sour} />
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
            {flavor.ingredients.map((ing, i) => (
              <li
                key={ing}
                className={`rounded-full border-3 border-ink bg-cream/90 px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-wide sticker-shadow-sm md:text-sm ${
                  i % 2 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                {ing}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function Flavors() {
  const root = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const reducedMotion = useReducedMotion()
  const pinned = isDesktop && !reducedMotion

  useGsapSetup(
    root,
    (gsap) => {
      if (!pinned || !trackRef.current || !pinRef.current) return
      const track = trackRef.current
      const distance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          end: () => '+=' + distance(),
        },
      })

      gsap.utils.toArray<HTMLElement>('.fl-panel').forEach((panel) => {
        const num = panel.querySelector('.fl-num')
        const cup = panel.querySelector('.fl-cup-wrap')
        if (num) {
          gsap.from(num, {
            xPercent: 30,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }
        if (cup) {
          gsap.from(cup, {
            y: 140,
            rotation: 12,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: 'left 85%',
              end: 'left 25%',
              scrub: true,
            },
          })
        }
      })
    },
    [pinned],
  )

  return (
    <section ref={root} id="flavors" className="relative bg-cream">
      {/* section heading */}
      <div className="relative z-10 flex flex-col items-center px-4 pb-10 pt-16 text-center md:pb-14 md:pt-24">
        <span className="rotate-2 rounded-full border-3 border-ink bg-sky px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-wider text-ink sticker-shadow-sm">
          ★ The menu・メニュー
        </span>
        <h2 className="mt-4 font-display text-5xl font-extrabold leading-none tracking-tight md:text-7xl">
          SEVEN FLAVORS,
          <br />
          <span className="text-pink-deep">ZERO CHILL.</span>
        </h2>
        <p className="mt-4 max-w-md font-body text-lg font-medium">
          Every cup squeezed fresh at the stand.{' '}
          {pinned ? 'Keep scrolling to meet them all.' : 'Swipe to meet them all. →'}
        </p>
      </div>

      {/* showcase */}
      <div ref={pinRef} className="relative">
        <div className={pinned ? 'h-svh overflow-hidden' : 'snap-x snap-mandatory overflow-x-auto overscroll-x-contain'}>
          <div ref={trackRef} className="flex w-max">
            {FLAVORS.map((flavor, i) => (
              <FlavorPanel key={flavor.name} flavor={flavor} index={i} />
            ))}
          </div>
        </div>

        {/* framing waves overlay whichever panel is visible */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <WaveDivider fill="var(--color-cream)" flip className="h-10 md:h-16" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <WaveDivider fill="var(--color-pink-soft)" className="h-10 md:h-16" />
        </div>

        {/* mobile swipe hint */}
        {!pinned && (
          <span className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border-3 border-ink bg-cream px-4 py-1.5 font-display text-sm font-extrabold sticker-shadow-sm">
            swipe → スワイプ
          </span>
        )}
      </div>
    </section>
  )
}
