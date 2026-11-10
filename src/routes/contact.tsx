import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import ContactForm from '#/components/contact/ContactForm'
import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { contact, directionsUrl, mapEmbedUrl, mapOpenUrl, telHref } from '#/data/contact'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: `${m.nav_contact()} | ${m.site_name()}` }] }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <section className="wrap pb-10 pt-40 md:pt-48">
        <Reveal>
          <p className="kicker text-clay">{m.nav_contact()}</p>
        </Reveal>
        <h1 className="mt-4 text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.98]">
          <SplitWords immediate text={m.contact_page_title()} />
        </h1>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
            {m.contact_page_intro()}
          </p>
        </Reveal>
      </section>

      <section className="wrap grid gap-12 pb-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Coordonnées */}
        <div className="border-t border-ink/25">
          <Reveal>
            <Row icon={<MapPin className="size-5" />} label={m.contact_address_label()}>
              <address className="not-italic leading-relaxed">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-1 block text-[0.9rem]" style={{ color: 'var(--ink-soft)' }}>
                  {m.contact_po_box()} : {contact.poBoxes.join(' / ')}
                </span>
              </address>
            </Row>
          </Reveal>

          <Reveal delay={0.05}>
            <Row icon={<Phone className="size-5" />} label={m.contact_phones_label()}>
              <ul className="space-y-1.5">
                {contact.phones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} className="link-draw tabular-nums">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          </Reveal>

          <Reveal delay={0.1}>
            <Row icon={<Mail className="size-5" />} label={m.contact_emails_label()}>
              <ul className="space-y-1.5">
                {contact.emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className="link-draw break-all">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-3 pt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-[0.9rem] font-semibold text-paper transition-colors duration-300 hover:bg-clay"
              >
                {m.contact_directions()} <ArrowUpRight className="size-4" />
              </a>
              <a
                href={mapOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/35 px-6 py-3 text-[0.9rem] font-semibold transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {m.contact_open_map()}
              </a>
              <Link
                to="/reseau-consulaire"
                className="inline-flex items-center gap-2 rounded-full border border-ink/35 px-6 py-3 text-[0.9rem] font-semibold transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {m.contact_all_consulates()} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Carte */}
        <Reveal y={36}>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden border border-ink/25 bg-paper-deep lg:aspect-auto lg:h-[34rem]">
              <iframe
                title={m.contact_map_title()}
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full border-0 [filter:saturate(0.75)_contrast(1.03)]"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem]" style={{ color: 'var(--ink-soft)' }}>
              {m.contact_map_note()}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="border-t border-ink/25 bg-paper-deep/60">
        <div className="wrap grid gap-12 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
          <div>
            <Reveal>
              <p className="kicker text-clay">{m.form_kicker()}</p>
            </Reveal>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.04]">
              <SplitWords text={m.form_title()} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-sm text-[1rem] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
                {m.form_intro()}
              </p>
            </Reveal>
          </div>
          <Reveal y={30}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="bg-forest py-16 text-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-[clamp(1.5rem,3vw,2.4rem)] leading-tight">{m.contact_visit()}</p>
          <Link
            to="/rendez-vous"
            className="rounded-full bg-sun px-7 py-3.5 text-[0.92rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {m.contact_visit_cta()}
          </Link>
        </div>
      </section>
    </>
  )
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-ink/25 py-7 md:grid-cols-[2.5rem_9rem_1fr]">
      <span className="pt-0.5 text-forest">{icon}</span>
      <span className="kicker col-start-2 pt-1 text-ink/60 md:col-start-auto">{label}</span>
      <div className="col-start-2 mt-2 text-[1.05rem] md:col-start-auto md:mt-0">{children}</div>
    </div>
  )
}
