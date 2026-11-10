import { Link } from '@tanstack/react-router'

import { contact, telHref } from '#/data/contact'
import { navItems } from '#/components/layout/SiteHeader'
import { m } from '#/paraglide/messages'

const links = [
  { href: 'https://evisa.bj', label: () => m.link_evisa() },
  { href: 'https://investbenin.bj', label: () => m.link_invest() },
  { href: 'https://service-public.bj', label: () => m.link_service_public() },
  { href: 'https://gouv.bj', label: () => m.link_gov() },
  { href: 'https://diplomatie.gouv.bj', label: () => m.link_diplomacy() },
]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-paper">
      <div className="wrap grid gap-12 pb-10 pt-20 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="kicker text-sun">{m.site_republic()}</p>
          <p className="mt-3 font-display text-2xl leading-tight">{m.site_name()}</p>
          <div className="mt-5 flex items-center gap-4">
            <img
              src="/images/emblem-benin.webp"
              alt={m.footer_emblem_alt()}
              width={74}
              height={65}
              loading="lazy"
              className="h-[4.25rem] w-auto shrink-0"
            />
            <p className="text-sm text-paper/70">{m.site_motto()}</p>
          </div>
        </div>

        <div>
          <h3 className="kicker font-sans text-paper/55">{m.footer_contact()}</h3>
          <div className="mt-4 space-y-4 text-[0.92rem]">
            <address className="not-italic leading-relaxed">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <ul className="space-y-1">
              {contact.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="link-draw tabular-nums">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-1">
              {contact.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="link-draw break-all">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="kicker font-sans text-paper/55">{m.footer_explore()}</h3>
          <ul className="mt-4 space-y-2 text-[0.92rem]">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-draw">
                  {n.label()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker font-sans text-paper/55">{m.footer_links()}</h3>
          <ul className="mt-4 space-y-2 text-[0.92rem]">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                  {l.label()} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display leading-[0.8] text-paper/[0.07]"
        style={{ fontSize: 'clamp(5rem, 22vw, 20rem)' }}
      >
        Bénin
      </p>

      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-paper/15 py-5 text-[0.78rem] text-paper/60">
        <span>
          © {new Date().getFullYear()} {m.site_name()}. {m.footer_rights()}
        </span>
        <Link to="/credits" className="link-draw">
          {m.footer_credits()}
        </Link>
      </div>
    </footer>
  )
}
