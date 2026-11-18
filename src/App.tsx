import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Designathon from './pages/Designathon'
import Mission from './pages/Mission'
import Team from './pages/Team'
import Sponsors from './pages/Sponsors'
import Gallery from './pages/Gallery'
import Designs from './pages/Designs'
import FullPage from './pages/FullPage'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'

const PAGE_TITLES: Record<string, string> = {
  '/': 'McMaster Design League',
  '/designathon': 'Designathon — McMaster Design League',
  '/mission': 'Our Mission — McMaster Design League',
  '/team': 'Our Team — McMaster Design League',
  '/sponsors': 'Sponsors — McMaster Design League',
  '/gallery': 'Gallery — McMaster Design League',
  '/designs': 'CAD Designs — McMaster Design League',
  '/full': 'McMaster Design League',
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? 'McMaster Design League'
  }, [location.pathname])

  // Every route shares one shell. Home used to sit outside Layout because Layout
  // boxed its children in a 1152px column; Layout is full-bleed now, so the
  // exception (and the duplicate nav/footer it forced) is gone.
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designathon" element={<Designathon />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
        {/* Events page was retired; old links land on Home. */}
        <Route path="/events" element={<Navigate to="/" replace />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Not in Nav's LINKS yet — this is a prototype you reach by typing the
            URL, so it can be evaluated without shipping it to visitors. */}
        <Route path="/designs" element={<Designs />} />
        <Route path="/full" element={<FullPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
