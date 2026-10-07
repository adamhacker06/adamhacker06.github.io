export const KINDS = {
  photos: 'Photos',
  design: 'Design',
  code: 'Code',
  odds: 'Odds & ends',
} as const

export type Kind = keyof typeof KINDS

export type Photo = {
  src: string
  thumb: string
  alt: string
  // Optional handwritten note shown under the photo
  caption?: string
  width: number
  height: number
}

export type Item = {
  id: string
  kind: Kind
  title: string
  text: string
  // Albums carry real photos; the first one is the cover on the wall
  photos?: Photo[]
  // Optional links shown under the description when the item is open
  links?: { label: string; href: string }[]
  // Placeholder look for items that have no image yet
  tone: string
  ratio: string
  tilt: number
}

// Compressed copies live in assets/photography, with 640px versions in thumbs/
const full = import.meta.glob<string>('../assets/photography/*.webp', { eager: true, query: '?url', import: 'default' })
const thumbs = import.meta.glob<string>('../assets/photography/thumbs/*.webp', { eager: true, query: '?url', import: 'default' })

function photo(name: string, width: number, height: number, alt: string, caption?: string): Photo {
  return {
    src: full[`../assets/photography/${name}.webp`],
    thumb: thumbs[`../assets/photography/thumbs/${name}.webp`],
    alt,
    caption,
    width,
    height,
  }
}

// Screenshots and build photos for the code projects, in assets/projects
const projectFull = import.meta.glob<string>('../assets/projects/*.webp', { eager: true, query: '?url', import: 'default' })
const projectThumbs = import.meta.glob<string>('../assets/projects/thumbs/*.webp', { eager: true, query: '?url', import: 'default' })

function shot(name: string, width: number, height: number, alt: string, caption?: string): Photo {
  return {
    src: projectFull[`../assets/projects/${name}.webp`],
    thumb: projectThumbs[`../assets/projects/thumbs/${name}.webp`],
    alt,
    caption,
    width,
    height,
  }
}

const BLUEGRASS = [
  shot('bluegrass-archive', 988, 984, 'A faded colour snapshot of a young man in a graduation cap and gown, with a woman beside him smiling up at him.'),
]

const COVERS = [
  shot('cover-waterfall', 1290, 1290, 'A square cover: three snapshots of Adam down the left with white doodled outlines, beside a desert waterfall scribbled over with blue marker and stick figures.'),
  shot('cover-summer-2024', 1290, 1292, 'A square cover titled Be Happy It Happened, Summer 2024: a crowd of cut-out friends and family layered in front of a blue-tinted waterfall.', 'summer 2024'),
  shot('cover-collage', 1284, 1286, 'A square cover made of overlapping framed photos of Adam with friends, including one posing with a llama and one piggyback ride.'),
  shot('cover-friends', 1135, 1135, 'A square cover collaged from photos of Adam with friends: graduation gowns, a car selfie, a snowman, and a circle of names around a prom photo.'),
]

const OWLS = [
  shot('duolingo-making', 768, 1024, 'A green felt owl mask with big white eyes and an orange beak, lying beside scissors and a sheet of traced outlines.', 'cut out of felt'),
  shot('duolingo-batch', 768, 1024, 'Ten finished green felt owl masks laid out on a wooden floor among glue guns, scissors and felt offcuts.', 'the production line'),
  shot('duolingo-wearing', 768, 1024, 'Adam standing in a doorway wearing one of the green felt owl masks over his eyes.', 'quality control'),
  shot('duolingo-streak', 1600, 1200, 'Adam and a friend wearing the felt owl masks on their heads; the friend holds up a phone showing a 1,000 day streak.', '1,000 days!'),
  shot('duolingo-group', 1600, 1200, 'A group of friends at night, most of them wearing or holding green felt owl masks.', 'the whole flock'),
]

const repo = (name: string) => [{ label: 'code on GitHub', href: `https://github.com/adamhacker06/${name}` }]

