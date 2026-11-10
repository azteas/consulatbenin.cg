import { sites, text } from '#/data/sites'
import { m } from '#/paraglide/messages'

export default function Marquee() {
  const names = sites.map((s) => text(s.name))
  const row = (
    <ul className="marquee-track" aria-hidden="true">
      {[0, 1].map((k) => (
        <li key={k} className="flex shrink-0 items-center">
          {names.map((n) => (
            <span key={n} className="flex items-center whitespace-nowrap font-display text-[clamp(1.6rem,3.2vw,2.6rem)]">
              {n}
              <span className="mx-8 inline-block size-2 rotate-45 bg-sun" />
            </span>
          ))}
        </li>
      ))}
    </ul>
  )
  return (
    <section className="marquee overflow-hidden bg-forest py-7 text-paper" aria-label={m.marquee_label()}>
      {row}
    </section>
  )
}
