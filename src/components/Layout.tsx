import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import BackToTop from './BackToTop'
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
 * BackToTop lives here rather than on the handful of pages that happen to be
 * long. It only shows itself once the visitor is a screen down, so a page with
 * nothing to scroll never renders a visible button — the threshold does the
 * picking, and no page has to remember to opt in.
 *
 * Footer sits in normal flow at the end of a min-h-screen column rather than
 * `fixed`, so short pages push it to the bottom and long ones scroll past it.
 * The old fixed 32px bar overlapped content at the bottom of every page.
 */
export default function Layout({ children }: Props) {
  const location = useLocation()

  // Layout no longer owns a scroll container — the document scrolls — so reset
  // the window, not a panel. FullPage is exempt: it lands via scrollIntoView.
  //
  // A hash wins over the reset, otherwise a link like /designathon#faq would
  // navigate and then immediately scroll away from what it asked for. This runs
  // after the commit, so the target is already in the DOM.
  useEffect(() => {
    if (location.pathname === '/full') return

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView()
        return
      }
    }

    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <div className="flex min-h-screen flex-col bg-navy-900 font-plex">
      <Nav />
      <main key={location.pathname} className="page-fade flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
