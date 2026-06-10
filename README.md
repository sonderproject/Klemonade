# K Lemonade 🍋

Single-page marketing site for **K Lemonade** — fresh-squeezed kawaii lemonade
served by the cup at San Diego farmers markets. Starring **Remi** (レミ), our
original lemon mascot, plus Kori the ice cube and Ichigo the strawberry.
Illustrations are hand-drawn inline SVG; the logo lockup and cup photos are
client assets (processed via `scripts/prep-assets.mjs` from the originals at the
repo root — `IMG_6974.png` is the old sticker sheet, reference only, never shown
on the site).

> TODO(confirm with client): final flavor lineup (`src/components/Flavors.tsx`)
> and the farmers-market schedule placeholders (`src/components/FindUs.tsx`).

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** — fully custom theme (palette, fonts, sticker shadows, puffy buttons, halftone/checker textures)
- **GSAP + ScrollTrigger** — loaded dynamically at browser idle (`src/anim.ts`), never in the critical bundle
- **three.js + react-three-fiber** — hero 3D scene, lazy-loaded on desktop only
- **Leaflet + OpenStreetMap** — Find Us map (no API key), lazy-initialized via IntersectionObserver

## Commands

```sh
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve dist/
```

Dev utilities (need `npx playwright install chromium`):

```sh
node scripts/shot.mjs / hero 1440 900 [scrollY]   # screenshot a viewport
node scripts/sweep.mjs                            # mobile sweep + reduced-motion check
node scripts/netcheck.mjs                         # verify per-viewport chunk loading (vs preview server)
```

## How the motion/perf budget works

- **Hero 3D** (`HeroScene.tsx`): procedural low-poly geometry (no model downloads),
  mounted only when viewport ≥ 768px, no `prefers-reduced-motion`, and the browser
  is idle. Mobile and reduced-motion get a static SVG composition instead —
  the three.js chunk (~225 KB gz) is never fetched on mobile.
- **GSAP** is imported via `loadGsap()` at `requestIdleCallback`; all scroll
  animations are created inside a `gsap.context` that reverts on unmount.
- **Flavors showcase**: GSAP-pinned horizontal scrub on desktop; native
  snap-scroll on mobile/reduced-motion (same DOM).
- **Fonts**: latin subsets of Baloo 2 + Outfit; the katakana accent face
  (Mochiy Pop One) is subset to the exact glyphs used (~5 KB,
  `src/assets/mochiy-pop-one-kana.woff2`).
- `prefers-reduced-motion` collapses every animation to a static state (CSS
  override + JS guards).

Lighthouse (mobile emulation, preview build): **Performance 95 · Accessibility 100 · Best Practices 100**.

## Structure

| Section | File | Notes |
|---|---|---|
| Nav | `components/Nav.tsx` | logo lockup, puffy CTA |
| Hero | `components/Hero.tsx` + `HeroScene.tsx` | 3D cup/lemons, split-char intro, marquee |
| Flavors | `components/Flavors.tsx` | 7 color worlds (the menu), parametric `LemonadeCup` art |
| Story | `components/Story.tsx` | editorial type + polaroid collage with real cup photos |
| Find Us | `components/FindUs.tsx` | Leaflet/OSM map of SD farmers markets + schedule cards |
| Footer | `components/Footer.tsx` | logo chip, cropped giant wordmark, fast marquee |
| Extras | `StickyCTA.tsx`, `SparkleCursor.tsx` | mobile CTA, desktop sparkle trail |

Brand tokens (colors, fonts, keyframes, utilities like `sticker-shadow`,
`btn-puffy`, `bg-halftone`, `text-outline-*`) live in `src/index.css`.
The SVG art library is `src/art.tsx`.
