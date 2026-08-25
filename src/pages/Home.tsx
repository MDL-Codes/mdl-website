/**
 * Home — full-bleed blueprint redesign. Routed outside Layout in App.tsx.
 *
 * SCAFFOLD: every section below is a placeholder at its Figma height. They get
 * replaced one at a time, top to bottom, by real components in
 * src/components/home/. Delete Stub once the last section lands.
 */

import Nav from '../components/home/Nav'
import Hero from '../components/home/Hero'
import Countdown from '../components/home/Countdown'
import AboutUs from '../components/home/AboutUs'
import Events from '../components/home/Events'
import Recap from '../components/home/Recap'
import Sponsors from '../components/home/Sponsors'

type StubProps = {
  node: string
  name: string
  height: number
  surface: 'navy' | 'paper'
  pattern?: 'bp-grid' | 'iso-hatch'
}

function Stub({ node, name, height, surface, pattern }: StubProps) {
  const navy = surface === 'navy'
  return (
    <section
      style={{ height }}
      className={`relative w-full ${navy ? 'bg-navy-900' : 'bg-paper'}`}
    >
      {pattern && <div className={`absolute inset-0 ${pattern}`} />}
      <div
        className={`relative flex h-full items-center justify-center gap-4 font-plex text-[11px] uppercase tracking-[0.22em] ${
          navy ? 'text-navy-200' : 'text-navy-600'
        }`}
      >
        <span>{name}</span>
        <span className="opacity-40">{node}</span>
        <span className="opacity-40">{height}px</span>
      </div>
    </section>
  )
}

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
      <Stub node="5:117" name="final CTA" height={300} surface="navy" />
      <Stub node="5:118" name="footer" height={320} surface="navy" />
    </div>
  )
}
