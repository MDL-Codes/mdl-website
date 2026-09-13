import events1 from '../assets/events.webp'
import events2 from '../assets/events2.webp'
import events3 from '../assets/events3.webp'

export type EventItem = {
  title: string
  date: string
  description: string
  photo: string
}

export const events: EventItem[] = [
  {
    title: 'Clubfest Booth',
    // TODO: confirm the date off the Instagram announcement.
    date: 'Fall 2026',
    description:
      'Come find our booth at Clubfest and meet the team. We will be there to talk about what MDL runs through the year — the workshops, the Designathon, and how to get involved — and to answer whatever you want to ask.',
    photo: events1,
  },
  {
    title: 'CAD-APULT',
    date: 'Fall 2025',
    description:
      'A mini-event designed for first-year engineering students. Participants work in teams to build a catapult using the provided materials, aiming to compete for challenges while creating bold ideas. Prizes are awarded to the winning teams at the end of the event.',
    photo: events2,
  },
  {
    title: 'Basic Assembly Workshop',
    date: 'Fall 2024',
    description:
      "Ever wanted to put together a car engine without the grease? In this workshop, you'll dive into Autodesk Inventor's assembly tools to build a model of a Boxer! You'll learn how to place parts, use constraints, and assemble everything together — from engine to the chassis. By the end, you'll have a complete digital engine and a solid handle on assembly basics. No prior experience needed.",
    photo: events3,
  },
  {
    title: 'Advanced Assembly Workshop',
    date: 'Fall 2024',
    description:
      'Take the next step in your assembly journey. In this workshop, learn advanced techniques to ship larger, more sophisticated CAD models — from complex constraints to motion studies and ergonomic considerations.',
    photo: events1,
  },
]
