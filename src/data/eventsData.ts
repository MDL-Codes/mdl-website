import events1 from '../assets/events.png'
import events2 from '../assets/events2.png'
import events3 from '../assets/events3.png'

export type EventItem = {
  title: string
  date: string
  description: string
  photo: string
}

export const events: EventItem[] = [
  {
    title: 'My Placeholder Event',
    date: 'August 2026',
    description:
      "This is a workshop we haven't figured out yet. If you're still reading this, you're either early or lost, but either way, we appreciate the dedication. More details coming soon.",
    photo: events1,
  },
  {
    title: 'CAD-aplt',
    date: 'September 2026',
    description:
      'A mini-event designed for first-year engineering students. Participants work in teams to build a catapult using the provided materials, aiming to compete for challenges while creating bold ideas. Prizes are awarded to the winning teams at the end of the event.',
    photo: events2,
  },
  {
    title: 'Basic Assembly Workshop',
    date: 'October 2026',
    description:
      "Ever wanted to put together a car engine without the grease? In this workshop, you'll dive into Autodesk Inventor's assembly tools to build a model of a Boxer! You'll learn how to place parts, use constraints, and assemble everything together — from engine to the chassis. By the end, you'll have a complete digital engine and a solid handle on assembly basics. No prior experience needed.",
    photo: events3,
  },
  {
    title: 'Advanced Assembly Workshop',
    date: 'October 2026',
    description:
      'Take the next step in your assembly journey. In this workshop, learn advanced techniques to ship larger, more sophisticated CAD models — from complex constraints to motion studies and ergonomic considerations.',
    photo: events1,
  },
]
