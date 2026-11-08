import { shot } from './images.ts'
import type { Photo } from './images.ts'

// The Projects page. "what" and "learned" are condensed from the Showcase and Reflection sections
// of each project's README on GitHub; rewrite them freely.

export type Project = {
  id: string
  title: string
  // One line, shown in handwriting when the photos are open
  tagline: string
  // Small caps line above the title
  kind: string
  when: string
  what: string
  learned: string
  built: string[]
  // The first photo is the one shown on the page; the rest open in the viewer
  photos: Photo[]
  links: { label: string; href: string }[]
}

const repo = (name: string) => ({ label: 'code on GitHub', href: `https://github.com/adamhacker06/${name}` })

export const PROJECTS: Project[] = [
  {
    id: 'rainfall-of-babel',
    title: 'Rainfall of Babel',
    tagline: 'Words generated from Borges’ Library of Babel rain down the screen, and only the real ones glow.',
    kind: 'Generative art',
    when: 'Feb 2026',
    what: 'A browser art piece built on Borges’ short story The Library of Babel. A character-level Markov chain trained on the story invents words that rain down the screen in front of a wall of nonsense. Any word that really appears in the story lights up gold, longer ones glow brighter, and everything that falls piles up at the bottom.',
    learned:
      'Something looking right doesn’t make it right. My first version checked words against a list of common English, and it worked, but it didn’t say what I meant. Rebuilding the generator from the story’s own text made Borges the only judge of what counts as a word.',
    built: ['JavaScript', 'Markov chains'],
    photos: [
      shot('rainfall-of-babel-hero', 1600, 905, 'A dark screen titled The Rainfall of Babel, with grey words falling and a few glowing gold above a dense block of text.', 'real words glow gold'),
      shot('rainfall-of-babel-too-many', 1600, 907, 'An earlier version of the piece with the screen crowded by falling words.', 'too many words!'),
      shot('rainfall-of-babel-draft', 1600, 1135, 'A first draft where words sit on small coloured chips in a pile.', 'the first draft'),
    ],
    links: [repo('rainfall-of-babel')],
  },
  {
    id: 'color-soundilizer',
    title: 'Color Soundilizer',
    tagline: 'A drawing tool where every colour plays its own sound, so a sketch becomes a song you can replay.',
    kind: 'Creative tool',
    when: 'Apr 2026',
    what: 'A drawing app where colour and sound are tied together one to one: hue sets the pitch, saturation and brightness shape the tone, and the sound is synthesised live as you paint. Whole sessions can be recorded with their timing, replayed like a performance, kept in a gallery or exported as JSON.',
    learned:
      'How much feedback shapes a design. Most of the iterations, from tuning the colour-to-sound mapping to adding an eraser, came from classmates trying it out.',
    built: ['p5.js', 'Web Audio API', 'localStorage'],
    photos: [
      shot('sound-for-someone-cover', 1600, 905, 'The Color Soundilizer app: a colour picker beside a canvas with a red heart drawn around the letters DES INV.', 'every colour is a sound'),
    ],
    links: [repo('sound-for-someone')],
  },
  {
    id: 'a-digital-you',
    title: 'A Digital You',
    tagline: 'Your webcam silhouette, redrawn live as a grid of chunky pixels.',
    kind: 'Interactive installation',
    when: 'May 2026',
    what: 'Your webcam silhouette, redrawn live as a grid of chunky black pixels with rare flecks of real colour. The piece photographs the empty room first, so only what has changed (you) gets drawn. The cell size drifts between fine and coarse, inspired by how convolutional neural networks sample an image in patches, which I was learning about in CS 189.',
    learned:
      'To question my first approach. I reached for an object-detection model, but simple background subtraction did the job and was far easier to build. Showing it live, and watching people play with it, was the best part.',
    built: ['p5.js', 'Webcam capture', 'Perlin noise'],
    photos: [
      shot('a-digital-you-final', 1600, 872, 'A chunky black pixel silhouette of a person holding up a peace sign against a near-white background.', "that's me, in pixels"),
      shot('a-digital-you-second', 1600, 872, 'A finer-grained black pixel silhouette flecked with small dots of colour.', 'finer cells'),
      shot('a-digital-you-first', 1600, 872, 'An early version with very large black cells that only loosely suggest a figure.', 'the first try'),
    ],
    links: [repo('a-digital-you')],
  },
  {
    id: 'glow-treasure-hunt',
    title: 'Glow Treasure Hunt',
    tagline: 'A guessing game where the only clue is a real LED that glows brighter as you get warmer.',
    kind: 'Game · hardware',
    when: 'Mar 2026',
    what: 'An on-screen game whose only clue is off the screen. Three chests appear and one hides the treasure, but nothing on screen gives it away: an LED wired to an Arduino glows brighter as your cursor gets closer to the right chest. Guess right and your streak goes up; guess wrong and it resets.',
    learned:
      'Start small and grow. I first tried to make a much bigger video game, and the point got lost. Keeping it tiny kept the LED at the centre, as the one thing that knows something the screen doesn’t.',
    built: ['p5.js', 'Arduino', 'Web Serial'],
    photos: [
      shot('glow-treasure-hunt-final', 1600, 872, 'Three treasure chests in pink, tan and green on a dark screen, with a win streak of 10 in the corner.', 'which chest?'),
      shot('glow-treasure-hunt-wiring', 1352, 1484, 'An Arduino wired to a breadboard holding a single red LED and a resistor.', 'the LED knows'),
    ],
    links: [repo('glow-treasure-hunt')],
  },
  {
    id: 'digital-erosion',
    title: 'Digital Erosion',
    tagline: 'A pulse that gets more chaotic the busier my calendar is, and a physical knob for calming it down.',
    kind: 'Interactive art · hardware',
    when: 'Feb 2026',
    what: 'A pulse on screen that gets more chaotic the more hours are booked on today’s Google Calendar. A knob wired through an Arduino can calm it down, but only at a hidden sweet spot, which slowly drifts away once you find it. The brief was “sense of self”, and my calendar turned out to say more about me than my hobbies do.',
    learned:
      'Connecting art to a real API opens up a lot, and getting the Google Calendar API working was the hardest part. Next time I’d show the actual events, not just a count of busy hours.',
    built: ['p5.js', 'Google Calendar API', 'Arduino'],
    photos: [
      shot('digital-erosion-wiring1', 1600, 1219, 'A potentiometer on a breadboard wired to an Arduino with red, yellow and black jumper wires.', 'the knob'),
      shot('digital-erosion-wiring2', 1600, 1212, 'A second view of the potentiometer and Arduino wiring.'),
    ],
    links: [repo('digital-erosion')],
  },
]

export const COVERS = {
  id: 'playlist-covers',
  title: 'playlist covers',
  text: 'Cover art I designed for my Spotify playlists.',
  photos: [
    shot('cover-waterfall', 1290, 1290, 'A square cover: three snapshots of Adam down the left with white doodled outlines, beside a desert waterfall scribbled over with blue marker and stick figures.'),
    shot('cover-summer-2024', 1290, 1292, 'A square cover titled Be Happy It Happened, Summer 2024: a crowd of cut-out friends and family layered in front of a blue-tinted waterfall.', 'summer 2024'),
    shot('cover-collage', 1284, 1286, 'A square cover made of overlapping framed photos of Adam with friends, including one posing with a llama and one piggyback ride.'),
    shot('cover-friends', 1135, 1135, 'A square cover collaged from photos of Adam with friends: graduation gowns, a car selfie, a snowman, and a circle of names around a prom photo.'),
  ],
}

// Old links such as /scrapbook#rainfall-of-babel are sent here
export const PROJECT_IDS = new Set([...PROJECTS.map((p) => p.id), COVERS.id])
