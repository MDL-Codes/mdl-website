import { leads, members } from '../data/teamData'

export default function Team() {
  // group members by subteam for cleaner display
  const groupedMembers = members.reduce<Record<string, string[]>>((acc, m) => {
    if (!acc[m.subteam]) acc[m.subteam] = []
    acc[m.subteam].push(m.name)
    return acc
  }, {})

  return (
    <section className="flex flex-col gap-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
        {leads.map((lead) => (
          <article key={lead.name} className="flex flex-col">
            <img
              src={lead.photo}
              alt={lead.name}
              loading="lazy"
              className="w-full aspect-square object-cover object-[center_15%] rounded-lg border border-border/60"
            />
            <p className="mt-3 font-bold text-base sm:text-lg">{lead.name}</p>
            <p className="text-sm text-white/85">{lead.role}</p>
            <p className="mt-1 italic text-sm text-white/75">{lead.quote}</p>
          </article>
        ))}
      </div>

      <div className="text-sm sm:text-base leading-relaxed text-white/90 flex flex-col gap-1">
        {Object.entries(groupedMembers).map(([subteam, names]) =>
          names.map((name) => (
            <p key={`${subteam}-${name}`}>
              {name} ({subteam})
            </p>
          ))
        )}
      </div>
    </section>
  )
}
