import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Nav from './home/Nav'
import Footer from './home/Footer'

type Props = {
  children: ReactNode
}

/**
 * The single page shell. Every route renders through this now, Home included —
 * Home used to bypass it and hand-roll its own Nav/Footer, which is how the site
 * ended up with two navigations (different labels, no Gallery link, hamburger at
 * 768 here and 720 there) and two footers.
 *
 * Deliberately full-bleed: no max-width and no horizontal padding. Sections own
 * their own gutters, which is what lets a page paint edge-to-edge bands — the
 * old `max-w-6xl mx-auto px-5…` boxed Mission's full-width cream band into a
 * 1152px card floating in navy. Pages that want a measured column wrap their
 * content in <PageShell> instead.
 *
 * Footer sits in normal flow at the end of a min-h-screen column rather than
 * `fixed`, so short pages push it to the bottom and long ones scroll past it.
 * The old fixed 32px bar overlapped content at the bottom of every page.
 */
export default function Layout({ children }: Props) {
  const location = useLocation()

  // Layout no longer owns a scroll container — the document scrolls — so reset
  // the window, not a panel. FullPage is exempt: it lands via scrollIntoView.
  useEffect(() => {
    if (location.pathname !== '/full') window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-navy-900 font-plex">
      <Nav />
      <main key={location.pathname} className="page-fade flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
