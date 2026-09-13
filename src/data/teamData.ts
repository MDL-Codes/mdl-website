/**
 * MDL 2026 roster.
 *
 * Lead names and subteams come from the Notion "Team Leads" table.
 * General members come from MDL Internal Teamspace > Databases > People.
 * Subteam descriptions are transcribed from the Instagram subteam posts.
 *
 * Anything marked TODO still needs confirming before this goes live.
 */

export type Lead = {
  /** Subteam label shown across the top of the card. */
  subteam: string
  name: string
  role: string
  /** One or two sentences on what this person actually does. */
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
const roster: Omit<Lead, 'bg'>[] = [
  // ----------------------------------------------------------- executive ---
  {
    subteam: 'Executive',
    name: 'Tolu Agunbiade',
    role: 'President',
    blurb: 'TODO: blurb',
  },
  {
    subteam: 'Executive',
    name: 'Andy Duong',
    role: 'President',
    blurb: 'TODO: blurb',
  },

  // ------------------------------------------------- internal management ---
  {
    subteam: 'Internal Management',
    name: 'Kai Qin',
    role: 'Internal Manager',
    blurb: 'TODO: blurb',
  },
  {
    subteam: 'Internal Management',
    name: "Regan O'Connor",
    role: 'Internal Manager',
    blurb: 'TODO: blurb',
  },
  {
    subteam: 'Internal Management',
    name: 'Saloni Patel',
    role: 'Internal Manager',
    blurb: 'TODO: blurb',
  },

  // ------------------------------------------------------- cad technical ---
  {
    subteam: 'CAD Technical',
    name: 'Ben Malkovich',
    role: 'CAD Technical Lead',
    blurb:
      'Develop and deliver CAD workshops for participants. Create supplementary learning materials, including sample models/references. Lead the development of Designathon problem statements and technical requirements. Support and manage 3D printing operations during events.',
  },
  {
    subteam: 'CAD Technical',
    name: 'Nila Natkunendiraan',
    role: 'CAD Technical Lead',
    blurb:
      'Develop and deliver CAD workshops for participants. Create supplementary learning materials, including sample models/references. Lead the development of Designathon problem statements and technical requirements. Support and manage 3D printing operations during events.',
  },

  // ------------------------------------------------------ creative ---
  {
    subteam: 'Creative Manager',
    name: 'Alina Zeng',
    role: 'Creative Manager',
    blurb:
      'Holds the visual direction of the league together, from brand and campaign concepts through to the look and feel of every event.',
  },

  // ------------------------------------------------------------- finance ---
  {
    subteam: 'Finance',
    name: 'Gokul Radheepan',
    role: 'Finance Lead',
    blurb:
      'Manages the league budget and tracks what each subteam spends across the season.',
  },
  {
    subteam: 'Finance',
    name: 'Oliver Nell',
    role: 'Finance Lead',
    blurb:
      'Handles reimbursements and funding applications so events get paid for on time.',
  },

  // ------------------------------------------------------------ graphics ---
  {
    subteam: 'Graphics',
    name: 'Jessica Wang',
    role: 'Graphics Lead',
    blurb:
      'Design marketing and promotional materials, including posters, banners, and digital assets. Drive creation of event graphics such as sponsorship packages and merchandise (shirts, stickers, etc.)! Conceptualize and produce visuals aligned with campaign and event needs.',
  },
  {
    subteam: 'Graphics',
    name: 'Yvonne Xu',
    role: 'Graphics Lead',
    blurb:
      'Design marketing and promotional materials, including posters, banners, and digital assets. Drive creation of event graphics such as sponsorship packages and merchandise (shirts, stickers, etc.)! Conceptualize and produce visuals aligned with campaign and event needs.',
  },

  // ----------------------------------------------------------- marketing ---
  {
    subteam: 'Marketing',
    name: 'Avril Wang',
    role: 'Marketing Lead',
    blurb:
      'Develop and execute marketing campaigns to increase brand awareness and student engagement. Respond to inquiries and manage community communications across platforms. Brainstorm and film fun new reels!',
  },
  {
    subteam: 'Marketing',
    name: 'Noor Sidhu',
    role: 'Marketing Lead',
    blurb:
      'Develop and execute marketing campaigns to increase brand awareness and student engagement. Respond to inquiries and manage community communications across platforms. Brainstorm and film fun new reels!',
  },

  // --------------------------------------------------------------- media ---
  {
    subteam: 'Media',
    name: 'Minaya Karunarathne',
    role: 'Media Lead',
    blurb:
      'Capture and produce photo and video content through videography, photography, and editing. Create recap videos for workshops and designathons. Edit and refine visual content for work and storytelling purposes.',
  },
  {
    subteam: 'Media',
    name: 'Ronit Patel',
    role: 'Media Lead',
    blurb:
      'Capture and produce photo and video content through videography, photography, and editing. Create recap videos for workshops and designathons. Edit and refine visual content for work and storytelling purposes.',
  },

  // ---------------------------------------------------------- operations ---
  {
    subteam: 'Operations',
    name: 'Leanne Yu',
    role: 'Operations Lead',
    blurb:
      'Own event logistics by planning and coordinating day-of execution. Create and manage event forms such as sign-in, sign-up, and judging materials. Collect, structure, and manage participant and team information to ensure successful event flow.',
  },
  {
    subteam: 'Operations',
    name: 'Maia Antolic',
    role: 'Operations Lead',
    blurb:
      'Own event logistics by planning and coordinating day-of execution. Create and manage event forms such as sign-in, sign-up, and judging materials. Collect, structure, and manage participant and team information to ensure successful event flow.',
  },

  // ------------------------------------------------------------ software ---
  {
    subteam: 'Software',
    name: 'Kylie Gun',
    role: 'Software Lead',
    blurb:
      'Develop and maintain CADie on Discord using Python. Improve and maintain the MDL website using React, JavaScript, Tailwind, and Vercel. Support and troubleshoot software-related tools and systems used by the team.',
  },

  // --------------------------------------------------------- sponsorship ---
  {
    subteam: 'Sponsorship',
    name: 'Aarudra Ramanan',
    role: 'Sponsorship Lead',
    blurb:
      'Responsible for connecting with companies and securing sponsors to help fund and elevate the experience of Designathon, build the sponsorship package for potential employers, provide sponsors with necessary information and resources they need on the day of Designathon, and organize booths for the sponsorship fair and mini-industry night during Designathon.',
  },
  {
    subteam: 'Sponsorship',
    name: 'Michelle Nishidera',
    role: 'Sponsorship Lead',
    blurb:
      'Responsible for connecting with companies and securing sponsors to help fund and elevate the experience of Designathon, build the sponsorship package for potential employers, provide sponsors with necessary information and resources they need on the day of Designathon, and organize booths for the sponsorship fair and mini-industry night during Designathon.',
  },
]

export const leads: Lead[] = roster.map((lead, i) => ({
  ...lead,
  bg: RAMP[i % RAMP.length],
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
  { name: 'Owen', subteam: 'CAD Technical' }, // TODO: no last name in Notion
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
