import BackToTop from '../components/BackToTop'
import MemberTicker from '../components/MemberTicker'
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
      title="MDL Executive Team"
      /* Counted off the data rather than written down, so the masthead cannot
         go stale the next time someone joins or leaves. The member count is the
         whole of MDL, leads included — `members` is only everyone who is not a
         lead, which would read as though the club were 38 people. */
      meta={`${leads.length} leads · ${leads.length + members.length} members`}
      intro="The leads who plan the Designathon, teach the workshops, and chase the sponsors that pay for it — and the members on every subteam behind them."
    >
      <LeadStack leads={leads} />

      {/* One ticker row per subteam. The reduce above already groups them; the
          old markup printed those groups as a static three-column list, which
          was the only part of this page that did not move. */}
      <div className="mt-[clamp(48px,5vw,80px)] flex flex-col">
        {Object.entries(grouped).map(([subteam, names], i) => (
          <MemberTicker key={subteam} subteam={subteam} names={names} reverse={i % 2 === 1} />
        ))}
      </div>

      <BackToTop />
    </PageShell>
  )
}
