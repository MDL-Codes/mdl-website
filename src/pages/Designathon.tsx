import { faqs } from '../data/faqData'
import { sponsors } from '../data/sponsorsData'
import designathonHero from '../assets/designathon-tab-main-image.png'

export default function Designathon() {
  return (
    <section className="flex flex-col gap-12">
      {/* Hero announcement */}
      <div className="border border-border rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
        <p className="italic font-bold text-sm sm:text-base md:text-lg leading-relaxed">
          Sit tight, 2027 Designathon applications are coming soon. Follow our
          Instagram <span className="not-italic">@mdlmcmaster</span> to be the first to know!
        </p>
      </div>

      <img
        src={designathonHero}
        alt="MDL CAD Designathon"
        loading="lazy"
        className="w-full max-w-5xl rounded-lg border border-border/60 object-cover"
      />

      {/* About section */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-4">
          The MDL CAD Designathon
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-white/90">
          ...is a weekend-long competition where you tackle a selection of design problems using
          computer-aided design (CAD) and 3D printing tools. You generate solutions, build prototypes,
          and present to judges — all in 36 hours. You will also have the chance to grow your portfolio,
          network with industry partners, and meet other passionate students from across Ontario.
        </p>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-6">
          Frequently Asked Questions
        </h2>
        <ul className="flex flex-col gap-5">
          {faqs.map((faq) => (
            <li key={faq.question}>
              <p className="font-bold uppercase text-sm sm:text-base mb-1">{faq.question}</p>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Sponsors */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase mb-6">Sponsors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="bg-white/5 border border-border/60 rounded-lg aspect-[3/2] flex items-center justify-center overflow-hidden"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain p-3 opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