const RAINFALL = [
  shot('rainfall-of-babel-hero', 1600, 905, 'A dark screen titled The Rainfall of Babel, with grey words falling and a few glowing gold above a dense block of text.', 'real words glow gold'),
  shot('rainfall-of-babel-too-many', 1600, 907, 'An earlier version of the piece with the screen crowded by falling words.', 'too many words!'),
  shot('rainfall-of-babel-draft', 1600, 1135, 'A first draft where words sit on small coloured chips in a pile.', 'the first draft'),
]

const SOUNDILIZER = [
  shot('sound-for-someone-cover', 1600, 905, 'The Color Soundilizer app: a colour picker beside a canvas with a red heart drawn around the letters DES INV.', 'every colour is a sound'),
]

const DIGITAL_YOU = [
  shot('a-digital-you-final', 1600, 872, 'A chunky black pixel silhouette of a person holding up a peace sign against a near-white background.', "that's me, in pixels"),
  shot('a-digital-you-second', 1600, 872, 'A finer-grained black pixel silhouette flecked with small dots of colour.', 'finer cells'),
  shot('a-digital-you-first', 1600, 872, 'An early version with very large black cells that only loosely suggest a figure.', 'the first try'),
]

const EROSION = [
  shot('digital-erosion-wiring1', 1600, 1219, 'A potentiometer on a breadboard wired to an Arduino with red, yellow and black jumper wires.', 'the knob'),
  shot('digital-erosion-wiring2', 1600, 1212, 'A second view of the potentiometer and Arduino wiring.'),
]

const TREASURE = [
  shot('glow-treasure-hunt-final', 1600, 872, 'Three treasure chests in pink, tan and green on a dark screen, with a win streak of 10 in the corner.', 'which chest?'),
  shot('glow-treasure-hunt-wiring', 1352, 1484, 'An Arduino wired to a breadboard holding a single red LED and a resistor.', 'the LED knows'),
]

const TAIWAN = [
  photo('jiufen-teahouse', 1080, 1920, 'A hillside teahouse at night, strung with rows of glowing red lanterns.', 'jiufen'),
  photo('jiufen-hillside', 1586, 1982, 'A hillside town at night, its houses lit warm against a black sky.'),
  photo('brick-street', 1333, 2000, 'A quiet street of ornate red-brick shopfronts at dusk, framed by leaves.'),
  photo('taipei-101', 724, 1086, 'Taipei 101 rising into a grey evening sky, its spire lit orange.', 'Taipei 101'),
]

const PHILIPPINES = [
  photo('stone-window', 1333, 2000, 'Yellow wildflowers and a cloud-capped mountain seen through a gap in a stone wall.'),
  photo('boat-and-volcano', 1086, 724, 'A small boat on a calm grey sea with a cone-shaped volcano faint in the haze.'),
  photo('palms-under-cloud', 1333, 2000, 'Young palms in a green field below a mountainside swallowed by cloud.'),
  photo('yellow-flower', 2000, 1333, 'A single yellow flower in close-up against dark green leaves.'),
  photo('mirror-selfie', 2000, 1333, "Adam reflected in a car's wing mirror, holding a camera, with forest rushing past.", "that's me!"),
]

const CABO = [
  photo('sailboat', 1333, 2000, 'A sailboat on deep blue water at golden hour under a clear sky.'),
  photo('shadow-on-rocks', 360, 540, "The photographer's shadow on orange rocks at the edge of a bright blue sea."),
  photo('tacos', 360, 540, 'Tacos on blue plates at a shaded table, with a pool in the background.', 'tacos!'),
]

const DISNEYLAND = [
  photo('log-flume', 1333, 2000, 'A log flume boat full of riders tipping over the drop on a flower-covered mountain.'),
  photo('droid', 1333, 2000, 'A small white and green droid standing in hard sunlight.'),
  photo('spaceport-tower', 1000, 1500, 'A weathered sci-fi turret tower seen through trees and tall grass.'),
]

