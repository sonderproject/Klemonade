import { useEffect, useRef } from 'react'
import type { Map as LeafletMap } from 'leaflet'
import { useGsapSetup } from '../anim'
import { useReducedMotion } from '../hooks'
import { Sparkle, LemonSlice, WaveDivider } from '../art'

// PLACEHOLDER schedule — replace with the client's confirmed markets/hours.
const MARKETS = [
  {
    name: 'Hillcrest Farmers Market',
    day: 'Sundays',
    hours: '9:00am – 2:00pm',
    address: '3960 Normal St, San Diego, CA',
    coords: [32.7489, -117.1515] as [number, number],
    color: 'var(--color-pink)',
    badge: 'bg-lemon',
  },
  {
    name: 'Little Italy Mercato',
    day: 'Saturdays',
    hours: '8:00am – 2:00pm',
    address: '501 W Date St, San Diego, CA',
    coords: [32.7221, -117.1714] as [number, number],
    color: 'var(--color-tang)',
    badge: 'bg-tang',
  },
  {
    name: 'Pacific Beach Farmers Market',
    day: 'Tuesdays',
    hours: '2:00pm – 6:00pm',
    address: 'Bayard St at Garnet Ave, San Diego, CA',
    coords: [32.7975, -117.2517] as [number, number],
    color: 'var(--color-sky-deep)',
    badge: 'bg-sky',
  },
]

/** Brand map pin rendered as a Leaflet divIcon. */
const pinSvg = (color: string) => `
<svg viewBox="0 0 48 60" width="38" height="48" style="filter:drop-shadow(2px 3px 0 rgba(67,39,59,0.3))">
  <path d="M24 58 C10 40 3 30 3 21 A21 21 0 0 1 45 21 C45 30 38 40 24 58 Z" fill="${color}" stroke="#43273B" stroke-width="4" stroke-linejoin="round"/>
  <circle cx="24" cy="21" r="9" fill="#FFF7E0" stroke="#43273B" stroke-width="3.5"/>
  <circle cx="24" cy="21" r="4.5" fill="#FFE14D" stroke="#43273B" stroke-width="2.5"/>
</svg>`

export function FindUs() {
  const root = useRef<HTMLElement>(null)
  const mapEl = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Lazy-init Leaflet only when the section approaches the viewport.
  useEffect(() => {
    let map: LeafletMap | null = null
    let cancelled = false
    const el = mapEl.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        void Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]).then(([{ default: L }]) => {
          if (cancelled || !mapEl.current) return
          map = L.map(mapEl.current, { scrollWheelZoom: false, attributionControl: true })
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map)
          const bounds = L.latLngBounds(MARKETS.map((m) => m.coords))
          map.fitBounds(bounds, { padding: [44, 44] })
          for (const m of MARKETS) {
            L.marker(m.coords, {
              icon: L.divIcon({ html: pinSvg(m.color), className: '', iconSize: [38, 48], iconAnchor: [19, 48] }),
              alt: m.name,
            })
              .addTo(map)
              .bindPopup(`<b>${m.name}</b><br>${m.day} · ${m.hours}`)
          }
        })
      },
      { rootMargin: '400px' },
    )
    io.observe(el)

    return () => {
      cancelled = true
      io.disconnect()
      map?.remove()
    }
  }, [])

  useGsapSetup(
    root,
    (gsap) => {
      if (reducedMotion) return
      gsap.from('.findus-card', {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.55,
        ease: 'back.out(1.7)',
        stagger: 0.15,
        scrollTrigger: { trigger: '.findus-grid', start: 'top 75%' },
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
            Catch us at San Diego farmers markets — follow the sparkles (and the line of happy people).
          </p>
        </div>

        {/* map + weekly schedule */}
        <div className="findus-grid mt-12 flex flex-col gap-6 md:flex-row md:items-stretch">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] border-3 border-ink bg-cream sticker-shadow-lg md:w-3/5 md:min-h-105 md:rounded-[3rem]">
            <div
              ref={mapEl}
              className="absolute inset-0 z-0"
              role="region"
              aria-label="Map of San Diego farmers markets where K’LEmonade pops up"
            />
            <span className="pointer-events-none absolute right-4 top-3 z-[500] -rotate-2 rounded-full border-2 border-ink bg-lemon px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider sticker-shadow-sm md:text-sm">
              this week ☆ 今週
            </span>
          </div>

          <ul className="flex flex-col justify-center gap-4 md:w-2/5">
            {MARKETS.map((m, i) => (
              <li
                key={m.name}
                className={`findus-card rounded-3xl border-3 border-ink bg-cream px-5 py-4 sticker-shadow ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
              >
                <span
                  className={`inline-block rounded-full border-2 border-ink px-3 py-0.5 font-display text-xs font-extrabold uppercase tracking-wider text-ink ${m.badge}`}
                >
                  {m.day}
                </span>
                <p className="mt-2 font-display text-xl font-extrabold leading-tight md:text-2xl">{m.name}</p>
                <p className="mt-1 font-body text-sm font-bold">{m.hours}</p>
                <p className="font-body text-sm font-medium text-ink/90">{m.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center font-body text-base font-medium">
          Schedule shifts with the seasons — check our socials (down below ↓) before you roll up.
          Every cup (and tip!) goes toward school trips, sports, and big dreams. それ、かわいい！
        </p>
      </div>

      {/* wave into footer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <WaveDivider fill="var(--color-ink)" className="h-10 md:h-16" />
      </div>

      <Sparkle className="absolute bottom-24 left-[6%] w-8 hover-wiggle md:w-12" fill="var(--color-pink)" />
      <Sparkle className="absolute right-[8%] top-32 w-7 hover-wiggle md:w-10" fill="var(--color-tang)" />
    </section>
  )
}
