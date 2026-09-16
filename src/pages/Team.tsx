import { useMemo } from 'react'
import LeadStack from '../components/LeadStack'
import PageShell from '../components/PageShell'
import { leads, members } from '../data/teamData'

export default function Team() {
  // Memoised rather than rebuilt every render: these arrays are handed down to
  // LeadCard, which is memoised, and a fresh array each time would defeat it.
  const grouped = useMemo(
    () =>
      members.reduce<Record<string, string[]>>((acc, m) => {
        if (!acc[m.subteam]) acc[m.subteam] = []
        acc[m.subteam].push(m.name)
        return acc
      }, {}),
    []
  )

  // Members whose subteam has no lead would otherwise never render, since the
  // tickers hang off lead cards. Nobody is in that state today; this is here so
  // adding someone to a lead-less subteam cannot silently drop them.
  const orphaned = useMemo(
    () => Object.entries(grouped).filter(([subteam]) => !leads.some(l => l.subteam === subteam)),
    [grouped]
  )

  return (
    <PageShell
      eyebrow="2026-2027 season"
      title="MDL Executive Team"
      /* Counted off the data rather than written down, so the masthead cannot
         go stale the next time someone joins or leaves. The member count is the
         whole of MDL, leads included — `members` is only everyone who is not a
         lead, which would read as though the club were 36 people. */
      meta={`${leads.length} leads · ${leads.length + members.length} members`}
      intro="The leads who plan the Designathon, teach the workshops, and chase the sponsors that pay for it — and the members on every subteam behind them."
    >
      {/* General members ride the foot of their own subteam's last lead card.
          They used to be a block under the whole stack, which put every
          subteam's people a long way from the cards they belong to. */}
      <LeadStack leads={leads} members={grouped} />

      {orphaned.length > 0 && (
        <div className="mt-[clamp(48px,5vw,80px)] grid grid-cols-1 gap-[clamp(28px,3vw,44px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
          {orphaned.map(([subteam, names]) => (
            <section key={subteam}>
              <h2 className="border-b border-navy-600 pb-[10px] font-plex text-[11px] font-semibold uppercase leading-none tracking-[1.54px] text-white">
                {subteam}
              </h2>
              <ul className="mt-[14px] flex flex-col gap-[6px]">
                {names.map(name => (
                  <li key={name} className="font-plex text-[13px] leading-[1.7] text-navy-200">
                    {name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  )
}
