import LeadStack from '../components/LeadStack'
import { leads, members } from '../data/teamData'

export default function Team() {
  // Group the general members by subteam so the list has some structure.
  const grouped = members.reduce<Record<string, string[]>>((acc, m) => {
    if (!acc[m.subteam]) acc[m.subteam] = []
    acc[m.subteam].push(m.name)
    return acc
  }, {})

  return (
    <section className="flex flex-col gap-16 md:gap-24">
      {/* Page title */}
      <header className="flex flex-col gap-4">
        <h1 className="font-mono font-bold uppercase leading-[1.05] text-4xl sm:text-5xl md:text-6xl">
          Meet the Leads!
        </h1>
        <p className="max-w-xl text-sm sm:text-base leading-relaxed text-white/85">
          The people who plan the Designathon, teach the workshops, and keep the
          league running. Scroll to work through each subteam.
        </p>
      </header>

      <LeadStack leads={leads} />

      {/* General members */}
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <h2 className="font-bold uppercase text-xs sm:text-sm tracking-[0.28em] text-white/85">
            General Members
          </h2>
          <span aria-hidden="true" className="h-px flex-1 bg-white/20" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([subteam, names]) => (
            <div key={subteam} className="flex flex-col gap-3">
              <span className="rounded-pill border border-white/30 bg-white/10 px-3.5 py-1 text-[11px] uppercase tracking-widest self-start">
                {subteam}
              </span>
              <ul className="flex flex-col gap-1.5 text-sm sm:text-base text-white/85">
                {names.map((name, i) => (
                  <li key={`${subteam}-${name}-${i}`}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
