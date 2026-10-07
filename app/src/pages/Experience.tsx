import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import { EDUCATION, ENTRIES, HIGHLIGHTS, KIND_LABELS, photoFor } from '../data/experience.ts'

const TILTS = ['-2deg', '1.5deg', '-1deg']
// Where each scrap's sliver of tape sits along its top edge, and how it is angled
const TAPES = [
  { x: '30%', tilt: '-6deg' },
  { x: '56%', tilt: '4deg' },
  { x: '70%', tilt: '-3deg' },
]

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
          <li
            key={big}
            className="scrap"
            style={{ '--tilt': TILTS[i % TILTS.length], '--tape-x': TAPES[i % TAPES.length].x, '--tape-tilt': TAPES[i % TAPES.length].tilt } as CSSProperties}
          >
            <span className="tape" aria-hidden="true" />
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
                      {entry.link.label} <span className="go">→</span>
                      <Doodle shape="squiggle" pen="amber" className="squiggle" />
                    </Link>
                  ) : (
                    <a href={entry.link.href} target="_blank" rel="noopener noreferrer">
                      {entry.link.label} <span className="go out">↗</span>
                      <Doodle shape="squiggle" pen="amber" className="squiggle" />
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
        <dl>
          {EDUCATION.rows.map(({ label, items }) => (
            <div key={label}>
              <dt>{label}</dt>
              {items.map((item) => (
                <dd key={item}>{item}</dd>
              ))}
            </div>
          ))}
          <div>
            <dt>Clubs</dt>
            <dd>
              <ul className="tags">
                {EDUCATION.clubs.map((club) => (
                  <li key={club}>{club}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>
    </main>
  )
}
