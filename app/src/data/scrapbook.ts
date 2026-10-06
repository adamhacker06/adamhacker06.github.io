export const KINDS = {
  photos: 'Photos',
  builds: 'Builds',
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

// The albums, the bluegrass archive and the MLA are real; the other cards are stand-ins.
export const ITEMS: Item[] = [
  { id: 'taiwan', kind: 'photos', title: 'Taiwan', photos: TAIWAN, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2.5, text: 'Lantern-lit Jiufen, a brick street at dusk and Taipei 101.' },
  { id: 'bluegrass', kind: 'odds', title: 'the bluegrass archive', tone: 'var(--ink)', ratio: '4 / 3', tilt: 1.5, text: 'Decades of family photos and cassette recordings, scanned and compiled into video in 2020.' },
  { id: 'philippines', kind: 'photos', title: 'the Philippines', photos: PHILIPPINES, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2, text: 'Volcano views, palms under cloud and wildflowers.' },
  { id: 'build-1', kind: 'builds', title: 'a LEGO build', tone: 'var(--amber)', ratio: '1 / 1', tilt: 3, text: 'Stand-in for a build.' },
  { id: 'cabo', kind: 'photos', title: 'Cabo', photos: CABO, tone: 'var(--ink)', ratio: '3 / 4', tilt: -1.5, text: 'A sailboat at golden hour, the rocky shore and tacos.' },
  { id: 'code-1', kind: 'code', title: 'a code project', tone: 'var(--bar)', ratio: '4 / 3', tilt: -1.5, text: 'Stand-in for a project, with a link out to the repo.' },
  { id: 'mla', kind: 'odds', title: 'the MLA', tone: 'var(--cobalt-deep)', ratio: '4 / 3', tilt: -3, text: 'The multimodal literacy autobiography this whole site borrows its look from.' },
  { id: 'disneyland', kind: 'photos', title: 'Disneyland', photos: DISNEYLAND, tone: 'var(--ink)', ratio: '3 / 4', tilt: 2.5, text: 'A log flume, a droid and a spaceport.' },
  { id: 'code-2', kind: 'code', title: 'another project', tone: 'var(--ink)', ratio: '1 / 1', tilt: 2.5, text: 'Stand-in for a project.' },
  { id: 'california', kind: 'photos', title: 'California', photos: CALIFORNIA, tone: 'var(--ink)', ratio: '3 / 4', tilt: -2, text: 'The Golden Gate, a waterfall and waffle cones by a river.' },
  { id: 'odd-1', kind: 'odds', title: 'a small thing', tone: 'var(--amber)', ratio: '4 / 3', tilt: 1, text: "Anything that doesn't need its own category." },
]
