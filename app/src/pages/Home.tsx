import type { CSSProperties } from 'react'
import oscarCutout from '../assets/photos/oscar-cutout.webp'
import ropesCourseCutout from '../assets/photos/ropes-course-cutout.webp'
import mirrorSelfieLg from '../assets/home/mirror-selfie-lg.webp'
import mirrorSelfieSm from '../assets/home/mirror-selfie-sm.webp'
import oscarLg from '../assets/home/oscar-lg.webp'
import oscarSm from '../assets/home/oscar-sm.webp'
import ropesCourseLg from '../assets/home/ropes-course-lg.webp'
import ropesCourseSm from '../assets/home/ropes-course-sm.webp'
import { Doodle, Underlined } from '../components/Doodle.tsx'

// `cut` is how far down the picture the frame starts; everything above it is just the cutout.
// The cutouts are the top slice of each photo with the background removed; a photo without one just sits in its frame.
// Each photo file is already cropped to its frame and comes in two widths; the browser picks one.
// Listed back to front: later photos sit on top of earlier ones and their backings.
const SNAPS = [
  { src: mirrorSelfieLg, small: mirrorSelfieSm, widths: [520, 960], cutout: undefined, alt: "Adam reflected in a car's wing mirror, holding a camera, with forest rushing past.", x: '0%', y: '3%', w: '57%', ratio: '2000 / 1333', cut: '0%', tilt: '-3deg', back: 'var(--sky)' },
  { src: oscarLg, small: oscarSm, widths: [400, 768], cutout: oscarCutout, alt: 'Adam leaning toward the camera, grinning and holding a gold Oscar statuette.', x: '5%', y: '35%', w: '40%', ratio: '768 / 1024', cut: '30%', tilt: '2deg', back: 'var(--sky)' },
  { src: ropesCourseLg, small: ropesCourseSm, widths: [420, 768], cutout: ropesCourseCutout, alt: 'Adam in a green helmet taking a selfie on a treetop ropes course, holding up a peace sign.', x: '54%', y: '6%', w: '46%', ratio: '768 / 1024', cut: '41%', tilt: '3deg', back: 'var(--sky)' },
]

// Lines on the graph-paper sheet; the first one gets circled. Keep them short.
const NOW = ['looking for product roles', 'learning animation', 'taking too many photos']

// Brand marks are filled shapes; the envelope is drawn as a stroke like the other doodles
const SOCIALS = [
  {
    href: 'https://github.com/adamhacker06',
    label: 'GitHub',
    icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
  {
    href: 'https://www.linkedin.com/in/adamhacker06',
    label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z',
  },
  { href: 'mailto:adamhacker@berkeley.edu', label: 'Email', icon: null },
]

export default function Home() {
  return (
    <main className="hero">
      <div className="intro">
        <p className="hand hello">hi, I'm</p>
        <h1 className="display">
          Adam{' '}
          <span className="surname">
            Hacker
            {/* The doodled exclamation mark from the MLA title slide */}
            <svg className="doodle amber bang" viewBox="0 0 60 110" aria-hidden="true">
              <path d="M5 17 C 20 10, 42 6, 55 10 C 51 32, 39 62, 30 82 C 23 62, 14 36, 11 11" />
              <path className="solid" d="M27 22 C 33 17, 42 16, 46 19 C 43 34, 36 54, 31 66 C 28 52, 26 36, 27 22 Z" />
              <path d="M17 97 C 19 89, 34 87, 37 93 C 39 100, 27 106, 20 103 C 16 101, 16 98, 18 95" />
              <path className="solid" d="M23 97 C 26 93, 32 93, 32 96 C 31 100, 25 102, 23 99 Z" />
            </svg>
          </span>
        </h1>
        <p className="blurb">
          Building tools to help people learn, capturing moments with a camera, and frolicking around Berkeley 🐻
        </p>
        <ul className="socials">
          {SOCIALS.map(({ href, label, icon }) => (
            <li key={label}>
              <a href={href} aria-label={label} title={label}>
                {icon ? (
                  <svg className="brand" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={icon} />
                  </svg>
                ) : (
                  <Doodle shape="envelope" stretch={false} />
                )}
                <Doodle shape="squiggle" pen="amber" className="squiggle" />
              </a>
            </li>
          ))}
        </ul>

        <aside className="now scrap hand">
          <span className="tape" aria-hidden="true" />
          <div className="sheet">
            <div className="paper">
              <h2>
                <Underlined pen="amber">right now</Underlined>
              </h2>
              <Doodle shape="star" pen="amber" className="star" stretch={false} />
              <ul>
                {NOW.map((line, i) => (
                  <li key={line}>
                    {i === 0 ? (
                      <span className="circled">
                        {line}
                        <Doodle shape="loop" pen="amber" />
                      </span>
                    ) : (
                      line
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <figure className="collage">
        {SNAPS.map(({ src, small, widths, cutout, alt, ...place }) => (
          <div
            key={src}
            className="snap"
            style={{ '--x': place.x, '--y': place.y, '--w': place.w, '--ratio': place.ratio, '--cut': place.cut, '--tilt': place.tilt, '--back': place.back } as CSSProperties}
          >
            <img
              className="photo"
              src={src}
              srcSet={`${small} ${widths[0]}w, ${src} ${widths[1]}w`}
              sizes={`(max-width: 760px) calc(min(86vw, 420px) * ${parseFloat(place.w) / 100}), calc(min(40vw, 72vh) * ${parseFloat(place.w) / 100})`}
              alt={alt}
            />
            {cutout && <img className="cutout" src={cutout} alt="" />}
          </div>
        ))}
        <p className="hand note one">that's me!</p>
        <Doodle shape="arrow" pen="amber" className="arrow" stretch={false} />
        <p className="hand note two">also me!</p>
        <Doodle shape="arrowRight" pen="amber" className="arrow two" stretch={false} />
      </figure>
    </main>
  )
}
