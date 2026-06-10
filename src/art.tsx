/**
 * K Lemonade original art set — every asset is hand-drawn inline SVG.
 * Remi (レミ) the lemon, Kori the ice cube, Ichigo the strawberry,
 * plus sparkles, slices and the section wave dividers.
 */

const INK = 'var(--color-ink)'

type ArtProps = { className?: string }

/** Remi — the K Lemonade mascot. mood: happy (closed eyes) | wow (round eyes) */
export function Remi({ className, mood = 'happy' }: ArtProps & { mood?: 'happy' | 'wow' }) {
  return (
    <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
      {/* nubs (drawn under the body so their inner strokes hide) */}
      <circle cx="22" cy="102" r="13" fill="var(--color-lemon)" stroke={INK} strokeWidth="6" />
      <circle cx="178" cy="102" r="13" fill="var(--color-lemon)" stroke={INK} strokeWidth="6" />
      {/* body */}
      <ellipse cx="100" cy="102" rx="80" ry="62" fill="var(--color-lemon)" stroke={INK} strokeWidth="6" />
      {/* dimple highlight */}
      <ellipse cx="68" cy="74" rx="16" ry="9" fill="#fff" opacity="0.55" transform="rotate(-24 68 74)" />
      {/* leaf cowlick */}
      <g transform="translate(124 14) rotate(14)">
        <path d="M0 28 Q4 2 30 0 Q28 26 0 28 Z" fill="var(--color-mint)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
        <path d="M0 28 Q-16 10 -34 16 Q-22 36 0 28 Z" fill="var(--color-mint)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
      {/* face */}
      {mood === 'happy' ? (
        <g stroke={INK} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M66 96 q9 -11 18 0" />
          <path d="M116 96 q9 -11 18 0" />
        </g>
      ) : (
        <g fill={INK}>
          <circle cx="75" cy="95" r="7.5" />
          <circle cx="125" cy="95" r="7.5" />
          <circle cx="77.5" cy="92.5" r="2.4" fill="#fff" />
          <circle cx="127.5" cy="92.5" r="2.4" fill="#fff" />
        </g>
      )}
      {/* open smile + tongue */}
      <path d="M90 108 Q100 126 110 108 Q100 112 90 108 Z" fill={INK} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M95 114 Q100 119 105 114 Q100 121 95 114 Z" fill="var(--color-pink)" />
      {/* blush */}
      <ellipse cx="56" cy="112" rx="10" ry="6" fill="var(--color-pink)" opacity="0.6" />
      <ellipse cx="144" cy="112" rx="10" ry="6" fill="var(--color-pink)" opacity="0.6" />
    </svg>
  )
}

/** Kori — wobbly ice-cube buddy */
export function Kori({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <rect x="12" y="14" width="96" height="96" rx="24" fill="var(--color-sky-soft)" stroke={INK} strokeWidth="6" />
      <path d="M30 34 q10 -10 24 -8" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="45" cy="62" r="5" fill={INK} />
      <circle cx="79" cy="62" r="5" fill={INK} />
      <path d="M50 80 q6 6 12 0 q6 6 12 0" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
      <ellipse cx="34" cy="74" rx="7" ry="4.5" fill="var(--color-pink)" opacity="0.55" />
      <ellipse cx="90" cy="74" rx="7" ry="4.5" fill="var(--color-pink)" opacity="0.55" />
    </svg>
  )
}

