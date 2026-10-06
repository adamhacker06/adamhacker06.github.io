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
