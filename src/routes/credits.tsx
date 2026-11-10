import { createFileRoute } from '@tanstack/react-router'

import credits from '#/data/credits.json'
import emblem from '#/data/credit-emblem.json'
import { extraPhotos, sites, text } from '#/data/sites'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/credits')({
  head: () => ({ meta: [{ title: `${m.credits_title()} | ${m.site_name()}` }] }),
  component: Credits,
})

type Credit = { author: string; license: string; source: string }

function Credits() {
  return (
    <section className="wrap pb-28 pt-44">
      <h1 className="text-[clamp(2.4rem,6vw,5rem)] leading-none">{m.credits_title()}</h1>
      <p className="mt-5 max-w-xl" style={{ color: 'var(--ink-soft)' }}>
        {m.credits_intro()}
      </p>
      <ul className="mt-12 border-t border-ink/20">
        {[...sites, ...extraPhotos]
          .filter((s, i, all) => all.findIndex((o) => o.image === s.image) === i)
          .map((s) => {
          const c = (credits as Record<string, Credit>)[s.key]
          if (!c) return null
          return (
            <li key={s.key} className="grid gap-1 border-b border-ink/20 py-4 md:grid-cols-[1fr_1.4fr_auto] md:gap-8">
              <span className="font-display text-lg">{text(s.name)}</span>
              <span className="text-[0.92rem]">
                {m.credits_by()} {c.author}
              </span>
              {c.source ? (
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="link-draw w-fit text-[0.9rem] font-semibold">
                  {c.license} ↗
                </a>
              ) : (
                <span className="text-[0.9rem] font-semibold">{c.license}</span>
              )}
            </li>
          )
        })}
        <li className="grid gap-1 border-b border-ink/20 py-4 md:grid-cols-[1fr_1.4fr_auto] md:gap-8">
          <span className="font-display text-lg">{m.credits_emblem()}</span>
          <span className="text-[0.92rem]">
            {m.credits_by()} {emblem.author}
          </span>
          <a href={emblem.source} target="_blank" rel="noopener noreferrer" className="link-draw w-fit text-[0.9rem] font-semibold">
            {emblem.license} ↗
          </a>
        </li>
      </ul>
    </section>
  )
}
