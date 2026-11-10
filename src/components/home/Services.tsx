import { Link } from '@tanstack/react-router'

import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages'

const rows = [
  { title: () => m.service_passport_title(), desc: () => m.service_passport_desc() },
  { title: () => m.service_card_title(), desc: () => m.service_card_desc() },
  { title: () => m.service_legalization_title(), desc: () => m.service_legalization_desc() },
  { title: () => m.service_civil_title(), desc: () => m.service_civil_desc() },
  { title: () => m.service_attest_title(), desc: () => m.service_attest_desc() },
  { title: () => m.service_travel_title(), desc: () => m.service_travel_desc() },
]

export default function Services() {
  return (
    <section className="wrap py-28 md:py-36">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <p className="kicker text-clay">{m.services_kicker()}</p>
          </Reveal>
          <h2 className="mt-4 text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.05]">
            <SplitWords text={m.services_title()} />
          </h2>
          <Reveal delay={0.2}>
            <Link to="/services" className="link-draw mt-8 inline-block text-[0.95rem] font-semibold">
              {m.services_all()} →
            </Link>
          </Reveal>
        </div>

        <ul className="border-t border-ink/25">
          {rows.map((r, i) => (
            <li key={r.title()} className="border-b border-ink/25">
              <Reveal delay={i * 0.04} y={18}>
                <Link
                  to="/services"
                  className="service-row group grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-4 px-2 py-6 md:grid-cols-[3rem_1fr_1.2fr_auto] md:px-5 md:py-8"
                >
                  <span className="text-[0.8rem] font-semibold tabular-nums opacity-50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight">{r.title()}</span>
                  <span className="col-start-2 mt-1 text-[0.92rem] opacity-70 md:col-start-auto md:mt-0">{r.desc()}</span>
                  <span className="row-start-1 col-start-3 text-2xl transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-rotate-45 md:row-start-auto md:col-start-auto">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
