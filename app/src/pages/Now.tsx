import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import { NOW, NOW_LABELS, SHELF } from '../data/now.ts'
import type { NowKey, NowLine, ShelfThing } from '../data/now.ts'

// The scene is drawn on a 1000 x 700 grid. Things are placed in percent of that box, standing on
// a surface: the top shelf's plank is at y 230, the lower shelf's at y 400, the desk's at y 560.
const SURFACE = { 1: 230, 2: 400, desk: 560 }
const above = (y: number) => `${((700 - y) / 700) * 100}%`

// The furniture, in navy ink: two shelves on brackets, a desk with a drawer, and a lamp
const FURNITURE = [
  'M50 230 H480 V244 H50 Z M100 244 V282 L138 244 M430 244 V282 L392 244',
  'M50 400 H480 V414 H50 Z M100 414 V452 L138 414 M430 414 V452 L392 414',
  'M20 560 H980 V578 H20 Z M60 578 V698 M940 578 V698 M690 578 V650 H900 V578 M775 614 H815',
  'M880 560 C 880 547, 950 547, 950 560 M915 551 L885 455 L935 395 M915 372 L985 398 L968 428 L898 400 Z',
]

// Placeholder line drawings, each in its own little box, standing on its bottom edge
const DRAWINGS = {
  mug: { viewBox: '0 0 80 76', d: 'M10 12 H56 V64 C 56 74, 10 74, 10 64 Z M56 24 C 76 24, 76 52, 56 52 M10 22 H56' },
  lego: { viewBox: '0 0 100 66', d: 'M5 22 H95 V63 H5 Z M14 22 V11 H30 V22 M42 22 V11 H58 V22 M70 22 V11 H86 V22' },
  reading: { viewBox: '0 0 120 92', d: 'M8 89 H112 V69 H8 Z M16 69 H104 V50 H16 Z M4 50 H98 V30 H4 Z M20 79 H92 M28 59 H92 M16 40 H78 M60 30 L72 4 L90 12 L80 30' },
  learning: { viewBox: '0 0 150 52', d: 'M8 48 L28 8 H74 V48 Z M74 48 V8 H120 L140 48 Z M38 18 H66 M34 27 H66 M29 36 H66 M86 18 H110 M86 27 H116 M100 44 L138 16 L142 20 L104 47 Z' },
  building: { viewBox: '0 0 220 146', d: 'M30 8 H190 V118 H30 Z M10 120 H210 L200 140 H20 Z M50 34 H100 M62 52 H150 M62 70 H130 M50 88 H84 M92 128 H128' },
  listening: { viewBox: '0 0 112 92', d: 'M20 70 V48 C 20 6, 92 6, 92 48 V70 M8 52 H28 V88 H8 Z M84 52 H104 V88 H84 Z' },
  frame: { viewBox: '0 0 120 90', d: 'M8 78 L42 40 L62 60 L80 44 L112 78 M88 28 A8 8 0 1 0 87.9 28' },
}

// Where each of this month's things sits: the shooting one is a framed photo on the wall,
// the rest stand on the desk
const DESK: { key: Exclude<NowKey, 'shooting'>; x: number; w: number }[] = [
  { key: 'reading', x: 7, w: 12 },
  { key: 'learning', x: 21, w: 15 },
  { key: 'building', x: 43, w: 22 },
  { key: 'listening', x: 69.5, w: 11 },
]

// Cut-out photos of the shelf things, named after their ids; anything without one is drawn
const shelfPhotos = import.meta.glob<string>('../assets/shelf/*.webp', { eager: true, query: '?url', import: 'default' })

function Drawing({ shape }: { shape: keyof typeof DRAWINGS }) {
  const { viewBox, d } = DRAWINGS[shape]
  return (
    <svg className="doodle" viewBox={viewBox} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

function lineText(line: NowLine) {
  return typeof line === 'string' ? line : line.text
}

function Line({ line }: { line: NowLine }) {
  if (typeof line === 'string') return <>{line}</>
  return (
    <a href={line.href} target="_blank" rel="noopener noreferrer">
      {line.text} ↗
    </a>
  )
}

function ShelfItem({ thing }: { thing: ShelfThing }) {
  const photo = shelfPhotos[`../assets/shelf/${thing.id}.webp`]
  return (
    <li className="thing shelf-thing" style={{ left: `${thing.x}%`, bottom: above(SURFACE[thing.shelf]), width: `${thing.w}%` } as CSSProperties}>
      <span className="hold" tabIndex={0} aria-label={thing.label}>
        {photo ? <img src={photo} alt="" /> : <Drawing shape={thing.kind} />}
        <span className="tag hand" aria-hidden="true">
          {thing.label}
        </span>
      </span>
    </li>
  )
}

export default function Now() {
  const [current, ...earlier] = NOW
  // Pointing at a thing in the scene picks out its line on the note, and the other way round
  const [active, setActive] = useState<NowKey | null>(null)
  const hover = (key: NowKey) => ({
    onPointerEnter: () => setActive(key),
    onPointerLeave: () => setActive(null),
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
  })
  const keys = Object.keys(NOW_LABELS) as NowKey[]

  return (
    <main className="now-page">
      <div className="section-head">
        <h1 className="sr-only">Now</h1>
        <p className="hand headline">
          <Underlined>my desk, right now</Underlined>
        </p>
        <p className="updated">updated {current.month}</p>
      </div>

      <div className="nook-wrap">
        <div className="nook">
          <svg className="doodle furniture" viewBox="0 0 1000 700" aria-hidden="true">
            {FURNITURE.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>

          <ul className="nook-things" aria-label="On the shelves">
            {SHELF.map((thing) => (
              <ShelfItem key={thing.id} thing={thing} />
            ))}
          </ul>

          <ul className="nook-things" aria-label="On the desk this month">
            <li className={`thing wall-photo${active === 'shooting' ? ' active' : ''}`}>
              <span className="hold" tabIndex={0} aria-label={`${NOW_LABELS.shooting}: ${lineText(current.shooting)}`} {...hover('shooting')}>
                <Drawing shape="frame" />
              </span>
            </li>
            {DESK.map(({ key, x, w }) => (
              <li
                key={key}
                className={`thing desk-thing${active === key ? ' active' : ''}`}
                style={{ left: `${x}%`, bottom: above(SURFACE.desk), width: `${w}%` } as CSSProperties}
              >
                <span className="hold" tabIndex={0} aria-label={`${NOW_LABELS[key]}: ${lineText(current[key])}`} {...hover(key)}>
                  <Drawing shape={key} />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="now-note scrap" aria-label={`What I'm up to, ${current.month}`}>
          <span className="tape" aria-hidden="true" />
          <div className="sheet">
            <div className="paper">
              <ul>
                {keys.map((key) => (
                  <li key={key} className={active === key ? 'active' : undefined} {...hover(key)}>
                    <span className="label">{NOW_LABELS[key]}</span>
                    <span className="hand">
                      <Line line={current[key]} />
                    </span>
                    <Doodle shape="squiggle" pen="amber" className="squiggle" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {earlier.length > 0 && (
        <section className="now-archive" aria-labelledby="earlier-title">
          <div className="bar" />
          <h2 className="display" id="earlier-title">
            Earlier
          </h2>
          {earlier.map((entry) => (
            <div key={entry.month} className="month">
              <p className="hand">{entry.month}</p>
              <dl>
                {keys.map((key) => (
                  <div key={key}>
                    <dt>{NOW_LABELS[key]}</dt>
                    <dd>
                      <Line line={entry[key]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
