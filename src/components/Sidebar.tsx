import { NavLink, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/designathon', hash: 'designathon', label: 'DESIGNATHON' },
  { to: '/mission', hash: 'mission', label: 'OUR MISSION' },
  { to: '/team', hash: 'team', label: 'OUR TEAM' },
  { to: '/events', hash: 'events', label: 'EVENTS' },
  { to: '/gallery', hash: 'gallery', label: 'GALLERY' },
]

const ALL_ITEMS = [
  { to: '/', label: 'HOME', end: true, hash: 'home' },
  ...NAV_ITEMS.map(n => ({ ...n, end: false })),
]

type Props = {
  onNavigate?: () => void
  vertical?: boolean
}

export default function Sidebar({ onNavigate, vertical }: Props) {
  const { pathname } = useLocation()
  const isFullPage = pathname === '/full'

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    onNavigate?.()
  }

  const direction = vertical ? 'flex-col items-start gap-1' : 'flex-row flex-wrap items-center justify-center gap-2'

  return (
    <nav aria-label="Primary" className={`flex ${direction}`}>
      {isFullPage
        ? ALL_ITEMS.map(({ hash, label }) => (
            <button
              key={hash}
              type="button"
              onClick={() => scrollTo(hash)}
              className="px-4 py-1.5 rounded-full text-sm font-mono font-bold tracking-wider text-white/80 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              {label}
            </button>
          ))
        : ALL_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  'px-4 py-1.5 rounded-full text-sm font-mono font-bold tracking-wider transition-all duration-200',
                  isActive
                    ? 'text-navy bg-white'
                    : 'text-white/80 hover:text-white hover:bg-white/15',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
    </nav>
  )
}
