import { useState } from 'react'
import type { CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { Navigate, useLocation } from 'react-router-dom'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import Viewer from '../components/Viewer.tsx'
import { PROJECT_IDS } from '../data/projects.ts'
import { ITEMS, KINDS } from '../data/scrapbook.ts'
import type { Item, Kind } from '../data/scrapbook.ts'

type Filter = Kind | 'all'

const FILTERS: [Filter, string][] = [['all', 'All'], ...(Object.entries(KINDS) as [Kind, string][])]

const ICONS: Record<Kind, string> = {
  photos: 'M6 14 H20 L25 6 H40 L45 14 H58 V42 H6 Z M32 36 A9 9 0 1 0 31.9 36',
  odds: 'M32 5 L38 19 L54 20 L42 30 L46 45 L32 37 L18 45 L22 30 L10 20 L26 19 Z',
}

// Little line drawings pinned in the top corners of the page; purely decorative
// They sit in two rows: level with the headline, and level with the filters
const STICKERS = [
  { name: 'camera', pen: 'blue', d: 'M8 22 H20 L25 14 H39 L44 22 H56 V50 H8 Z M32 45 A9.5 9.5 0 1 0 31.9 45', side: 'left', x: '9%', y: '1.8125rem', size: '4.25rem', tilt: '-12deg', delay: '0.1s', bob: '5.5s' },
  { name: 'star', pen: 'amber', d: 'M32 6 L39 24 L58 25 L43 38 L48 57 L32 46 L16 57 L21 38 L6 25 L25 24 Z', side: 'left', x: '19.5%', y: '2.875rem', size: '2.125rem', tilt: '12deg', delay: '0.5s', bob: '4.2s' },
  { name: 'lantern', pen: 'blue', d: 'M32 4 V11 M24 11 H40 M23 17 C9 25, 9 41, 23 49 H41 C55 41, 55 25, 41 17 Z M32 17 V49 M26 49 V57 M32 49 V60 M38 49 V57', side: 'left', x: '4%', y: '7rem', size: '3.25rem', tilt: '8deg', delay: '0.8s', bob: '6.4s' },
  { name: 'brick', pen: 'blue', d: 'M7 28 H57 V53 H7 Z M15 28 V18 H28 V28 M36 28 V18 H49 V28', side: 'right', x: '9.5%', y: '1.875rem', size: '4.125rem', tilt: '9deg', delay: '0.25s', bob: '6s' },
  { name: 'plane', pen: 'amber', d: 'M6 30 L58 8 L40 56 L29 37 Z M29 37 L58 8', side: 'right', x: '20%', y: '2.5rem', size: '2.875rem', tilt: '-6deg', delay: '0.6s', bob: '4.6s' },
  { name: 'sailboat', pen: 'blue', d: 'M32 7 V44 M35 11 L52 42 H35 Z M29 18 L15 42 H29 Z M9 48 H55 L48 57 H16 Z', side: 'right', x: '4%', y: '6.875rem', size: '3.5rem', tilt: '-7deg', delay: '0.9s', bob: '5.2s' },
]

// A card's face: the album cover if there is one, otherwise a placeholder block
function Print({ item }: { item: Item }) {
  const cover = item.photos?.[0]
  return (
    <span className="print" style={{ '--tone': item.tone, '--ratio': item.ratio } as CSSProperties}>
      {cover ? (
        <img className="cover" src={cover.thumb} alt="" loading="lazy" />
      ) : (
        <>
          <svg className="doodle" viewBox="0 0 64 48" aria-hidden="true">
            <path d={ICONS[item.kind]} />
          </svg>
          <span className="placeholder">placeholder</span>
        </>
      )}
    </span>
  )
}

// The code projects and playlist covers moved to /projects; old links to them still land there
export default function Scrapbook() {
  const { hash } = useLocation()
  if (PROJECT_IDS.has(hash.slice(1))) return <Navigate to={`/projects${hash}`} replace />
  return <Wall />
}

function Wall() {
  const [filter, setFilter] = useState<Filter>('all')
  // A link such as /scrapbook#taiwan arrives with that item already open
  const { hash } = useLocation()
  const [viewing, setViewing] = useState<{ item: Item | null; open: boolean }>(() => {
    const item = ITEMS.find((i) => i.id === hash.slice(1)) ?? null
    return { item, open: item !== null }
  })

  // Cards glide to their new spots where the browser supports view transitions
  function show(next: Filter) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (document.startViewTransition && !reduced) {
      const root = document.documentElement
      root.setAttribute('data-filtering', '')
      const transition = document.startViewTransition(() => flushSync(() => setFilter(next)))
      transition.finished.finally(() => root.removeAttribute('data-filtering'))
    } else {
      setFilter(next)
    }
  }

  return (
    <main>
      <div className="section-head lively">
        {STICKERS.map((st) => (
          <svg
            key={st.name}
            className={`doodle sticker ${st.pen}`}
            viewBox="0 0 64 64"
            aria-hidden="true"
            style={{ [st.side]: st.x, top: st.y, '--size': st.size, '--tilt': st.tilt, '--delay': st.delay, '--bob': st.bob } as CSSProperties}
          >
            <path d={st.d} pathLength={1} />
          </svg>
        ))}
        {/* The circled tab already says "Scrapbook", so the page leads with the handwritten line instead */}
        <h1 className="sr-only">Scrapbook</h1>
        <p className="hand headline">
          <Underlined>stuff I've made and done!</Underlined>
        </p>
      </div>

      <div className="filters" role="group" aria-label="Filter scrapbook">
        {FILTERS.map(([kind, label]) => (
          <button key={kind} type="button" aria-pressed={filter === kind} onClick={() => show(kind)}>
            {label}{' '}
            <small>{kind === 'all' ? ITEMS.length : ITEMS.filter((c) => c.kind === kind).length}</small>
            <Doodle shape="loop" />
          </button>
        ))}
      </div>

      <ul className="wall">
        {ITEMS.filter((c) => filter === 'all' || c.kind === filter).map((item) => (
          <li
            key={item.id}
            className={item.photos ? 'card album' : 'card'}
            style={{ '--tilt': `${item.tilt}deg`, '--vt': `card-${item.id}` } as CSSProperties}
          >
            <button type="button" onClick={() => setViewing({ item, open: true })}>
              <Print item={item} />
              <span className="kind">
                {KINDS[item.kind]}
                {item.photos && ` · ${item.photos.length}`}
              </span>
              <span className="caption">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <Viewer item={viewing.item?.photos ? { ...viewing.item, photos: viewing.item.photos } : null} open={viewing.open} onClose={() => setViewing((v) => ({ ...v, open: false }))} />
    </main>
  )
}
