import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Doodle, Underlined } from '../components/Doodle.tsx'
import Viewer from '../components/Viewer.tsx'
import type { ViewerItem } from '../components/Viewer.tsx'
import { COVERS, PROJECTS } from '../data/projects.ts'
import type { Project } from '../data/projects.ts'

const COVER_TILTS = ['-2.5deg', '2deg', '-1.5deg', '3deg']

// Each project gets a row: its main picture on one side (sides alternate down the page) and the
// write-up on the other. Any picture opens the same photo sheet as the Scrapbook.
function ProjectRow({ project, onOpen }: { project: Project; onOpen: (start: number) => void }) {
  const [main, ...more] = project.photos
  return (
    <article id={project.id} className="project" aria-labelledby={`${project.id}-title`}>
      <div className="project-pics">
        <button type="button" className="project-main" onClick={() => onOpen(0)} aria-label={`See the photos of ${project.title}`}>
          <img src={main.thumb} srcSet={`${main.thumb} 640w, ${main.src} ${main.width}w`} sizes="(max-width: 760px) 90vw, 28rem" alt={main.alt} width={main.width} height={main.height} loading="lazy" />
        </button>
        {more.length > 0 && (
          <ul className="project-more" aria-label="More pictures">
            {more.map((p, i) => (
              <li key={p.src}>
                <button type="button" onClick={() => onOpen(i + 1)}>
                  <img src={p.thumb} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="project-text">
        <span className="kind">
          {project.kind} · {project.when}
        </span>
        <h2 className="display" id={`${project.id}-title`}>
          {project.title}
        </h2>
        <p>{project.what}</p>
        <h3 className="hand">what I learned</h3>
        <p>{project.learned}</p>
        <ul className="tags" aria-label="Built with">
          {project.built.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p className="aside hand">
          {project.links.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer">
              {label} <span className="go out">↗</span>
              <Doodle shape="squiggle" pen="amber" className="squiggle" />
            </a>
          ))}
        </p>
      </div>
    </article>
  )
}

export default function Projects() {
  const [viewing, setViewing] = useState<{ item: ViewerItem | null; start: number; open: boolean }>({ item: null, start: 0, open: false })
  const open = (item: ViewerItem) => (start: number) => setViewing({ item, start, open: true })

  return (
    <main className="projects">
      <div className="section-head">
        <h1 className="display">Things I've built</h1>
        <p className="hand">
          <Underlined pen="amber">tap a picture for more</Underlined>
        </p>
      </div>

      <p className="projects-intro">
        Small interactive pieces from a creative coding class at Berkeley (DESINV 23) in spring 2026: generative text, sound, a webcam, and a couple of Arduinos. Each one has its code and a full write-up on GitHub.
      </p>

      <div className="project-list">
        {PROJECTS.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            onOpen={open({ id: project.id, title: project.title, text: project.tagline, photos: project.photos, links: project.links })}
          />
        ))}
      </div>

      <section id={COVERS.id} className="covers" aria-labelledby="covers-title">
        <div className="bar" />
        <h2 className="display" id="covers-title">
          On the side: playlist covers
        </h2>
        <p>{COVERS.text}</p>
        <ul>
          {COVERS.photos.map((p, i) => (
            <li key={p.src} style={{ '--tilt': COVER_TILTS[i % COVER_TILTS.length] } as CSSProperties}>
              <button type="button" onClick={() => open(COVERS)(i)}>
                <img src={p.thumb} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Viewer item={viewing.item} start={viewing.start} open={viewing.open} onClose={() => setViewing((v) => ({ ...v, open: false }))} />
    </main>
  )
}
