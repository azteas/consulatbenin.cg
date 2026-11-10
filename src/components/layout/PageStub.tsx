import { m } from '#/paraglide/messages'

export default function PageStub({ title }: { title: string }) {
  return (
    <section className="wrap min-h-[70svh] pb-24 pt-44">
      <p className="kicker text-clay">{m.site_name_short()}</p>
      <h1 className="mt-4 text-[clamp(2.6rem,7vw,6rem)] leading-none">{title}</h1>
      <p className="mt-6 max-w-md text-ink-soft" style={{ color: 'var(--ink-soft)' }}>
        {m.page_coming_soon()}
      </p>
    </section>
  )
}
