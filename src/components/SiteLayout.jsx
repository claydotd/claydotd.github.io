import { Link, Outlet, useLocation } from 'react-router-dom'
import { memo } from 'react'
import FilmGrain from './FilmGrain'
import HomeFloatingKit from './HomeFloatingKit'
import './SiteLayout.css'
import { PageTransition } from './PageTransition'

const navLinks = [
  { to: '/', label: 'home' },
  { to: '/audio', label: 'audio' },
  { to: '/web-design', label: 'web design' },
  { to: '/photo', label: 'photo' },
]

const lights = [
  {
    id: 'warm-window',
    className: 'light light--warm',
    duration: '14s',
    delay: '-3s',
    min: 0.38,
    max: 0.92,
  },
  {
    id: 'amber-corner',
    className: 'light light--amber',
    duration: '21s',
    delay: '-9s',
    min: 0.25,
    max: 0.72,
  },
  {
    id: 'top-falloff',
    className: 'light light--falloff',
    duration: '18s',
    delay: '-6s',
    min: 0.3,
    max: 0.8,
  },
  {
    id: 'sun-shaft',
    className: 'light light--shaft',
    duration: '26s',
    delay: '-14s',
    min: 0.2,
    max: 0.65,
  },
  {
    id: 'floor-glow',
    className: 'light light--floor',
    duration: '16s',
    delay: '-11s',
    min: 0.15,
    max: 0.55,
  },
]

const Atmosphere = memo(function Atmosphere() {
  return (
    <>
      <div className="atmosphere atmosphere-lights" aria-hidden="true">
        {lights.map((light) => (
          <div
            key={light.id}
            className={light.className}
            style={{
              '--pulse-duration': light.duration,
              '--pulse-delay': light.delay,
              '--pulse-min': light.min,
              '--pulse-max': light.max,
            }}
          />
        ))}
      </div>
      <div className="atmosphere atmosphere-vignette" aria-hidden="true" />
      <div className="atmosphere atmosphere-dust" aria-hidden="true" />
      <FilmGrain />
    </>
  )
})

export default function SiteLayout() {
  const { pathname } = useLocation()

  return (
    <div className="site-shell">
      <Atmosphere />

      <header className="site-header">
        <Link className="brand" to="/">
          analogue gone digital
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={pathname === to ? 'nav-link is-active' : 'nav-link'}
              aria-current={pathname === to ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <HomeFloatingKit />
      <PageTransition>
        <Outlet />
      </PageTransition>
      

      <footer className="site-footer">
        <p>
          <Link to="/#contact">contact</Link>
          {' · '}
          <a href="mailto:hello@analoguegonedigital.co.uk">hello@analoguegonedigital.co.uk</a>
        </p>
      </footer>
    </div>
  )
}
