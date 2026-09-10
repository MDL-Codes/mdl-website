import { useState } from 'react'
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
 * behaves the same on a phone, a half-width window and a full laptop.
 * Backgrounds are opaque so the cards read as solid layers when they stack.
 */
export default function LeadCard({ lead }: Props) {
  // Flips to false if the photo file is missing, so a lead with no headshot
  // yet falls back to initials instead of showing a broken image.
  const [photoOk, setPhotoOk] = useState(Boolean(lead.photo))

  return (
    <article
      style={{ backgroundColor: lead.bg }}
      className="
        rounded-2xl md:rounded-3xl border border-white/15
        shadow-[0_18px_50px_-12px_rgba(0,0,0,0.55)]
        overflow-hidden
      "
    >
      {/* Subteam label */}
      <header className="flex items-center gap-4 px-5 sm:px-8 md:px-10 pt-5 md:pt-7 pb-4 md:pb-5">
        <span className="font-bold uppercase text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.28em] text-white/85">
          {lead.subteam}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
      </header>

      <div className="px-5 sm:px-8 md:px-10 pb-6 md:pb-9">
        {/* Avatar + name + role */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <div
            className="
              shrink-0 overflow-hidden rounded-xl md:rounded-2xl border border-white/20
              w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44
            "
          >
            {photoOk && lead.photo ? (
              <img
                src={lead.photo}
                alt={lead.name}
                loading="lazy"
                onError={() => setPhotoOk(false)}
                className="w-full h-full object-cover object-[center_18%]"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex w-full h-full items-center justify-center bg-white/10"
              >
                <span className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white/40">
                  {initials(lead.name)}
                </span>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 flex flex-col items-start gap-2 sm:gap-3">
            <h3 className="font-bold uppercase leading-[1.05] text-xl sm:text-2xl md:text-3xl lg:text-4xl break-words">
              {lead.name}
            </h3>

            <span className="rounded-pill border border-white/30 bg-white/10 px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs uppercase tracking-widest">
              {lead.role}
            </span>
          </div>
        </div>

        <p className="mt-5 md:mt-7 text-sm sm:text-base leading-relaxed text-white/85 max-w-[68ch]">
          {lead.blurb}
        </p>
      </div>
    </article>
  )
}
