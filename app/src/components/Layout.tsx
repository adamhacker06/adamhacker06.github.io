import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Doodle, RoughFilter } from './Doodle.tsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/scrapbook', label: 'Scrapbook' },
]

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className={pathname === '/' ? 'page home' : 'page'}>
      <header className="nav">
        <nav aria-label="Main">
          <ul>
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end viewTransition>
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
