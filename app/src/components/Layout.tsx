import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Doodle, RoughFilter } from './Doodle.tsx'

// Left to right, in the order the pages slide
const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/scrapbook', label: 'Scrapbook' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const current = LINKS.findIndex(({ to }) => to === pathname)

  // The stylesheet reads this to pick which way the page slides
  function setDirection(target: number) {
    document.documentElement.setAttribute('data-dir', target < current ? 'back' : 'forward')
  }

  return (
    <div className={pathname === '/' ? 'page home' : 'page'}>
      <header className="nav">
        <nav aria-label="Main">
          <ul>
            {LINKS.map(({ to, label }, i) => (
              <li key={to}>
                <NavLink to={to} end viewTransition onClick={() => setDirection(i)}>
                  {label}
                  <Doodle shape="squiggle" className="squiggle" />
                  <Doodle shape="loop" className="loop" />
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
