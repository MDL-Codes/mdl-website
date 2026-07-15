import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from './Footer'
import MDLLogo from './MDLLogo'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    setMobileNavOpen(false)
    const panel = document.getElementById('content-scroll')
    if (panel) panel.scrollTop = 0
  }, [location.pathname])

  return (
    <div className="relative min-h-screen pb-8">
      {/* Background: center glow + grain */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
        <div className="bg-grain absolute inset-0" />
      </div>
      {/* Desktop top navbar */}
      <header className="hidden md:block sticky top-0 z-20 bg-navy/95 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-8 px-6 lg:px-10 py-3.5">
          <Link
            to="/"
            aria-label="Home"
            className="text-white hover:text-white transition-colors shrink-0"
          >
            <MDLLogo className="w-14 h-9" />
          </Link>
          <Sidebar />
        </div>
      </header>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileNavOpen((s) => !s)}
        className="md:hidden fixed top-3 right-4 text-white border border-border rounded-pill px-3 py-1 text-xs z-20 bg-navy"
        aria-label="Toggle navigation"
        aria-expanded={mobileNavOpen}
      >
        {mobileNavOpen ? 'CLOSE' : 'MENU'}
      </button>

      {/* Mobile drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed top-12 left-0 right-0 bg-navy border-t border-border/30 px-5 py-4 z-10">
          <Sidebar onNavigate={() => setMobileNavOpen(false)} vertical />
        </div>
      )}

      {/* Main content area */}
      <main
        id="content-scroll"
        key={location.pathname}
        className="relative z-10 page-fade max-w-6xl mx-auto px-5 sm:px-8 md:px-10 lg:px-14 pt-10 md:pt-12 pb-12"
      >
        {children}
      </main>

      {/* Mobile-only logo */}
      <div className="md:hidden flex justify-start px-5 pb-4">
        <Link to="/" aria-label="Home" className="text-white/85 hover:text-white transition-colors">
          <MDLLogo className="w-16 h-10" />
        </Link>
      </div>

      <Footer />
    </div>
  )
}
