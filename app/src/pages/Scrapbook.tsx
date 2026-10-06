import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import { ITEMS, KINDS } from '../data/scrapbook.ts'
import type { Item, Kind } from '../data/scrapbook.ts'

type Filter = Kind | 'all'

const FILTERS: [Filter, string][] = [['all', 'All'], ...(Object.entries(KINDS) as [Kind, string][])]

const ICONS: Record<Kind, string> = {
  photos: 'M6 14 H20 L25 6 H40 L45 14 H58 V42 H6 Z M32 36 A9 9 0 1 0 31.9 36',
  builds: 'M6 18 H58 V42 H6 Z M14 18 V9 H26 V18 M38 18 V9 H50 V18',
  code: 'M22 10 L7 24 L22 38 M42 10 L57 24 L42 38 M36 6 L28 42',
  odds: 'M32 5 L38 19 L54 20 L42 30 L46 45 L32 37 L18 45 L22 30 L10 20 L26 19 Z',
}

function Print({ item }: { item: Item }) {
  return (
    <span className="print" style={{ '--tone': item.tone, '--ratio': item.ratio } as CSSProperties}>
      <svg className="doodle" viewBox="0 0 64 48" aria-hidden="true">
        <path d={ICONS[item.kind]} />
      </svg>
      <span className="placeholder">placeholder</span>
    </span>
  )
}

// Opened work is shown straight and clean: no doodles on the work itself.
function Viewer({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (item) ref.current?.showModal()
    else ref.current?.close()
  }, [item])

  return (
    <dialog
      ref={ref}
      className="viewer"
      aria-labelledby="viewer-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {item && (
        <>
          <button className="close" type="button" onClick={onClose}>
            Close
          </button>
          <Print item={item} />
          <div className="info">
            <h2 className="display" id="viewer-title">
              {item.title}
            </h2>
            <p>{item.text}</p>
          </div>
        </>
      )}
    </dialog>
  )
}

export default function Scrapbook() {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<Item | null>(null)

  // Cards glide to their new spots where the browser supports view transitions
  function show(next: Filter) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.removeAttribute('data-dir')
    if (document.startViewTransition && !reduced) {
      document.startViewTransition(() => flushSync(() => setFilter(next)))
    } else {
      setFilter(next)
    }
  }

  return (
    <main>
      <div className="section-head">
        <h1 className="display">Scrapbook</h1>
        <p className="hand">
          <Underlined>stuff I've made and done!</Underlined>
        </p>
      </div>

      <div className="filters" role="group" aria-label="Filter scrapbook">
        {FILTERS.map(([kind, label]) => (
          <button key={kind} type="button" aria-pressed={filter === kind} onClick={() => show(kind)}>
            {label}{' '}
            <small>
              {kind === 'all' ? ITEMS.length : ITEMS.filter((c) => c.kind === kind).length}
            </small>
            <Doodle shape="loop" />
          </button>
        ))}
      </div>

      <ul className="wall">
        {ITEMS.filter((c) => filter === 'all' || c.kind === filter).map((item) => (
          <li
            key={item.id}
            className={item.album ? 'card album' : 'card'}
            style={{ '--tilt': `${item.tilt}deg`, viewTransitionName: `card-${item.id}` } as CSSProperties}
          >
            <button type="button" onClick={() => setOpen(item)}>
              <Print item={item} />
              <span className="kind">
                {KINDS[item.kind]}
                {item.album && ' · album'}
              </span>
              <span className="caption">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <Viewer item={open} onClose={() => setOpen(null)} />
    </main>
  )
}
