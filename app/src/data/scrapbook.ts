export const KINDS = {
  photos: 'Photos',
  builds: 'Builds',
  code: 'Code',
  odds: 'Odds & ends',
} as const

export type Kind = keyof typeof KINDS

export type Item = {
  id: string
  kind: Kind
  title: string
  text: string
  album?: boolean
  // Placeholder look until real images exist
  tone: string
  ratio: string
  tilt: number
}

// Sample content: the bluegrass archive and the MLA are real, the rest are stand-ins.
export const ITEMS: Item[] = [
  { id: 'album-1', kind: 'photos', album: true, title: 'an album goes here', tone: 'var(--cobalt)', ratio: '4 / 3', tilt: -2.5, text: 'One card per shoot or theme. Opening it lays the photos out straight and large.' },
  { id: 'bluegrass', kind: 'odds', title: 'the bluegrass archive', tone: 'var(--ink)', ratio: '4 / 3', tilt: 1.5, text: 'Decades of family photos and cassette recordings, scanned and compiled into video in 2020.' },
  { id: 'build-1', kind: 'builds', title: 'a LEGO build', tone: 'var(--amber)', ratio: '1 / 1', tilt: 3, text: 'Stand-in for a build.' },
  { id: 'code-1', kind: 'code', title: 'a code project', tone: 'var(--bar)', ratio: '4 / 3', tilt: -1.5, text: 'Stand-in for a project, with a link out to the repo.' },
  { id: 'album-2', kind: 'photos', album: true, title: 'another album', tone: 'var(--marker)', ratio: '3 / 4', tilt: 2, text: 'Stand-in for a second album.' },
  { id: 'mla', kind: 'odds', title: 'the MLA', tone: 'var(--cobalt-deep)', ratio: '4 / 3', tilt: -3, text: 'The multimodal literacy autobiography this whole site borrows its look from.' },
  { id: 'code-2', kind: 'code', title: 'another project', tone: 'var(--ink)', ratio: '1 / 1', tilt: 2.5, text: 'Stand-in for a project.' },
  { id: 'album-3', kind: 'photos', album: true, title: 'a third album', tone: 'var(--bar)', ratio: '4 / 3', tilt: -2, text: 'Stand-in for a third album.' },
  { id: 'odd-1', kind: 'odds', title: 'a small thing', tone: 'var(--amber)', ratio: '4 / 3', tilt: 1, text: "Anything that doesn't need its own category." },
]
