import filler from '../assets/filler.webp'

export type Tier = 'gold' | 'silver' | 'bronze'

export type Sponsor = {
  name: string
  logo: string
  tier?: Tier
}

export const sponsors: Sponsor[] = [
  { name: 'McMaster University', logo: filler },
  { name: 'Sponsor Two', logo: filler },
  { name: 'Sponsor Three', logo: filler },
  { name: 'Sponsor Four', logo: filler },
]

/**
 * The home page's sponsor wall — 1 gold, 2 silver, 4 bronze, all placeholder,
 * matching the seven tiles drawn in Figma 84:317.
 *
 * ponytail: a SECOND export rather than seven entries appended to `sponsors`.
 * `sponsors` is rendered by Designathon.tsx, which is owned by a teammate and
 * must stay byte-identical on this branch (CLAUDE.md) — growing that array from
 * four to seven would silently add three tiles to their page. `tier` is optional
 * on Sponsor so it is additive for that page too.
 *
 * Ceiling: when the real sponsor list lands and both pages want the same seven,
 * collapse these back into one array and give Designathon an explicit filter.
 */
export const homeSponsors: Sponsor[] = [
  { name: 'Sponsor 1', logo: filler, tier: 'gold' },
  { name: 'Sponsor 2', logo: filler, tier: 'silver' },
  { name: 'Sponsor 3', logo: filler, tier: 'silver' },
  { name: 'Sponsor 4', logo: filler, tier: 'bronze' },
  { name: 'Sponsor 5', logo: filler, tier: 'bronze' },
  { name: 'Sponsor 6', logo: filler, tier: 'bronze' },
  { name: 'Sponsor 7', logo: filler, tier: 'bronze' },
]
