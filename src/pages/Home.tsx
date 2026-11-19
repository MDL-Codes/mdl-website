/**
 * Home — full-bleed blueprint redesign.
 *
 * Nav and Footer used to live here because Home opted out of Layout. Layout is
 * full-bleed now and owns both, so this is just the section stack; the chrome is
 * shared with every other page.
 */

import Hero from '../components/home/Hero'
import Countdown from '../components/home/Countdown'
import AboutUs from '../components/home/AboutUs'
import WhatsOn from '../components/home/WhatsOn'
import Recap from '../components/home/Recap'
import Sponsors from '../components/home/Sponsors'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <AboutUs />
      <WhatsOn />
      <Recap />
      <Sponsors />
      <FinalCTA />
    </>
  )
}
