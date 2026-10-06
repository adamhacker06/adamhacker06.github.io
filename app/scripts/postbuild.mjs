// Runs after `vite build`. GitHub Pages only answers "200 OK" for files that exist, so this writes
// a real index.html for every route, each with its own title, description and URL for search
// engines and link previews. It also keeps the 404.html fallback for any other address.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const SITE = 'https://adamhacker.dev/'
const HOME_TITLE = 'Adam Hacker'
const HOME_DESCRIPTION =
  "Personal site of Adam Hacker, a UC Berkeley student in CS, education and design. Photography, projects and what I'm up to right now."

const PAGES = [
  { path: 'about', title: 'About · Adam Hacker', description: 'About Adam Hacker, a UC Berkeley student in CS, education and design.' },
  { path: 'experience', title: 'Experience · Adam Hacker', description: 'Where Adam Hacker has worked and what he has built.' },
  {
    path: 'scrapbook',
    title: 'Scrapbook · Adam Hacker',
    description: "Adam Hacker's scrapbook: photo albums from Taiwan, the Philippines, Cabo, Disneyland and California, plus things he has made.",
  },
]

const home = readFileSync('dist/index.html', 'utf8')

// Swap every occurrence, and fail the build if the header no longer contains what we expect
function swap(html, from, to) {
  if (!html.includes(from)) throw new Error(`postbuild: expected to find ${JSON.stringify(from)} in index.html`)
  return html.replaceAll(from, to)
}

for (const page of PAGES) {
  let html = home
  html = swap(html, `<title>${HOME_TITLE}</title>`, `<title>${page.title}</title>`)
  html = swap(html, `property="og:title" content="${HOME_TITLE}"`, `property="og:title" content="${page.title}"`)
  html = swap(html, `content="${HOME_DESCRIPTION}"`, `content="${page.description}"`)
  html = swap(html, `rel="canonical" href="${SITE}"`, `rel="canonical" href="${SITE}${page.path}/"`)
  html = swap(html, `property="og:url" content="${SITE}"`, `property="og:url" content="${SITE}${page.path}/"`)
  mkdirSync(`dist/${page.path}`, { recursive: true })
  writeFileSync(`dist/${page.path}/index.html`, html)
}

copyFileSync('dist/index.html', 'dist/404.html')
console.log(`postbuild: wrote ${PAGES.map((p) => `/${p.path}/`).join(', ')} and 404.html`)