const CALIFORNIA = [
  photo('golden-gate', 1500, 2000, 'The Golden Gate Bridge seen through a blurred fence and pink flowers.', 'the Golden Gate'),
  photo('waterfall', 1333, 2000, 'A wide waterfall pouring over a granite cliff edged with pines.'),
  photo('waffle-cones', 2000, 1333, 'Two hands holding up loaded waffle cones in front of a rushing river.'),
]

// Everything on the wall is real; add a card by adding an entry here.
export const ITEMS: Item[] = [
  { id: 'duolingo-owls', kind: 'odds', title: 'Duolingo owl masks', photos: OWLS, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2, text: 'Felt owl masks I made to celebrate my friend’s 1,000-day Duolingo streak.' },
  { id: 'taiwan', kind: 'photos', title: 'Taiwan', photos: TAIWAN, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2.5, text: 'Lantern-lit Jiufen, a brick street at dusk and Taipei 101.' },
  {
    id: 'bluegrass',
    kind: 'odds',
    title: 'the bluegrass archive',
    photos: BLUEGRASS,
    links: [{ label: 'open the archive', href: 'https://drive.google.com/drive/folders/1I_wPrTWT286Z3UTsDGvDtQv24NT3t_vp' }],
    tone: 'var(--ink)',
    ratio: '1 / 1',
    tilt: 1.5,
    text: 'Decades of family photos and cassette recordings, scanned and compiled into video in 2020.',
  },
  { id: 'philippines', kind: 'photos', title: 'the Philippines', photos: PHILIPPINES, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2, text: 'Volcano views, palms under cloud and wildflowers.' },
  { id: 'playlist-covers', kind: 'design', title: 'playlist covers', photos: COVERS, tone: 'var(--ink)', ratio: '1 / 1', tilt: 3, text: 'Cover art I designed for my Spotify playlists.' },
  { id: 'cabo', kind: 'photos', title: 'Cabo', photos: CABO, tone: 'var(--ink)', ratio: '3 / 4', tilt: -1.5, text: 'A sailboat at golden hour, the rocky shore and tacos.' },
  { id: 'rainfall-of-babel', kind: 'code', title: 'Rainfall of Babel', photos: RAINFALL, links: repo('rainfall-of-babel'), tone: 'var(--ink)', ratio: '4 / 3', tilt: -1.5, text: 'Words generated from Borges’ Library of Babel rain down the screen, and only the real ones glow.' },
  { id: 'color-soundilizer', kind: 'code', title: 'Color Soundilizer', photos: SOUNDILIZER, links: repo('sound-for-someone'), tone: 'var(--ink)', ratio: '4 / 3', tilt: 2, text: 'A drawing tool where every colour plays its own sound, so a sketch becomes a song you can replay.' },
  { id: 'disneyland', kind: 'photos', title: 'Disneyland', photos: DISNEYLAND, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2.5, text: 'A log flume, a droid and a spaceport.' },
  { id: 'a-digital-you', kind: 'code', title: 'A Digital You', photos: DIGITAL_YOU, links: repo('a-digital-you'), tone: 'var(--ink)', ratio: '4 / 3', tilt: 2.5, text: 'Your webcam silhouette, redrawn live as a grid of chunky pixels.' },
  { id: 'glow-treasure-hunt', kind: 'code', title: 'Glow Treasure Hunt', photos: TREASURE, links: repo('glow-treasure-hunt'), tone: 'var(--ink)', ratio: '4 / 3', tilt: -2.5, text: 'A guessing game where the only clue is a real LED that glows brighter as you get warmer.' },
  { id: 'digital-erosion', kind: 'code', title: 'Digital Erosion', photos: EROSION, links: repo('digital-erosion'), tone: 'var(--ink)', ratio: '4 / 3', tilt: 1.5, text: 'A pulse that gets more chaotic the busier my calendar is, and a physical knob for calming it down.' },
  { id: 'california', kind: 'photos', title: 'California', photos: CALIFORNIA, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2, text: 'The Golden Gate, a waterfall and waffle cones by a river.' },
]
