// The photo sheet that opens over the Scrapbook and Projects pages: one photo at a time with
// arrows, or all of them in a grid. Opened work is shown straight and clean, with no doodles on it.
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Doodle, Underlined } from './Doodle.tsx'
import type { Photo } from '../data/images.ts'

export type ViewerItem = {
  id: string
  title: string
  text: string
  photos: Photo[]
  links?: { label: string; href: string }[]
}

// Resolves once the image is ready to show, or after a short wait if it is slow, so the arrows
// never feel stuck on a poor connection.
function preload(src: string) {
  const img = new Image()
  img.src = src
  const ready = img.decode().catch(() => {})
  const giveUp = new Promise<void>((resolve) => setTimeout(resolve, 700))
  return Promise.race([ready, giveUp])
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

function Album({ item, start }: { item: ViewerItem; start: number }) {
  const { photos } = item
  const [grid, setGrid] = useState(false)
  // With a single image there is nothing to step through or lay out in a grid
  const single = photos.length === 1
  const [view, setView] = useState<View>({ index: start, prev: null, dir: 1 })

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
          {item.links && (
            <p className="album-links hand">
              {item.links.map(({ label, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">
                  {label} ↗
                </a>
              ))}
            </p>
          )}
        </div>
        {!single && (
          <button
            className="icon-button"
            type="button"
            aria-label={grid ? 'Show one photo at a time' : 'Show all photos'}
            onClick={() => setGrid(!grid)}
          >
            <Doodle shape={grid ? 'single' : 'grid'} stretch={false} />
          </button>
        )}
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
          {!single && (
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
          )}
        </>
      )}
    </>
  )
}

// `item` stays set after closing so the sheet keeps its contents while it animates away.
// `start` is the photo it opens on.
export default function Viewer({ item, start = 0, open, onClose }: { item: ViewerItem | null; start?: number; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) ref.current?.showModal()
    else ref.current?.close()
    // Stop the page scrolling behind the open sheet
    document.documentElement.classList.toggle('locked', open)
    return () => document.documentElement.classList.remove('locked')
  }, [open])

  return (
    <dialog
      ref={ref}
      className="viewer album"
      aria-labelledby="viewer-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {item && (
        <>
          <button className="close icon-button" type="button" aria-label="Close" onClick={onClose}>
            <Doodle shape="close" stretch={false} />
          </button>
          {/* Keyed on the photo too, so reopening the same set on another photo starts fresh */}
          <Album key={`${item.id}-${start}`} item={item} start={start} />
        </>
      )}
    </dialog>
  )
}
