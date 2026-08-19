import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import mdlWhite from '../../assets/MDL_white.svg'

// Figma 4:108. Labels differ from Sidebar's NAV_ITEMS (MISSION vs OUR MISSION,
// no GALLERY, HOME included), so the list is local. Sidebar.tsx is frozen.
const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/designathon', label: 'Designathon' },
  { to: '/mission', label: 'Mission' },
  { to: '/team', label: 'Team' },
  { to: '/events', label: 'Events' },
]

// Figma's four 11x10 hairline L-marks, one per corner, hidden until hover/focus.
const CORNERS = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'left-0 bottom-0 border-l border-b',
  'right-0 bottom-0 border-r border-b',
]

const LINK_BASE =
  'font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-200'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Mirrors Layout.tsx:16 — force the drawer shut on navigation.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button') ?? [])

    focusables()[0]?.focus()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setOpen(false)
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const edge = e.shiftKey ? f[0] : f[f.length - 1]
      if (document.activeElement === edge) {
        e.preventDefault()
        ;(e.shiftKey ? f[f.length - 1] : f[0]).focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      // ponytail: also fires if Nav ever unmounts; it never does (it is not routed).
      buttonRef.current?.focus()
    }
  }, [open])

  const ticks = CORNERS.map(c => (
    <span
      key={c}
      aria-hidden
      className={`pointer-events-none absolute h-[10px] w-[11px] border-current opacity-0 transition-opacity duration-200 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:opacity-100 ${c}`}
    />
  ))

  return (
    <header className="w-full bg-navy-950 px-[clamp(20px,3.47vw,50px)]">
      <div className="flex h-[72px] w-full items-center justify-between">
        <Link to="/" aria-label="McMaster Design League, home" className="shrink-0">
          <img
            src={mdlWhite}
            alt="McMaster Design League"
            width={212}
            height={43}
            className="h-auto w-[clamp(96px,8vw,115px)]"
          />
        </Link>

        {/* 720px: below it the logo/link gutter drops under 50px and reads as crowded. */}
        <nav
          aria-label="Primary"
          className="hidden min-[720px]:flex min-[720px]:items-center min-[720px]:gap-x-[clamp(10px,2.2vw,32px)]"
        >
          {LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={`group relative px-[20px] py-[12px] ${LINK_BASE}`}>
              {label}
              {ticks}
            </Link>
          ))}
        </nav>

        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls="home-nav-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative z-50 flex h-[38px] w-[38px] flex-col items-center justify-center gap-[7px] min-[720px]:hidden"
        >
          <span
            className={`h-px w-[22px] bg-navy-200 transition-transform duration-200 ${open ? 'translate-y-[8px] rotate-45' : ''}`}
          />
          <span className={`h-px w-[22px] bg-navy-200 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span
            className={`h-px w-[22px] bg-navy-200 transition-transform duration-200 ${open ? '-translate-y-[8px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-navy-950/60 transition-opacity duration-200 min-[720px]:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      {/* Kept mounted so it can slide both ways; `inert` takes it out of the tab order and the
          a11y tree while shut, which `visibility` can't do without breaking the transition. */}
      <div
        id="home-nav-drawer"
        ref={panelRef}
        {...({ inert: open ? undefined : '' } as { inert?: string })}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(320px,80vw)] flex-col gap-2 border-r border-navy-800 bg-navy-950 px-[30px] pt-[24px] transition-transform duration-300 min-[720px]:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to} className={`group relative self-start px-[10px] py-[14px] ${LINK_BASE}`}>
            {label}
            {ticks}
          </Link>
        ))}
      </div>
    </header>
  )
}
