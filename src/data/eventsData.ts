import events1 from '../assets/events.webp'
import events2 from '../assets/events2.webp'
import events3 from '../assets/events3.webp'
import clubfest from '../assets/clubfest-2026.webp'
import cadEscapeRoom from '../assets/cad-escape-room.webp'

export type EventItem = {
  title: string
  date: string
  description: string
  photo: string
  /**
   * Set when `photo` is a poster rather than a photograph. Posters carry text
   * to their own edges, so cropping one to the card's shape cuts the words off;
   * these are letterboxed instead.
   */
  contain?: boolean
  /**
   * Where to register, when registration is open. Only upcoming events carry
   * one; the Events page renders the button off this field, so clearing it when
   * registration closes is what removes the button.
   */
  register?: string
  /**
   * The calendar date, `YYYY-MM-DD`, for events that have one. `date` is the
   * written form and is free text — several entries are only ever "Fall 2024" —
   * so it cannot be compared; this is the machine-readable twin, and it is what
   * decides whether an event reads as upcoming or as past.
   *
   * An event with no `on` is past. That is the safe default: the field is only
   * ever added to something being announced, and a missing one must not put a
   * years-old workshop back at the top of the page under an UPCOMING tag.
   */
  on?: string
}

/**
 * Upcoming through the END of its own day, not from the moment it starts — an
 * event still running at 7 PM should not have moved itself into the past
 * section while people are standing in the room.
 *
 * Compared as `YYYY-MM-DD` strings in the visitor's own local date. Building a
 * Date from `on` would parse it as UTC midnight and tip over a few hours early
 * for anyone west of Greenwich, which for a Hamilton club is everyone.
 */
export function isUpcoming(event: EventItem, today = new Date()): boolean {
  if (!event.on) return false
  const local = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`
  return event.on >= local
}

export const events: EventItem[] = [
  {
    title: 'CAD Escape Room',
    date: 'September 22, 2026',
    description:
      'A mini-event: gather a team, work the clues and see if you can crack the code before the clock runs out. 5:30 to 8:00 PM on Tuesday, September 22 — location TBA. Registration is required and closes September 20 at 11:59 PM.',
    photo: cadEscapeRoom,
    contain: true,
    // The Linktree from the Instagram bio, with Instagram's utm_* and fbclid
    // tracking cut — those describe a click that came from Instagram, and this
    // one did not.
    register: 'https://linktr.ee/mdlmcmaster',
    on: '2026-09-22',
  },
  {
    title: 'MDL @ Club Fest',
    date: 'September 14, 2026',
    description:
      'Find us on the JHE field at table #9, 4:30 to 7:30 PM. Come say hello, ask about the workshops and the Designathon, and find out how to get on a subteam.',
    photo: clubfest,
    contain: true,
    on: '2026-09-14',
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
