import { Link } from 'react-router-dom'
import heroImage from '../assets/home-page-image.jpg'
import gallery1 from '../assets/gallery1.png'
import gallery2 from '../assets/gallery2.png'
import gallery3 from '../assets/gallery3.png'
import Countdown from '../components/Countdown'

const STATS = [
  { value: '36h', label: 'Designathon' },
  { value: '500+', label: 'Participants' },
  { value: '6+', label: 'Events / Year' },
]

export default function Home() {
  return (
    <section className="relative flex flex-col">
      {/* Above the fold — title + image mosaic */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center min-h-[calc(100vh-10rem)]">
        {/* Left: title + tagline + CTAs */}
        <div className="flex flex-col gap-4 lg:w-2/5 shrink-0">
          <h1 className="font-mono font-bold uppercase text-white leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            McMaster
            <br />
            Design League
          </h1>
          <p className="uppercase font-bold text-sm sm:text-base md:text-lg text-white/70">
            Ontario's Hub for CAD Competition &amp; Workshop
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              to="/designathon"
              className="border border-white text-white font-bold uppercase text-sm px-6 py-3 rounded-pill text-center hover:bg-white hover:text-navy transition-colors"
            >
              2027 Designathon
            </Link>
            <Link
              to="/events"
              className="border border-white/30 text-white/80 font-bold uppercase text-sm px-6 py-3 rounded-pill text-center hover:border-white/60 hover:text-white transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>

        {/* Right: 3-image mosaic */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3 min-h-0">
          <div className="row-span-2 rounded-xl overflow-hidden border border-white/10">
            <img
              src={heroImage}
              alt="MDL team through a camera viewfinder"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={gallery1}
              alt="Students being interviewed at an MDL event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={gallery2}
              alt="CAD design work on a laptop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Below the fold */}
      <div className="flex flex-col gap-8 mt-10">
        {/* Countdown */}
        <div className="flex flex-col items-center gap-6 py-10">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-white/40">
            Designathon 2027 — January 17
          </p>
          <Countdown />
          <Link
            to="/designathon"
            className="text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/50 underline-offset-4"
          >
            Learn more
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center py-6">
              <p className="font-bold text-3xl sm:text-4xl md:text-5xl text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm uppercase tracking-widest text-white/40 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Full-width feature image */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <img
            src={gallery3}
            alt="Students collaborating at MDL designathon"
            className="w-full aspect-[21/9] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