/** Ichigo — winking strawberry pal */
export function Ichigo({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 130" className={className} aria-hidden="true">
      <path
        d="M60 122 C30 104 14 82 14 58 C14 38 32 26 60 26 C88 26 106 38 106 58 C106 82 90 104 60 122 Z"
        fill="var(--color-pink)" stroke={INK} strokeWidth="6" strokeLinejoin="round"
      />
      <g transform="translate(60 22)">
        <path d="M0 8 L-26 -2 L-8 -10 L-14 -22 L0 -12 L14 -22 L8 -10 L26 -2 Z" fill="var(--color-mint)" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      </g>
      <g fill="var(--color-cream)">
        <ellipse cx="34" cy="56" rx="3" ry="4.4" />
        <ellipse cx="86" cy="56" rx="3" ry="4.4" />
        <ellipse cx="60" cy="48" rx="3" ry="4.4" />
        <ellipse cx="42" cy="84" rx="3" ry="4.4" />
        <ellipse cx="78" cy="84" rx="3" ry="4.4" />
        <ellipse cx="60" cy="104" rx="3" ry="4.4" />
      </g>
      {/* wink */}
      <circle cx="47" cy="68" r="4.6" fill={INK} />
      <path d="M66 68 q7 -7 14 0" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M54 78 q7 7 14 0" stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Four-point kawaii sparkle */
export function Sparkle({ className, fill = 'var(--color-lemon)' }: ArtProps & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M50 2 Q56 42 98 50 Q56 58 50 98 Q44 58 2 50 Q44 42 50 2 Z" fill={fill} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    </svg>
  )
}

/** Lemon slice wheel */
export function LemonSlice({ className }: ArtProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="var(--color-lemon)" stroke={INK} strokeWidth="6" />
      <circle cx="60" cy="60" r="42" fill="var(--color-cream)" />
      <g stroke="var(--color-lemon-deep)" strokeWidth="5" strokeLinecap="round">
        <line x1="72" y1="60" x2="96" y2="60" />
        <line x1="66" y1="70.4" x2="78" y2="91.2" />
        <line x1="54" y1="70.4" x2="42" y2="91.2" />
        <line x1="48" y1="60" x2="24" y2="60" />
        <line x1="54" y1="49.6" x2="42" y2="28.8" />
        <line x1="66" y1="49.6" x2="78" y2="28.8" />
      </g>
      <circle cx="60" cy="60" r="7" fill="var(--color-lemon-deep)" />
    </svg>
  )
}

