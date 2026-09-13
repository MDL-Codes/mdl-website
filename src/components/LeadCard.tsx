import { memo, useState } from 'react'
import type { Lead } from '../data/teamData'
import { initials } from '../data/teamData'

type Props = {
  lead: Lead
}

/**
 * A single lead card: subteam label across the top, then a headshot beside
 * the name and role, with the blurb underneath.
 *
 * One layout at every width — the avatar and type just scale — so the card
 * behaves the same on a phone, a half-width window and a full laptop. Sizes are
 * fluid clamp()s rather than stepped breakpoints, per CLAUDE.md, which is also
 * why this file no longer carries sm:/md:/lg: variants: it and LeadStack were
 * the only two in src/ using them.
 *
 * Square, on the palette, and headings in font-display — the card was drawn
 * before it met the rest of the site, and was the only thing here with rounded
 * corners, white-opacity washes, or a mono name.
 *
 * Backgrounds are opaque so the cards read as solid layers when they stack.
 */
function LeadCard({ lead }: Props) {
  // Flips to false if the photo file is missing, so a lead with no headshot
  // yet falls back to initials instead of showing a broken image.
  const [photoOk, setPhotoOk] = useState(Boolean(lead.photo))

  return (
    <article
      style={{ backgroundColor: lead.bg }}
      className="border border-navy-400 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)]"
    >
      {/* Subteam label */}
      <header className="flex items-center gap-[16px] px-[clamp(20px,2.8vw,40px)] pb-[clamp(16px,1.4vw,20px)] pt-[clamp(20px,1.9vw,28px)]">
        <span className="font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-navy-200">
          {lead.subteam}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-navy-400/50" />
      </header>

      <div className="px-[clamp(20px,2.8vw,40px)] pb-[clamp(24px,2.5vw,36px)]">
        {/* Avatar + name + role */}
        <div className="flex items-center gap-[clamp(16px,2.2vw,32px)]">
          <div className="h-[clamp(80px,12.2vw,176px)] w-[clamp(80px,12.2vw,176px)] shrink-0 overflow-hidden border border-navy-400">
            {photoOk && lead.photo ? (
              <img
                src={lead.photo}
                alt={lead.name}
                loading="lazy"
                decoding="async"
                onError={() => setPhotoOk(false)}
                className="h-full w-full object-cover object-[center_18%]"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center bg-navy-950/40"
              >
                <span className="font-display text-[clamp(20px,2.8vw,40px)] font-bold text-navy-400">
                  {initials(lead.name)}
                </span>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-start gap-[clamp(8px,0.9vw,13px)]">
            <h3 className="break-words font-display text-[clamp(20px,2.6vw,36px)] font-bold uppercase leading-[1.05] text-white">
              {lead.name}
            </h3>

            {/* Border and ink, no fill — the same outlined-chip idiom Events
                uses for its flagship label, which reads on every shade in the
                ramp without needing a per-card fill. */}
            <span className="border border-navy-400 px-[12px] py-[5px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-200">
              {lead.role}
            </span>
          </div>
        </div>

        {lead.blurb && (
          <p className="mt-[clamp(20px,2vw,28px)] max-w-[68ch] font-plex text-[clamp(13px,1vw,14px)] leading-[1.75] text-navy-200">
            {lead.blurb}
          </p>
        )}
      </div>
    </article>
  )
}

/**
 * Memoised: the stack re-renders whenever the pinned subteam changes, and
 * without this that re-renders all 21 cards. `lead` objects come straight off
 * the module-level roster, so the identity check always holds.
 */
export default memo(LeadCard)
