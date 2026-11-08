import { photo, shot } from './images.ts'
import type { Photo } from './images.ts'

export type { Photo }

export const KINDS = {
  photos: 'Photos',
  odds: 'Odds & ends',
} as const

export type Kind = keyof typeof KINDS

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

const BLUEGRASS = [
  shot('bluegrass-archive', 988, 984, 'A faded colour snapshot of a young man in a graduation cap and gown, with a woman beside him smiling up at him.'),
]

const OWLS = [
  shot('duolingo-making', 768, 1024, 'A green felt owl mask with big white eyes and an orange beak, lying beside scissors and a sheet of traced outlines.', 'cut out of felt'),
  shot('duolingo-batch', 768, 1024, 'Ten finished green felt owl masks laid out on a wooden floor among glue guns, scissors and felt offcuts.', 'the production line'),
  shot('duolingo-wearing', 768, 1024, 'Adam standing in a doorway wearing one of the green felt owl masks over his eyes.', 'quality control'),
  shot('duolingo-streak', 1600, 1200, 'Adam and a friend wearing the felt owl masks on their heads; the friend holds up a phone showing a 1,000 day streak.', '1,000 days!'),
  shot('duolingo-group', 1600, 1200, 'A group of friends at night, most of them wearing or holding green felt owl masks.', 'the whole flock'),
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
  { id: 'taiwan', kind: 'photos', title: 'Taiwan', photos: TAIWAN, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2.5, text: 'Lantern-lit Jiufen, a brick street at dusk and Taipei 101.' },
  {
    id: 'bluegrass',
    kind: 'odds',
    title: 'the bluegrass archive',
    photos: BLUEGRASS,
    links: [{ label: 'listen to the recordings', href: 'https://drive.google.com/drive/folders/1cyLoQhLFnhs14Q2gP5uVhBFNilQJj_T-' }],
    tone: 'var(--ink)',
    ratio: '1 / 1',
    tilt: -1.5,
    text: 'Decades of family photos and cassette recordings, scanned and compiled into video in 2020.',
  },
  { id: 'philippines', kind: 'photos', title: 'the Philippines', photos: PHILIPPINES, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2, text: 'Volcano views, palms under cloud and wildflowers.' },
  { id: 'cabo', kind: 'photos', title: 'Cabo', photos: CABO, tone: 'var(--ink)', ratio: '3 / 4', tilt: -1.5, text: 'A sailboat at golden hour, the rocky shore and tacos.' },
  { id: 'disneyland', kind: 'photos', title: 'Disneyland', photos: DISNEYLAND, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2.5, text: 'A log flume, a droid and a spaceport.' },
  { id: 'california', kind: 'photos', title: 'California', photos: CALIFORNIA, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2, text: 'The Golden Gate, a waterfall and waffle cones by a river.' },
]
