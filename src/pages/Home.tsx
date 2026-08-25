/**
 * Home — full-bleed blueprint redesign. Routed outside Layout in App.tsx.
 *
 * All nine sections are real now; the Stub scaffold is gone. Home renders its
 * own nav and footer (src/components/home/), separate from the frozen
 * Layout/Footer chrome the other five pages still use.
 */

import Nav from '../components/home/Nav'
import Hero from '../components/home/Hero'
import Countdown from '../components/home/Countdown'
import AboutUs from '../components/home/AboutUs'
import Events from '../components/home/Events'
import Recap from '../components/home/Recap'
import Sponsors from '../components/home/Sponsors'
import FinalCTA from '../components/home/FinalCTA'
import Footer from '../components/home/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-900 font-plex">
      <Nav />
      <Hero />
      <Countdown />
      <AboutUs />
      <Events />
      <Recap />
      <Sponsors />
      <FinalCTA />
      <Footer />
    </div>
  )
}
