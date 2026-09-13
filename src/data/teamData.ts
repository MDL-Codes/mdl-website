/**
 * MDL 2026 roster.
 *
 * Lead names and subteams come from the Notion "Team Leads" table.
 * General members come from MDL Internal Teamspace > Databases > People.
 * Subteam descriptions started from the Instagram subteam posts.
 *
 * Anything marked TODO still needs confirming before this goes live.
 */

import photoTolu from '../assets/team/tolu-agunbiade.webp'
import photoAndy from '../assets/team/andy-duong.webp'
import photoKai from '../assets/team/kai-qin.webp'
import photoRegan from '../assets/team/regan-oconnor.webp'
import photoBen from '../assets/team/ben-malkovich.webp'
import photoNila from '../assets/team/nila-natkunendiraan.webp'
import photoAlina from '../assets/team/alina-zeng.webp'
import photoGokul from '../assets/team/gokul-radheepan.webp'
import photoOliver from '../assets/team/oliver-nell.webp'
import photoJessica from '../assets/team/jessica-wang.webp'
import photoYvonne from '../assets/team/yvonne-xu.webp'
import photoAvril from '../assets/team/avril-wang.webp'
import photoNoor from '../assets/team/noor-sidhu.webp'
import photoMinaya from '../assets/team/minaya-karunarathne.webp'
import photoMaia from '../assets/team/maia-antolic.webp'
import photoMichelle from '../assets/team/michelle-nishidera.webp'

export type Lead = {
  /** Subteam label shown across the top of the card. */
  subteam: string
  name: string
  role: string
  /** What this lead's subteam does — see SUBTEAM_BLURBS; not per person. */
  blurb: string
  /** Optional headshot. Leave it out and the card shows initials instead. */
  photo?: string
  /** Card background — a shade from the navy ramp below. */
  bg: string
}

export type Member = {
  name: string
  subteam: string
}

/**
 * Monochromatic navy ramp, derived from the site's base navy (#2B3455).
 * Cards cycle through it so no two neighbours share a shade.
 * All of these pass AA contrast with white text.
 */
export const CARD_SHADES = {
  ink: '#191F38',
  slate: '#39426E',
  deep: '#212949',
  periwinkle: '#47528A',
  base: '#2B3455',
  lift: '#525DA0',
} as const

/** The order shades are handed out, so neighbouring cards always differ. */
const RAMP = [
  CARD_SHADES.ink,
  CARD_SHADES.slate,
  CARD_SHADES.deep,
  CARD_SHADES.periwinkle,
  CARD_SHADES.base,
  CARD_SHADES.lift,
]

/**
 * The leads, in the order they appear on the page: presidents first, then
 * internal management, then the subteams alphabetically. Co-leads of the same
 * subteam sit next to each other.
 *
 * Names, and the subteam each person belongs to, come from the Teams column of
 * the Notion "Team Leads" table (21 rows). Presidents and internal managers
 * carry no team there, so those two groupings are ours.
 *
 * `bg` is filled in automatically below, so adding or reordering someone
 * here never leaves two identical shades touching.
 */
/**
 * What each subteam does, in its own words rather than a list of duties.
 *
 * One entry per subteam, not per person: these describe the team, so co-leads
 * used to carry the same paragraph twice and you read it twice in a row on the
 * way down the stack. `leads` below hands each lead the entry for their team.
 */
