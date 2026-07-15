import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Designathon from './pages/Designathon'
import Mission from './pages/Mission'
import Team from './pages/Team'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import FullPage from './pages/FullPage'
import NotFound from './pages/NotFound'
import { useEffect } from 'react'

const PAGE_TITLES: Record<string, string> = {
  '/': 'McMaster Design League',
  '/designathon': 'Designathon — McMaster Design League',
  '/mission': 'Our Mission — McMaster Design League',
  '/team': 'Our Team — McMaster Design League',
  '/events': 'Events — McMaster Design League',
  '/gallery': 'Gallery — McMaster Design League',
  '/full': 'McMaster Design League',
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = PAGE_TITLES[location.pathname] ?? 'McMaster Design League'
  }, [location.pathname])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designathon" element={<Designathon />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/full" element={<FullPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
