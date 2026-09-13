import charcShawarma from '../assets/sponsors/charc-shawarma.webp'
import goengineer from '../assets/sponsors/goengineer.webp'
import jenga from '../assets/sponsors/jenga.webp'
import meritech from '../assets/sponsors/meritech.webp'
import printandplay from '../assets/sponsors/printandplay.webp'
import solidworks from '../assets/sponsors/solidworks.webp'

/**
 * Tiers, highest first. The order of this array IS the order the wall renders
 * in and the size ladder it draws, so moving a tier here moves it on the page.
 *
 * Platinum sits above Diamond, which is MDL's own ranking rather than the
 * commoner one — worth leaving alone unless someone says otherwise.
 */
export const TIERS = ['platinum', 'diamond', 'gold', 'silver', 'bronze'] as const

export type Tier = (typeof TIERS)[number]

export type Sponsor = {
  name: string
  logo: string
  tier: Tier
  /**
   * Set when the logo is drawn for a dark background — white or near-white ink
   * on transparency, which disappears on the wall's white plates. That tile
   * gets an inked plate instead. Ask for a dark-ink version before reaching for
   * this; it is a workaround for the asset we were given, not a style.
   */
  onDark?: boolean
}

/**
 * The 2026-2027 sponsors.
 *
 * One array, not two. There used to be a second `homeSponsors` export because
 * Designathon.tsx rendered `sponsors` and could not be touched; that page no
 * longer imports this file at all, so the split had nothing left to protect —
 * and the old comment named exactly this moment as the time to collapse it.
 *
 * Grouping is done at render time off `tier`, so adding a sponsor is one entry
 * here and nothing else.
 */
export const sponsors: Sponsor[] = [
  { name: 'GoEngineer', logo: goengineer, tier: 'platinum' },
  { name: 'Print and Play', logo: printandplay, tier: 'diamond' },
  { name: 'SolidWorks', logo: solidworks, tier: 'gold' },
  { name: 'Meritech Engineering', logo: meritech, tier: 'silver' },
  // Wordmark under the flame is white, invisible on a white plate.
  { name: 'Charc Shawarma', logo: charcShawarma, tier: 'silver', onDark: true },
  { name: 'JENGA', logo: jenga, tier: 'bronze' },
]