const SUBTEAM_BLURBS: Record<string, string> = {
  'MDL President':
    'The presidents are the ones running the show. This year they are taking MDL to new levels on three fronts: application-focused learning, helping engineering students learn by actually building projects; community design, making MDL the central hub of design at McMaster; and team infrastructure, opening up communication channels so every subteam gets a say.',
  'Internal Management':
    'Internal Management is the team that looks after everyone else — running socials through the year and checking in with members across every subteam.',
  'CAD Technical':
    'CAD Technical is the team that teaches people to model. They run the workshops and write the learning materials, set the Designathon problem statements and technical requirements, and keep the 3D printers going through the event.',
  'Creative Manager':
    'The Creative Manager holds the visual direction of MDL together, from brand and campaign concepts through to the look and feel of every event.',
  'Finance':
    'Finance is the team that pays for it all. They manage the MDL budget, track what each subteam spends across the season, and handle the reimbursements and funding applications that get events paid for on time.',
  'Graphics':
    'Graphics is the team that brings ideas to life — drawing and designing the posters, banners and digital assets behind every campaign, plus the sponsorship packages and the merch, shirts and stickers included.',
  'Marketing':
    'Marketing is the team that gets the word out. They run the campaigns that bring students in, answer whatever lands in the inbox and the DMs, and brainstorm and film the reels.',
  'Media':
    'Media is the team behind the camera. They shoot and edit the photo and video from every workshop and Designathon, and cut the recaps that show people what they missed.',
  'Operations':
    'Operations is the team that runs the day. They plan the logistics and coordinate everything on site, keeping the whole event moving from doors open to final judging.',
  'Software':
    'Software is the team that builds the tools. They maintain CADie, MDL’s Discord bot, in Python, this website in React and Tailwind on Vercel, and everything else MDL runs on.',
  'Sponsorship':
    'Sponsorship is the team that brings the money in. They connect with companies and secure the sponsors behind Designathon, build the package that goes out to employers, and organise the booths for the sponsorship fair and mini-industry night.',
}

const roster: Omit<Lead, 'bg' | 'blurb'>[] = [
  // ------------------------------------------------------------ president ---
  {
    subteam: 'MDL President',
    name: 'Tolu Agunbiade',
    photo: photoTolu,
    role: 'Co-President',
  },
  {
    subteam: 'MDL President',
    name: 'Andy Duong',
    photo: photoAndy,
    role: 'Co-President',
  },

  // ------------------------------------------------- internal management ---
  {
    subteam: 'Internal Management',
    name: 'Kai Qin',
    photo: photoKai,
    role: 'Internal Manager',
  },
  {
    subteam: 'Internal Management',
    name: "Regan O'Connor",
    photo: photoRegan,
    role: 'Internal Manager',
  },
  {
    subteam: 'Internal Management',
    name: 'Saloni Patel',
    role: 'Internal Manager',
  },

  // ------------------------------------------------------- cad technical ---
  {
    subteam: 'CAD Technical',
    name: 'Ben Malkovich',
    photo: photoBen,
    role: 'CAD Technical Lead',
  },
  {
    subteam: 'CAD Technical',
    name: 'Nila Natkunendiraan',
    photo: photoNila,
    role: 'CAD Technical Lead',
  },

  // ------------------------------------------------------ creative ---
  {
    subteam: 'Creative Manager',
    name: 'Alina Zeng',
    photo: photoAlina,
    role: 'Creative Manager',
  },

  // ------------------------------------------------------------- finance ---
  {
    subteam: 'Finance',
    name: 'Gokul Radheepan',
    photo: photoGokul,
    role: 'Finance Lead',
  },
  {
    subteam: 'Finance',
    name: 'Oliver Nell',
    photo: photoOliver,
    role: 'Finance Lead',
  },

  // ------------------------------------------------------------ graphics ---
  {
    subteam: 'Graphics',
    name: 'Jessica Wang',
    photo: photoJessica,
    role: 'Graphics Lead',
  },
  {
    subteam: 'Graphics',
    name: 'Yvonne Xu',
    photo: photoYvonne,
    role: 'Graphics Lead',
  },

  // ----------------------------------------------------------- marketing ---
  {
    subteam: 'Marketing',
    name: 'Avril Wang',
    photo: photoAvril,
    role: 'Marketing Lead',
  },
  {
    subteam: 'Marketing',
    name: 'Noor Sidhu',
    photo: photoNoor,
    role: 'Marketing Lead',
  },

  // --------------------------------------------------------------- media ---
  {
    subteam: 'Media',
    name: 'Minaya Karunarathne',
    photo: photoMinaya,
    role: 'Media Lead',
  },
  {
    subteam: 'Media',
    name: 'Ronit Patel',
    role: 'Media Lead',
  },

  // ---------------------------------------------------------- operations ---
  {
    subteam: 'Operations',
    name: 'Leanne Yu',
    role: 'Operations Lead',
  },
  {
    subteam: 'Operations',
    name: 'Maia Antolic',
    photo: photoMaia,
    role: 'Operations Lead',
  },

  // ------------------------------------------------------------ software ---
  {
    subteam: 'Software',
    name: 'Kylie Gun',
    role: 'Software Lead',
  },

  // --------------------------------------------------------- sponsorship ---
  {
    subteam: 'Sponsorship',
    name: 'Aarudra Ramanan',
    role: 'Sponsorship Lead',
  },
  {
    subteam: 'Sponsorship',
    name: 'Michelle Nishidera',
    photo: photoMichelle,
    role: 'Sponsorship Lead',
  },
]

