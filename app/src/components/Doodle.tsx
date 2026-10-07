// The marker layer: hand-drawn strokes that sit on top of the typeset page.
// Everything here is decorative and hidden from screen readers.
import type { ReactNode } from 'react'

export type Pen = 'blue' | 'amber'

const PATHS = {
  squiggle: { viewBox: '0 0 120 8', d: 'M2 5 C 22 1, 44 8, 66 4 S 100 6, 118 3' },
  underline: { viewBox: '0 0 340 12', d: 'M3 6 C 60 1, 130 10, 200 5 S 290 8, 337 3' },
  loop: {
    viewBox: '0 0 108 60',
    d: 'M52 8 C 20 6, 4 22, 8 36 C 12 52, 60 56, 88 50 C 104 46, 100 14, 78 9 C 62 5, 40 7, 30 12',
  },
  ticks: { viewBox: '0 0 44 44', d: 'M38 40 L26 30 M22 42 L6 34 M40 24 L32 8' },
  arrow: { viewBox: '0 0 60 44', d: 'M56 5 C 38 2, 16 10, 9 36 M4 24 L9 37 L21 30' },
  star: { viewBox: '0 0 44 44', d: 'M22 4 L27 16 L40 17 L30 26 L33 39 L22 32 L10 39 L14 26 L4 17 L17 16 Z' },
  grid: { viewBox: '0 0 44 44', d: 'M6 6 H18 V18 H6 Z M26 6 H38 V18 H26 Z M6 26 H18 V38 H6 Z M26 26 H38 V38 H26 Z' },
  single: { viewBox: '0 0 44 44', d: 'M5 8 H39 V36 H5 Z M5 30 L15 20 L23 28 L29 22 L39 31' },
  close: { viewBox: '0 0 44 44', d: 'M9 9 L35 35 M35 9 L9 35' },
  left: { viewBox: '0 0 44 44', d: 'M28 7 L13 22 L28 37' },
  right: { viewBox: '0 0 44 44', d: 'M16 7 L31 22 L16 37' },
  envelope: { viewBox: '0 0 44 44', d: 'M4 9 H40 V35 H4 Z M4 10 L22 25 L40 10' },
  arrowRight: { viewBox: '0 0 60 44', d: 'M4 36 C 12 14, 34 8, 53 20 M47.5 6.5 L53 20 L38.5 20.5' },
}

type DoodleProps = {
  shape: keyof typeof PATHS
  pen?: Pen
  className?: string
  stretch?: boolean
}

export function Doodle({ shape, pen, className = '', stretch = true }: DoodleProps) {
  const { viewBox, d } = PATHS[shape]
  return (
    <svg
      className={['doodle', pen, className].filter(Boolean).join(' ')}
      viewBox={viewBox}
      preserveAspectRatio={stretch ? 'none' : undefined}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export function Underlined({ children, pen = 'blue' }: { children: ReactNode; pen?: Pen }) {
  return (
    <span className="underlined">
      {children}
      <Doodle shape="underline" pen={pen} />
    </span>
  )
}

// Dashed frame; the parent needs the `framed` class.
export function Frame({ pen = 'blue' }: { pen?: Pen }) {
  return (
    <svg className={`doodle frame ${pen}`} aria-hidden="true">
      <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="4" />
    </svg>
  )
}

// Roughening filter used by every Frame; rendered once in the layout.
export function RoughFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="7" />
      </filter>
    </svg>
  )
}
