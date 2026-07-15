import Home from './Home'
import Designathon from './Designathon'
import Mission from './Mission'
import Team from './Team'
import Events from './Events'
import Gallery from './Gallery'

const SECTIONS = [
  { id: 'home', component: Home },
  { id: 'designathon', component: Designathon },
  { id: 'mission', component: Mission },
  { id: 'team', component: Team },
  { id: 'events', component: Events },
  { id: 'gallery', component: Gallery },
]

export default function FullPage() {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {SECTIONS.map(({ id, component: Component }) => (
        <div key={id} id={id} className="scroll-mt-12">
          <Component />
        </div>
      ))}
    </div>
  )
}