export const leads: Lead[] = roster.map((lead, i) => ({
  ...lead,
  bg: RAMP[i % RAMP.length],
  blurb: SUBTEAM_BLURBS[lead.subteam] ?? '',
}))

/**
 * General members, from the Notion People table minus the leads above.
 * Names are First Name + Last Name; the subteam is the Teams column, which is
 * not the Program column — several people study Management or Software and
 * sit on a different subteam entirely.
 */
export const members: Member[] = [
  { name: 'Aliya Sourivong', subteam: 'CAD Technical' },
  { name: 'Ava Walker', subteam: 'CAD Technical' },
  // Notion's First Name cell reads "Bhagat"; the Person title reads "Meet
  // Bhagat", which is what we use. Worth fixing at the source.
  { name: 'Meet Bhagat', subteam: 'CAD Technical' },
  { name: 'Hasib Tabassum', subteam: 'CAD Technical' },
  { name: 'Julia Di Liso', subteam: 'CAD Technical' },
  { name: 'Owen Loh', subteam: 'CAD Technical' },
  { name: 'Prem Nayak', subteam: 'CAD Technical' },
  { name: 'William Cheung', subteam: 'CAD Technical' },
  { name: 'Zach McKay', subteam: 'CAD Technical' },

  { name: 'Attiya Zaheer', subteam: 'Graphics' },
  { name: 'Elizabeth Wu', subteam: 'Graphics' },
  { name: 'Natalie Postolache', subteam: 'Graphics' },
  { name: 'Suyoung Eun', subteam: 'Graphics' },
  { name: 'Titus Tan', subteam: 'Graphics' },
  { name: 'Winnie Wei', subteam: 'Graphics' },

  { name: 'Alicia Chen', subteam: 'Marketing' },
  { name: 'Fei Zhu', subteam: 'Marketing' },
  { name: 'Stephanie Li', subteam: 'Marketing' },
  { name: 'Victoria Lalonde', subteam: 'Marketing' },

  { name: 'Bella Tang', subteam: 'Media' },
  { name: 'Cat-Phuong Nguyen', subteam: 'Media' },
  { name: 'Claresta Cheung', subteam: 'Media' },
  { name: 'Hanwen Cao', subteam: 'Media' },

  { name: 'Aadvika Mukherjee', subteam: 'Operations' },
  { name: 'Chloe Tai', subteam: 'Operations' },
  { name: 'Daniel Chung', subteam: 'Operations' },
  { name: 'Eva Wu', subteam: 'Operations' },
  { name: 'Krisha Patel', subteam: 'Operations' },
  { name: 'Noah Cardoso', subteam: 'Operations' },
  { name: 'Ravneet Sandhu', subteam: 'Operations' },
  { name: 'Wendy Zheng', subteam: 'Operations' },

  { name: 'Nabiha Sartaj', subteam: 'Software' },
  { name: 'Sanika Surose', subteam: 'Software' },
  { name: 'Taniya Jeevanayagam', subteam: 'Software' },

  { name: 'Emily Robillard', subteam: 'Sponsorship' },
  { name: 'Kisha Rawal', subteam: 'Sponsorship' },
  { name: 'Reema Poonawalla', subteam: 'Sponsorship' },
  { name: 'Tristan Chan', subteam: 'Sponsorship' },
]

/** "Avril Wang" -> "AW". Used on cards with no headshot yet. */
export function initials(name: string): string {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
