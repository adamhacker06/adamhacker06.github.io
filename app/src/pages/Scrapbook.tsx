import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import { ITEMS, KINDS } from '../data/scrapbook.ts'
import type { Item, Kind, Photo } from '../data/scrapbook.ts'

type Filter = Kind | 'all'

const FILTERS: [Filter, string][] = [['all', 'All'], ...(Object.entries(KINDS) as [Kind, string][])]

const ICONS: Record<Kind, string> = {
  photos: 'M6 14 H20 L25 6 H40 L45 14 H58 V42 H6 Z M32 36 A9 9 0 1 0 31.9 36',
  builds: 'M6 18 H58 V42 H6 Z M14 18 V9 H26 V18 M38 18 V9 H50 V18',
  code: 'M22 10 L7 24 L22 38 M42 10 L57 24 L42 38 M36 6 L28 42',
  odds: 'M32 5 L38 19 L54 20 L42 30 L46 45 L32 37 L18 45 L22 30 L10 20 L26 19 Z',
}

// Little line drawings pinned in the top corners of the page; purely decorative
const STICKERS = [
  { name: 'camera', pen: 'blue', d: 'M8 22 H20 L25 14 H39 L44 22 H56 V50 H8 Z M32 45 A9.5 9.5 0 1 0 31.9 45', side: 'left', x: '9%', y: '14px', size: '68px', tilt: '-12deg', delay: '0.1s', bob: '5.5s' },
  { name: 'star', pen: 'amber', d: 'M32 6 L39 24 L58 25 L43 38 L48 57 L32 46 L16 57 L21 38 L6 25 L25 24 Z', side: 'left', x: '19.5%', y: '98px', size: '34px', tilt: '12deg', delay: '0.5s', bob: '4.2s' },
  { name: 'lantern', pen: 'blue', d: 'M32 4 V11 M24 11 H40 M23 17 C9 25, 9 41, 23 49 H41 C55 41, 55 25, 41 17 Z M32 17 V49 M26 49 V57 M32 49 V60 M38 49 V57', side: 'left', x: '4%', y: '124px', size: '52px', tilt: '8deg', delay: '0.8s', bob: '6.4s' },
  { name: 'brick', pen: 'blue', d: 'M7 28 H57 V53 H7 Z M15 28 V18 H28 V28 M36 28 V18 H49 V28', side: 'right', x: '9.5%', y: '12px', size: '66px', tilt: '9deg', delay: '0.25s', bob: '6s' },
  { name: 'plane', pen: 'amber', d: 'M6 30 L58 8 L40 56 L29 37 Z M29 37 L58 8', side: 'right', x: '20%', y: '92px', size: '46px', tilt: '-6deg', delay: '0.6s', bob: '4.6s' },
  { name: 'sailboat', pen: 'blue', d: 'M32 7 V44 M35 11 L52 42 H35 Z M29 18 L15 42 H29 Z M9 48 H55 L48 57 H16 Z', side: 'right', x: '4%', y: '122px', size: '56px', tilt: '-7deg', delay: '0.9s', bob: '5.2s' },
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

function preload(src: string) {
  const img = new Image()
  img.src = src
  return img.decode().catch(() => {})
}

function Shot({ photo, className = '', hidden = false }: { photo: Photo; className?: string; hidden?: boolean }) {
  return (
    <figure className={`shot ${className}`} aria-hidden={hidden || undefined}>
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
      {photo.caption && (
        <figcaption className="scrap hand">
          <span className="sheet">
            <span className="paper">{photo.caption}</span>
          </span>
        </figcaption>
      )}
    </figure>
  )
}

type View = { index: number; prev: number | null; dir: 1 | -1 }

// An opened album: one photo at a time by default, or all of them in a grid
function Album({ item, photos }: { item: Item; photos: Photo[] }) {
  const [grid, setGrid] = useState(false)
  const [view, setView] = useState<View>({ index: 0, prev: null, dir: 1 })

  // Wait for the next photo to be ready, then cross-fade to it
  function step(dir: 1 | -1) {
    const index = (view.index + dir + photos.length) % photos.length
    preload(photos[index].src).then(() => setView((v) => ({ index, prev: v.index, dir })))
  }

  useEffect(() => {
    if (grid) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Drop the outgoing photo once its fade has finished
  useEffect(() => {
    if (view.prev === null) return
    const timer = setTimeout(() => setView((v) => ({ ...v, prev: null })), 280)
    return () => clearTimeout(timer)
  }, [view.prev, view.index])

  // Have the neighbours ready before they are asked for
  useEffect(() => {
    preload(photos[(view.index + 1) % photos.length].src)
    preload(photos[(view.index + photos.length - 1) % photos.length].src)
  }, [view.index, photos])

  return (
    <>
      <div className="album-head">
        <div>
          <h2 className="display" id="viewer-title">
            <Underlined pen="amber">{item.title}</Underlined>
          </h2>
          <p className="hand">{item.text}</p>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label={grid ? 'Show one photo at a time' : 'Show all photos'}
          onClick={() => setGrid(!grid)}
        >
          <Doodle shape={grid ? 'single' : 'grid'} stretch={false} />
        </button>
      </div>

      {grid ? (
        <>
          <p className="album-hint hand">
            pick one to see it big
            <Doodle shape="arrow" pen="amber" stretch={false} />
          </p>
          <ul className="album-grid">
            {photos.map((p, i) => (
              <li key={p.src}>
                <button
                  type="button"
                  onClick={() => {
                    setView({ index: i, prev: null, dir: 1 })
                    setGrid(false)
                  }}
                >
                  <img src={p.thumb} alt={p.alt} width={p.width} height={p.height} />
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="stage" style={{ '--dir': view.dir } as CSSProperties}>
            {view.prev !== null && <Shot key={`out-${view.prev}`} photo={photos[view.prev]} className="leaving" hidden />}
            <Shot key={view.index} photo={photos[view.index]} className={view.prev !== null ? 'entering' : ''} />
          </div>
          <div className="album-nav">
            <button className="icon-button" type="button" aria-label="Previous photo" onClick={() => step(-1)}>
              <Doodle shape="left" stretch={false} />
            </button>
            <span className="hand">
              {view.index + 1} of {photos.length}
            </span>
            <button className="icon-button" type="button" aria-label="Next photo" onClick={() => step(1)}>
              <Doodle shape="right" stretch={false} />
            </button>
          </div>
        </>
      )}
    </>
  )
}

// Opened work is shown straight and clean: no doodles on the work itself.
// `item` stays set after closing so the sheet keeps its contents while it animates away.
function Viewer({ item, open, onClose }: { item: Item | null; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) ref.current?.showModal()
    else ref.current?.close()
    // Stop the wall scrolling behind the open sheet
    document.documentElement.classList.toggle('locked', open)
    return () => document.documentElement.classList.remove('locked')
  }, [open])

  return (
    <dialog
      ref={ref}
      className={item?.photos ? 'viewer album' : 'viewer'}
      aria-labelledby="viewer-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {item && (
        <>
          <button className="close icon-button" type="button" aria-label="Close" onClick={onClose}>
            <Doodle shape="close" stretch={false} />
          </button>
          {item.photos ? (
            <Album key={item.id} item={item} photos={item.photos} />
          ) : (
            <>
              <Print item={item} />
              <div className="info">
                <h2 className="display" id="viewer-title">
                  {item.title}
                </h2>
                <p>{item.text}</p>
              </div>
            </>
          )}
        </>
      )}
    </dialog>
  )
}

export default function Scrapbook() {
  const [filter, setFilter] = useState<Filter>('all')
  const [viewing, setViewing] = useState<{ item: Item | null; open: boolean }>({ item: null, open: false })

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
        <h1 className="display">Scrapbook</h1>
        <p className="hand">
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

      <Viewer item={viewing.item} open={viewing.open} onClose={() => setViewing((v) => ({ ...v, open: false }))} />
    </main>
  )
}