/** Squiggle doodle accent */
export function Squiggle({ className, stroke = 'var(--color-pink)' }: ArtProps & { stroke?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" fill="none">
      <path d="M4 20 Q24 0 44 20 Q64 40 84 20 Q104 0 124 20 Q144 40 164 20 Q184 0 196 16" stroke={stroke} strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

/** Puffy heart */
export function Heart({ className, fill = 'var(--color-pink)' }: ArtProps & { fill?: string }) {
  return (
    <svg viewBox="0 0 100 92" className={className} aria-hidden="true">
      <path
        d="M50 86 C20 64 4 46 4 28 C4 12 16 4 28 4 C38 4 46 10 50 18 C54 10 62 4 72 4 C84 4 96 12 96 28 C96 46 80 64 50 86 Z"
        fill={fill} stroke={INK} strokeWidth="6" strokeLinejoin="round"
      />
      <ellipse cx="30" cy="24" rx="9" ry="6" fill="#fff" opacity="0.6" transform="rotate(-28 30 24)" />
    </svg>
  )
}

/**
 * Parametric lemonade cup — clear plastic, a flavor swirl layered over the
 * lemonade base (just like the real pours), round sticker label, ice + wheel.
 */
export function LemonadeCup({
  className,
  drink,
  accent,
  face,
  mood = 'happy',
}: ArtProps & {
  drink: string
  accent: string
  face: string
  mood?: 'happy' | 'wow' | 'wink'
}) {
  return (
    <svg viewBox="0 0 170 250" className={className} aria-hidden="true">
      {/* straw */}
      <path d="M104 38 L122 -6" stroke={INK} strokeWidth="15" strokeLinecap="round" />
      <path d="M104 38 L122 -6" stroke="var(--color-sky)" strokeWidth="9" strokeLinecap="round" />
      {/* plastic cup body */}
      <path
        d="M25 44 L39 212 Q41 232 62 232 L108 232 Q129 232 131 212 L145 44 Z"
        fill="#ffffff" opacity="0.55"
      />
      {/* flavor swirl layer */}
      <path
        d="M33 72 Q85 82 137 72 L130 150 Q110 159 85 151 Q60 143 40 151 Z"
        fill={drink}
      />
      {/* lemonade base layer */}
      <path
        d="M40 151 Q60 143 85 151 Q110 159 130 150 L125 212 Q123 226 106 226 L64 226 Q47 226 45 212 Z"
        fill="var(--color-lemon-soft)"
      />
      {/* condensation sheen */}
      <path d="M40 70 L50 190" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.45" />
      <circle cx="118" cy="100" r="3" fill="#fff" opacity="0.5" />
      <circle cx="112" cy="124" r="2.2" fill="#fff" opacity="0.5" />
      {/* round sticker label (like the IRL cup stickers) */}
      <circle cx="85" cy="150" r="28" fill="var(--color-cream)" stroke={INK} strokeWidth="4" />
      <circle cx="85" cy="148" r="19" fill={face} stroke={INK} strokeWidth="4" />
      {mood === 'happy' && (
        <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M75 145 q4.5 -5.5 9 0" />
          <path d="M88 145 q4.5 -5.5 9 0" />
          <path d="M81 154 q4 5 8 0" />
        </g>
      )}
      {mood === 'wow' && (
        <g>
          <circle cx="78" cy="144" r="3.2" fill={INK} />
          <circle cx="92" cy="144" r="3.2" fill={INK} />
          <ellipse cx="85" cy="155" rx="4.5" ry="5.5" fill={INK} />
        </g>
      )}
      {mood === 'wink' && (
        <g>
          <circle cx="78" cy="144" r="3.2" fill={INK} />
          <path d="M88 144 q4.5 -5 9 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M80 153 q5 6 10 0" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )}
      <ellipse cx="71" cy="151" rx="4" ry="2.8" fill="var(--color-pink)" opacity="0.6" />
      <ellipse cx="99" cy="151" rx="4" ry="2.8" fill="var(--color-pink)" opacity="0.6" />
      <path d="M85 173 l1.6 3.8 3.8 0.5 -2.7 2.7 0.8 3.8 -3.5 -2 -3.5 2 0.8 -3.8 -2.7 -2.7 3.8 -0.5 Z" fill={accent} />
      {/* cup outline */}
      <path
        d="M25 44 L39 212 Q41 232 62 232 L108 232 Q129 232 131 212 L145 44"
        fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round"
      />
      {/* ice peeking over the rim */}
      <rect x="58" y="22" width="22" height="22" rx="7" fill={accent} opacity="0.85" stroke={INK} strokeWidth="3.5" transform="rotate(-12 69 33)" />
      <rect x="92" y="18" width="20" height="20" rx="6.5" fill="var(--color-sky-soft)" stroke={INK} strokeWidth="3.5" transform="rotate(10 102 28)" />
      {/* rim */}
      <ellipse cx="85" cy="44" rx="60" ry="13" fill="#fff" opacity="0.8" />
      <ellipse cx="85" cy="44" rx="60" ry="13" fill="none" stroke={INK} strokeWidth="5" />
      <ellipse cx="85" cy="44" rx="48" ry="8.5" fill="none" stroke={INK} strokeWidth="2.5" opacity="0.4" />
      {/* lemon wheel on the rim */}
      <g transform="translate(42 32)">
        <circle r="20" fill="var(--color-lemon)" stroke={INK} strokeWidth="4.5" />
        <circle r="14" fill="var(--color-cream)" />
        <g stroke="var(--color-lemon-deep)" strokeWidth="3" strokeLinecap="round">
          <line x1="4" y1="0" x2="12" y2="0" />
          <line x1="2" y1="3.5" x2="6" y2="10.4" />
          <line x1="-2" y1="3.5" x2="-6" y2="10.4" />
          <line x1="-4" y1="0" x2="-12" y2="0" />
          <line x1="-2" y1="-3.5" x2="-6" y2="-10.4" />
          <line x1="2" y1="-3.5" x2="6" y2="-10.4" />
        </g>
        <circle r="2.6" fill="var(--color-lemon-deep)" />
      </g>
    </svg>
  )
}

/** Organic wavy divider between sections. Sits flush against the section below. */
export function WaveDivider({
  fill,
  flip = false,
  className = '',
}: {
  fill: string
  flip?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className={`block w-full ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 58 C120 96 280 14 460 40 C640 66 760 8 940 34 C1120 60 1280 24 1440 50 L1440 90 L0 90 Z"
        fill={fill}
      />
    </svg>
  )
}
