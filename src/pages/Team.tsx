import { leads, members } from '../data/teamData'
import PageShell from '../components/PageShell'

export default function Team() {
  // group members by subteam for cleaner display
  const groupedMembers = members.reduce<Record<string, string[]>>((acc, m) => {
    if (!acc[m.subteam]) acc[m.subteam] = []
    acc[m.subteam].push(m.name)
    return acc
  }, {})

  return (
    <PageShell
      title="Our Team"
      intro="The students who run the league — leads, and the subteams behind every event."
    >
      {/* 1 -> 2 -> 3 up on the shared 640/1024 steps rather than sm:/lg:. */}
      <div className="grid grid-cols-1 gap-[clamp(20px,2.5vw,32px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {leads.map(lead => (
          <article key={lead.name} className="flex flex-col">
            <img
              src={lead.photo}
              alt={lead.name}
              loading="lazy"
              className="aspect-square w-full border border-navy-600 object-cover object-[center_15%]"
            />
            <p className="mt-[14px] font-plex text-[14px] font-semibold uppercase leading-none tracking-[1.54px] text-white">
              {lead.name}
            </p>
            <p className="mt-[7px] font-plex text-[11px] uppercase leading-none tracking-[1.54px] text-navy-200">
              {lead.role}
            </p>
            <p className="mt-[10px] font-plex text-[13px] leading-[1.7] text-navy-200">{lead.quote}</p>
          </article>
        ))}
      </div>

      {/* The reduce above always grouped by subteam; the old markup then threw the
          grouping away and printed one flat "name (subteam)" line per member. */}
      <div className="mt-[clamp(48px,5vw,80px)] grid grid-cols-1 gap-[clamp(28px,3vw,44px)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3">
        {Object.entries(groupedMembers).map(([subteam, names]) => (
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
    </PageShell>
  )
}
