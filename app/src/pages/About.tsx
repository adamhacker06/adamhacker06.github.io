import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import brooklynBridge from '../assets/photos/brooklyn-bridge.webp'
import redRocks from '../assets/photos/red-rocks.webp'
import tacoBell from '../assets/photos/taco-bell.webp'
import { Doodle, Underlined } from '../components/Doodle.tsx'

const SMALL_STUFF = [
  { text: 'street photography', tilt: '-3deg' },
  { text: 'mug collecting', tilt: '2deg' },
  { text: 'LEGO', tilt: '-1.5deg' },
  { text: 'Duolingo', tilt: '3deg' },
  { text: 'graphic design', tilt: '-2deg' },
  { text: 'frolicking', tilt: '1.5deg' },
]

export default function About() {
  return (
    <main className="about">
      <div className="section-head">
        <h1 className="display">A bit about me</h1>
        <p className="hand">
          <Underlined pen="amber">the longer version</Underlined>
        </p>
      </div>

      <section className="about-lead">
        <p className="thread">
          I study <strong>EECS</strong>, <strong>education</strong> and <strong>design</strong> at UC Berkeley. To me, they
          help answer one question: how do you build something that helps people learn? Because we love learning!
        </p>
        <p className="sum hand" aria-label="EECS plus education plus design equals tools that help people learn">
          <span>EECS</span>
          <i>+</i>
          <span>education</span>
          <i>+</i>
          <span>design</span>
          <Doodle shape="arrowRight" pen="amber" stretch={false} />
          <b>tools that help people learn</b>
        </p>
      </section>

      <section className="about-story">
        <div className="words">
          <h2 className="display">How I got here</h2>
          <p>
            I love my blend of study because it captures so much of who I am and what I hope to do. I first became
            interested in the field of education in elementary school, when I decided I would be a teacher after loving
            my 6th grade sleepaway camp to learn about life sciences. I couldn’t believe the teachers got to go camping
            every year!
          </p>
          <p>
            Shortly after that, I was introduced to computer science through a mentor who saw my last name and quickly
            opened Scratch in my browser. I was immediately fascinated and decided that I would have to fulfill the
            destiny of my last name. I thought it was incredible that a few blocks of instructions could move a cat
            across the screen or create entire worlds of video games.
          </p>
          <p>
            In college, I integrated the design component. I wanted to fulfill this desire to have a human-centric
            approach to my work. Much of my innate passion and energy for life comes from people (learning more about my
            friends’ lives, how the human brain learns, creating tools that help others, etc.) and design has brought
            this to everything I do.
          </p>
          <p>
            This is also why I am pursuing product management. As a PM, I have the privilege of constantly learning.
            There are always new contexts, requirements, and technologies. And I get to keep asking my favorite
            question: is this actually working for the people it’s meant for?
          </p>

          <h2 className="display">Where I'm from</h2>
          <p>
            I grew up in Visalia, CA, a city whose need for more accessible and developed education is often a source of
            inspiration for my work. I’m also a proud first-generation college student and second-generation immigrant.
            My mom is from{' '}
            <Link to="/scrapbook#philippines" viewTransition>
              the Philippines
            </Link>
            , and my dad is from the Central Valley of California, where my family has a long history of playing{' '}
            <Link to="/scrapbook#bluegrass" viewTransition>
              bluegrass music
            </Link>
            .
          </p>
        </div>

        <div className="pics">
          <figure style={{ '--tilt': '2.5deg' } as CSSProperties}>
            <img src={brooklynBridge} alt="Adam taking a windswept selfie at night on the Brooklyn Bridge, with the lit stone arches behind him." loading="lazy" />
            <figcaption className="hand">frolicking, New York edition</figcaption>
          </figure>
          <figure style={{ '--tilt': '-3deg' } as CSSProperties}>
            <img src={redRocks} alt="Adam wearing a backpack in front of a wide valley and the red rock cliffs of Sedona." loading="lazy" />
            <figcaption className="hand">Sedona</figcaption>
          </figure>
          <figure style={{ '--tilt': '2deg' } as CSSProperties}>
            <img src={tacoBell} alt="A blurry night photo of Adam laughing outside a Taco Bell, holding a box of food and a drink." loading="lazy" />
            <figcaption className="hand">peak happiness</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-small">
        <h2 className="display">The small stuff</h2>
        <p className="hand">things I'll happily talk about for too long</p>
        <ul>
          {SMALL_STUFF.map(({ text, tilt }) => (
            <li key={text} className="scrap hand" style={{ '--tilt': tilt } as CSSProperties}>
              <span className="tape" aria-hidden="true" />
              <span className="sheet">
                <span className="paper">{text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="more">
          Some of it ends up in the{' '}
          <Link to="/scrapbook" viewTransition>
            scrapbook
          </Link>
          .
        </p>
      </section>

      <section className="about-next">
        <div className="bar" />
        <h2 className="display">What I'm looking for</h2>
        <p>
          Product roles, ideally somewhere that builds things people learn from. If that sounds like your team (or if you
          just want to compare mug collections :D) <a href="mailto:adamhacker@berkeley.edu">send me an email</a>.
        </p>
      </section>
    </main>
  )
}
