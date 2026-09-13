import BackToTop from '../components/BackToTop'
import LeadStack from '../components/LeadStack'
import PageShell from '../components/PageShell'
import { leads, members } from '../data/teamData'

export default function Team() {
  // Group the general members by subteam so the list has some structure.
  const grouped = members.reduce<Record<string, string[]>>((acc, m) => {
    if (!acc[m.subteam]) acc[m.subteam] = []
    acc[m.subteam].push(m.name)
    return acc
  }, {})

  return (
    <PageShell
      eyebrow="2026-2027 season"
      title="The MDL Executive Team"
      /* Counted off the data rather than written down, so the masthead cannot
         go stale the next time someone joins or leaves. The member count is the
         whole league, leads included — `members` is only everyone who is not a
         lead, which would read as though the club were 38 people. */
      meta={`${leads.length} leads · ${leads.length + members.length} members`}
      intro="The leads who plan the Designathon, teach the workshops, and chase the sponsors that pay for it — and the members on every subteam behind them."
    >
      <LeadStack leads={leads} />

      {/* The reduce above always grouped by subteam; the old markup then threw the
          grouping away and printed one flat "name (subteam)" line per member. */}
      <div className="mt-[clamp(48px,5vw,80px)] grid grid-cols-1 gap-[clamp(28px,3vw,44px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {Object.entries(grouped).map(([subteam, names]) => (
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

      <BackToTop />
    </PageShell>
  )
}
