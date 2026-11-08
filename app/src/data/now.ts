// The Now page: a drawn study nook. The desk holds what I'm up to this month; the shelves hold
// my mugs and LEGO.
//
// To update for a new month, add a new entry at the TOP of NOW. Older entries stay below it and
// show up as the archive. Every [bracketed] line is a placeholder waiting for real content.

export type NowKey = 'learning' | 'building' | 'reading' | 'shooting' | 'listening'

// A line can be plain text, or text with a link
export type NowLine = string | { text: string; href: string }

export type NowEntry = {
  // Shown as "updated November 2026"
  month: string
} & Record<NowKey, NowLine>

export const NOW_LABELS: Record<NowKey, string> = {
  learning: 'Learning',
  building: 'Building',
  reading: 'Reading',
  shooting: 'Shooting',
  listening: 'Listening to',
}

// Newest first
export const NOW: NowEntry[] = [
  {
    month: 'November 2026',
    learning: 'animation',
    building: '[placeholder: what you’re building]',
    reading: '[placeholder: what you’re reading]',
    shooting: '[placeholder: what you’re photographing]',
    listening: '[placeholder: what you’re listening to]',
  },
  // Placeholder so the archive has something to show; delete it once there is a real older month
  {
    month: 'October 2026',
    learning: '[placeholder]',
    building: '[placeholder]',
    reading: '[placeholder]',
    shooting: '[placeholder]',
    listening: '[placeholder]',
  },
]

// The shelves. Each thing sits on shelf 1 (top) or 2, `x` percent from the left edge of the
// scene, `w` percent wide. A cut-out photo with a transparent background named after the id in
// assets/shelf (for example assets/shelf/mug-1.webp) replaces the drawn placeholder.
export type ShelfThing = { id: string; kind: 'mug' | 'lego'; label: string; shelf: 1 | 2; x: number; w: number }

export const SHELF: ShelfThing[] = [
  { id: 'mug-1', kind: 'mug', label: '[mug name]', shelf: 1, x: 9, w: 8 },
  { id: 'lego-1', kind: 'lego', label: '[LEGO set]', shelf: 1, x: 20.5, w: 10 },
  { id: 'mug-2', kind: 'mug', label: '[mug name]', shelf: 1, x: 34, w: 7.5 },
  { id: 'lego-2', kind: 'lego', label: '[LEGO set]', shelf: 2, x: 8, w: 12 },
  { id: 'mug-3', kind: 'mug', label: '[mug name]', shelf: 2, x: 23.5, w: 7.5 },
  { id: 'mug-4', kind: 'mug', label: '[mug name]', shelf: 2, x: 34, w: 8 },
]
