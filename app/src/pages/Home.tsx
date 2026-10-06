import type { CSSProperties } from 'react'
import boatCutout from '../assets/photos/boat-cutout.webp'
import boat from '../assets/photos/boat.webp'
import oscarCutout from '../assets/photos/oscar-cutout.webp'
import oscar from '../assets/photos/oscar.webp'
import ropesCourseCutout from '../assets/photos/ropes-course-cutout.webp'
import ropesCourse from '../assets/photos/ropes-course.webp'
import { Doodle, Underlined } from '../components/Doodle.tsx'

const ROLES = ['Coder.', 'LEGO Builder.', 'Photographer.', 'Student.']

// `cut` is how far down the picture the frame starts; everything above it is just the cutout.
// The cutout PNGs are the top slice of each photo with the background removed.
// Listed back to front: later photos sit on top of earlier ones and their backings.
const SNAPS = [
  { src: boat, cutout: boatCutout, alt: 'Adam squinting into the sun on a boat, with a rocky coastline behind him.', x: '0%', y: '-4%', w: '60%', ratio: '1086 / 724', cut: '27%', tilt: '-3deg', back: 'var(--sky)' },
  { src: oscar, cutout: oscarCutout, alt: 'Adam leaning toward the camera, grinning and holding a gold Oscar statuette.', x: '5%', y: '35%', w: '40%', ratio: '768 / 1024', cut: '30%', tilt: '2deg', back: 'var(--sky)' },
  { src: ropesCourse, cutout: ropesCourseCutout, alt: 'Adam in a green helmet taking a selfie on a treetop ropes course, holding up a peace sign.', x: '54%', y: '6%', w: '46%', ratio: '768 / 1024', cut: '41%', tilt: '3deg', back: 'var(--amber)' },
]

const SOCIALS = [
  { href: 'https://github.com/adamhacker06', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/adamhacker06', label: 'LinkedIn' },
  { href: 'mailto:adamhacker@berkeley.edu', label: 'Email' },
]

export default function Home() {
  return (
    <main className="hero">
      <div>
        <p className="hand hello">hi, I'm</p>
        <h1 className="display">Adam Hacker</h1>
        <ul className="roles">
          {ROLES.map((role) => (
            <li key={role}>{role}</li>
          ))}
        </ul>
        <p className="hand more">
          <Underlined>and much more!</Underlined>
        </p>
        <p className="blurb">
          I study CS and education at UC Berkeley. This is where I keep the things I make.
        </p>
        <ul className="socials">
          {SOCIALS.map(({ href, label }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      <figure className="collage">
        {SNAPS.map(({ src, cutout, alt, ...place }) => (
          <div
            key={src}
            className="snap"
            style={{ '--x': place.x, '--y': place.y, '--w': place.w, '--ratio': place.ratio, '--cut': place.cut, '--tilt': place.tilt, '--back': place.back } as CSSProperties}
          >
            <img className="photo" src={src} alt={alt} />
            <img className="cutout" src={cutout} alt="" />
          </div>
        ))}
        <Doodle shape="ticks" pen="amber" className="ticks" stretch={false} />
        <Doodle shape="ticks" pen="amber" className="ticks br" stretch={false} />
        <p className="hand note one">that's me!</p>
        <Doodle shape="arrow" pen="amber" className="arrow" stretch={false} />
        <p className="hand note two">also me!</p>
      </figure>
    </main>
  )
}
