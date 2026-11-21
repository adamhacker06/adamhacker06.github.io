import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { RoughFilter } from './Doodle.tsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/scrapbook', label: 'Scrapbook' },
]

// One pen stroke in two parts: an underline for hover, and a loop that starts exactly where
// the underline ends, so clicking a tab looks like the same line carrying on round the word.
function NavMark() {
  return (
    <svg className="doodle mark" viewBox="0 0 108 60" preserveAspectRatio="none" aria-hidden="true">
      <path className="under" d="M18 47 C 30 43, 42 50, 55 46 S 76 49, 90 45" />
      <path className="loop" d="M90 45 C 105 41, 102 15, 80 9 C 58 2, 24 7, 11 19 C 0 34, 12 52, 38 52 C 60 53, 86 58, 97 45 C 102 38, 101 28, 95 22" />
    </svg>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()

  // A new page starts at the top, not wherever the last one was scrolled to, unless the link
  // points at a section on it by id (such as /page#section)
  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  // Keep the browser tab's title in step with the page; scripts/postbuild.mjs sets the same titles for crawlers
  useEffect(() => {
    // The Now page is unlisted: not in the nav, and nothing links to it
    const page = [...LINKS, { to: '/now', label: 'Now' }].find(({ to }) => to !== '/' && pathname.startsWith(to))
    document.title = page ? `${page.label} · Adam Hacker` : 'Adam Hacker'
  }, [pathname])

  return (
    <div className={pathname === '/' ? 'page home' : 'page'}>
      <header className="nav">
        <nav aria-label="Main">
          <ul>
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} viewTransition>
                  {label}
                  <NavMark />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <Outlet />

      <RoughFilter />
    </div>
  )
}
