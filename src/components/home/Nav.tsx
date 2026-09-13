import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import mdlWhite from '../../assets/MDL_white.svg'

// Figma 4:108. The single source of truth for site navigation — the old
// Sidebar.tsx had a second, divergent list (OUR MISSION vs MISSION) and was the
// only place GALLERY was reachable from. Both are reconciled here.
//
// `hash` is the section id FullPage.tsx renders for each route; on /full the
// links scroll to those sections instead of navigating.
const LINKS = [
  { to: '/', label: 'Home', hash: 'home' },
  { to: '/designathon', label: 'Designathon', hash: 'designathon' },
  { to: '/mission', label: 'Mission', hash: 'mission' },
  { to: '/team', label: 'Team', hash: 'team' },
  { to: '/events', label: 'Events', hash: 'events' },
  { to: '/gallery', label: 'Gallery', hash: 'gallery' },
]

// Figma's four 11x10 hairline L-marks, one per corner, hidden until hover/focus.
const CORNERS = [
  'left-0 top-0 border-l border-t',
  'right-0 top-0 border-r border-t',
  'left-0 bottom-0 border-l border-b',
  'right-0 bottom-0 border-r border-b',
]

// Padding is tighter than Figma's flat 20px because the list carries six items
// now, not five: at 20px the row measured ~751px and broke its own 720px
// breakpoint. Clamped, the six fit at 720 and reach Figma's spacing by ~1100.
const LINK_BASE =
  'font-plex text-[11px] uppercase leading-none tracking-[1.54px] transition-colors duration-200'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // /full stacks every page as one scroll; links there move within the page.
  const isFullPage = pathname === '/full'

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

  // One renderer for the bar and the drawer both, so they can never drift apart
  // the way Nav and the old Sidebar did. On /full these are scroll buttons;
  // everywhere else, router links. The current page reads paper against the
  // others' navy-200 — the old Sidebar's filled active pill has no equivalent
  // in this chrome, and inverting one item would fight the corner ticks.
  const item = (link: (typeof LINKS)[number], box: string) => {
    const active = !isFullPage && pathname === link.to
    const className = `group relative ${box} ${LINK_BASE} ${
      active ? 'text-paper' : 'text-navy-200 [@media(hover:hover)]:hover:text-paper'
    } focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-paper`

    if (isFullPage) {
      return (
        <button
          key={link.to}
          type="button"
          onClick={() => {
            document.getElementById(link.hash)?.scrollIntoView({ behavior: 'smooth' })
            setOpen(false)
          }}
          className={className}
        >
          {link.label}
          {ticks}
        </button>
      )
    }

    return (
      <Link key={link.to} to={link.to} aria-current={active ? 'page' : undefined} className={className}>
        {link.label}
        {ticks}
      </Link>
    )
  }

  return (
    <header className="w-full bg-navy-950 px-[clamp(20px,3.47vw,50px)]">
      <div className="flex h-[var(--nav-h)] w-full items-center justify-between">
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
          className="hidden min-[720px]:flex min-[720px]:items-center min-[720px]:gap-x-[clamp(4px,1.1vw,24px)]"
        >
          {LINKS.map(link => item(link, 'px-[clamp(8px,1.25vw,20px)] py-[12px]'))}
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
        {LINKS.map(link => item(link, 'self-start px-[10px] py-[14px]'))}
      </div>
    </header>
  )
}
