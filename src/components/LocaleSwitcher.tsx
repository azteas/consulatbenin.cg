import { m } from '#/paraglide/messages'
import { getLocale, locales, setLocale } from '#/paraglide/runtime'

export default function LocaleSwitcher({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  const current = getLocale()

  return (
    <div
      role="group"
      aria-label={m.language_label()}
      className="flex items-center gap-1 text-[0.8rem] font-bold tracking-wider"
    >
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => setLocale(locale)}
            aria-pressed={locale === current}
            lang={locale}
            className={`px-1 py-1 transition-opacity ${
              locale === current ? 'opacity-100' : 'opacity-45 hover:opacity-100'
            } ${tone === 'light' ? 'text-paper' : 'text-ink'}`}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
