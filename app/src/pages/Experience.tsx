import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Underlined } from '../components/Doodle.tsx'
import { EDUCATION, ENTRIES, HIGHLIGHTS, KIND_LABELS, photoFor } from '../data/experience.ts'

const TILTS = ['-2deg', '1.5deg', '-1deg']

// The quietest page on the site: mostly typeset, with handwriting only for dates and asides.
export default function Experience() {
  return (
    <main className="xp">
      <div className="section-head">
        <h1 className="display">Where I've worked</h1>
        <p className="hand">
          <Underlined pen="amber">newest first</Underlined>
        </p>
      </div>

      <ul className="xp-highlights" aria-label="Highlights">
        {HIGHLIGHTS.map(({ big, small }, i) => (
          <li key={big} className="scrap" style={{ '--tilt': TILTS[i % TILTS.length] } as CSSProperties}>
            <span className="sheet">
              <span className="paper">
                <strong className="display">{big}</strong>
                <span>{small}</span>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <ol className="xp-timeline">
        {ENTRIES.map((entry) => {
          const photo = photoFor(entry.id)
          return (
          <li key={entry.id} className={entry.ongoing ? 'xp-entry ongoing' : 'xp-entry'}>
            <div className="side">
              <p className="when hand">{entry.when}</p>
              {photo && <img className="xp-photo" src={photo.src} alt={photo.alt} loading="lazy" />}
            </div>
            <div className="what">
              <span className="kind">{KIND_LABELS[entry.kind]}</span>
              <h2 className="display">{entry.role}</h2>
              <p className="org">
                {entry.org}
                {entry.detail && <span> · {entry.detail}</span>}
              </p>
              <p className="summary">{entry.summary}</p>
              <ul className="tags">
                {entry.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {entry.link && (
                <p className="aside hand">
                  {entry.link.to ? (
                    <Link to={entry.link.to} viewTransition>
                      {entry.link.label} →
                    </Link>
                  ) : (
                    <a href={entry.link.href} target="_blank" rel="noopener noreferrer">
                      {entry.link.label} ↗
                    </a>
                  )}
                </p>
              )}
            </div>
          </li>
          )
        })}
      </ol>

      <section className="xp-school">
        <div className="bar" />
        <h2 className="display">{EDUCATION.school}</h2>
        <p className="hand">{EDUCATION.when}</p>
        {EDUCATION.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>
    </main>
  )
}
