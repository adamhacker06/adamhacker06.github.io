// Shared photo helpers. Compressed copies live in assets/photography (trips) and assets/projects
// (screenshots, build photos and design work), each with 640px versions in thumbs/.

export type Photo = {
  src: string
  thumb: string
  alt: string
  // Optional handwritten note shown under the photo
  caption?: string
  width: number
  height: number
}

const full = import.meta.glob<string>('../assets/photography/*.webp', { eager: true, query: '?url', import: 'default' })
const thumbs = import.meta.glob<string>('../assets/photography/thumbs/*.webp', { eager: true, query: '?url', import: 'default' })

export function photo(name: string, width: number, height: number, alt: string, caption?: string): Photo {
  return {
    src: full[`../assets/photography/${name}.webp`],
    thumb: thumbs[`../assets/photography/thumbs/${name}.webp`],
    alt,
    caption,
    width,
    height,
  }
}

const projectFull = import.meta.glob<string>('../assets/projects/*.webp', { eager: true, query: '?url', import: 'default' })
const projectThumbs = import.meta.glob<string>('../assets/projects/thumbs/*.webp', { eager: true, query: '?url', import: 'default' })

export function shot(name: string, width: number, height: number, alt: string, caption?: string): Photo {
  return {
    src: projectFull[`../assets/projects/${name}.webp`],
    thumb: projectThumbs[`../assets/projects/thumbs/${name}.webp`],
    alt,
    caption,
    width,
    height,
  }
}
