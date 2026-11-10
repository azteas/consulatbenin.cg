import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { telHref } from '#/data/contact'
import { type Consulate, consulates, directionsFor, portraitFor, txt } from '#/data/network'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/reseau-consulaire')({
  head: () => ({ meta: [{ title: `${m.nav_network()} | ${m.site_name()}` }] }),
  component: NetworkPage,
})

function NetworkPage() {
  return (
    <>
      <section className="wrap pb-14 pt-40 md:pt-48">
        <Reveal>
          <p className="kicker text-clay">{m.network_kicker()}</p>
        </Reveal>
        <h1 className="mt-4 text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.98]">
          <SplitWords immediate text={m.network_title()} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            {m.network_intro()}
          </p>
        </Reveal>
      </section>

      <section className="wrap pb-28">
        {consulates.map((c, i) => (
          <ConsulateCard key={c.key} consulate={c} index={i} />
        ))}
      </section>
    </>
  )
}

function ConsulateCard({ consulate: c, index }: Readonly<{ consulate: Consulate; index: number }>) {
  const hasDetails = Boolean(c.addressLines?.length || c.phones?.length || c.emails?.length)
  const flip = index % 2 === 1

  return (
    <article
      className={`grid gap-10 border-t border-ink/25 py-14 md:gap-16 md:py-20 ${
        flip ? 'md:grid-cols-[1.3fr_0.7fr]' : 'md:grid-cols-[0.7fr_1.3fr]'
      }`}
    >
      <Reveal y={36} className={flip ? 'md:order-2' : ''}>
        <Portrait consulate={c} />
      </Reveal>

      <div className={`flex flex-col justify-center ${flip ? 'md:order-1' : ''}`}>
        <Reveal>
          <p className="kicker flex items-center gap-3 text-clay">
            <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-clay" />
            {m.network_zone()} · {txt(c.zone)}
          </p>
        </Reveal>
        <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05]">
          <SplitWords text={txt(c.name)} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-3 text-[1rem]" style={{ color: 'var(--ink-soft)' }}>
            {c.head ? <strong className="font-semibold text-ink">{c.head} · </strong> : null}
            {txt(c.role)}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {hasDetails ? (
            <ul className="mt-8 border-t border-ink/20">
              {c.addressLines?.length ? (
                <Line icon={<MapPin className="size-[1.15rem]" />}>
                  <address className="not-italic leading-relaxed">
                    {c.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    {c.poBoxes?.length ? (
                      <span className="block text-[0.9rem]" style={{ color: 'var(--ink-soft)' }}>
                        {m.contact_po_box()} : {c.poBoxes.join(' / ')}
                      </span>
                    ) : null}
                  </address>
                </Line>
              ) : null}
              {c.phones?.length ? (
                <Line icon={<Phone className="size-[1.15rem]" />}>
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    {c.phones.map((p) => (
                      <a key={p} href={telHref(p)} className="link-draw tabular-nums">
                        {p}
                      </a>
                    ))}
                  </span>
                </Line>
              ) : null}
              {c.emails?.length ? (
                <Line icon={<Mail className="size-[1.15rem]" />}>
                  <span className="flex flex-wrap gap-x-5 gap-y-1">
                    {c.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} className="link-draw break-all">
                        {e}
                      </a>
                    ))}
                  </span>
                </Line>
              ) : null}
            </ul>
          ) : (
            <p className="mt-8 border-t border-ink/20 pt-6 text-[0.95rem]" style={{ color: 'var(--ink-soft)' }}>
              {m.network_details_soon()}
            </p>
          )}

          {c.geo ? (
            <a
              href={directionsFor(c.geo)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-[0.9rem] font-semibold text-paper transition-colors duration-300 hover:bg-clay"
            >
              {m.network_itinerary()} <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </Reveal>
      </div>
    </article>
  )
}

function Line({ icon, children }: Readonly<{ icon: React.ReactNode; children: React.ReactNode }>) {
  return (
    <li className="grid grid-cols-[2rem_1fr] items-start gap-x-2 border-b border-ink/20 py-4 text-[1rem]">
      <span className="pt-1 text-forest">{icon}</span>
      <div>{children}</div>
    </li>
  )
}

// Portrait du consul (src/assets/consuls/<key>.webp). Sans photo, un monogramme occupe le cadre.
function Portrait({ consulate: c }: Readonly<{ consulate: Consulate }>) {
  const photo = portraitFor(c.key)
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-forest text-paper">
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        <span className="kicker text-sun">{m.site_republic()}</span>
        <span className="font-display text-[clamp(5rem,14vw,9rem)] leading-none opacity-90">{c.city.charAt(0)}</span>
        <span className="font-display text-xl">{c.city}</span>
      </div>
      {photo ? (
        <img
          src={photo}
          alt={`${m.network_portrait_alt()} ${c.city}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="flag-stripe absolute inset-x-0 bottom-0" />
    </div>
  )
}
