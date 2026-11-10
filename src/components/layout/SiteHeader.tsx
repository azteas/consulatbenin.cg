import { Link, useRouterState } from '@tanstack/react-router'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'motion/react'
import { useEffect, useState } from 'react'

import LocaleSwitcher from '#/components/LocaleSwitcher'
import { m } from '#/paraglide/messages'

const ease = [0.2, 0.8, 0.2, 1] as const

export const navItems = [
  { to: '/services', label: () => m.nav_services() },
  { to: '/reseau-consulaire', label: () => m.nav_network() },
  { to: '/aller-au-benin', label: () => m.nav_go_benin() },
  { to: '/actualites', label: () => m.nav_news() },
  { to: '/contact', label: () => m.nav_contact() },
] as const

const menuItems = [
  { to: '/services', label: () => m.nav_services() },
  { to: '/rendez-vous', label: () => m.nav_appointment() },
  { to: '/suivi', label: () => m.nav_tracking() },
  { to: '/reseau-consulaire', label: () => m.nav_network() },
  { to: '/aller-au-benin', label: () => m.nav_go_benin() },
  { to: '/actualites', label: () => m.nav_news() },
  { to: '/contact', label: () => m.nav_contact() },
] as const

export default function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 240 && y > prev && !open)
  })

  // Ferme le menu à chaque navigation et bloque le défilement quand il est ouvert.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Sur l'accueil, l'en-tête flotte sur la photo ; ailleurs ou après défilement, il prend le papier.
  const light = (isHome && !scrolled) || open
  const solid = !light

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? 'bg-paper/92 text-ink backdrop-blur-md' : 'text-paper'
        } ${solid && scrolled ? 'border-b border-ink/10' : 'border-b border-transparent'}`}
      >
        <div className="wrap flex h-[68px] items-center justify-between gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={m.site_name()}>
            <Flag />
            <span className="leading-none">
              <span className="block font-display text-[1.05rem]">{m.site_name_short()}</span>
              <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.2em] opacity-70">
                Congo
              </span>
            </span>
          </Link>

          <nav className={`hidden items-center gap-8 transition-opacity duration-300 ${open ? 'pointer-events-none opacity-0' : ''} lg:flex`} aria-label="Principal">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="link-draw py-1 text-[0.92rem] font-medium"
              >
                {item.label()}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`hidden transition-opacity duration-300 sm:block ${open ? 'pointer-events-none opacity-0' : ''}`}>
              <LocaleSwitcher tone={light ? 'light' : 'dark'} />
            </div>
            <Link
              to="/rendez-vous"
              className={`hidden rounded-full px-5 py-2.5 text-[0.85rem] font-semibold transition-all duration-300 md:inline-block ${
                open ? 'pointer-events-none opacity-0' : ''
              } ${
                light
                  ? 'bg-paper text-ink hover:bg-sun'
                  : 'bg-forest text-paper hover:bg-clay'
              }`}
            >
              {m.nav_cta()}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              className="group flex h-11 items-center gap-3 pl-2 text-[0.85rem] font-semibold"
            >
              <span className="hidden sm:inline">{open ? m.nav_close() : m.nav_menu()}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${
                    open ? 'top-1/2 rotate-45' : 'top-0 group-hover:w-5'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ${
                    open ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={m.nav_menu()}
            className="fixed inset-0 z-40 overflow-y-auto bg-forest text-paper"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="wrap flex min-h-full flex-col justify-between gap-10 pb-10 pt-28">
              <ul className="space-y-1">
                {menuItems.map((item, i) => (
                  <li key={item.to} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '105%' }}
                      transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        className="group flex items-baseline gap-5 py-1.5 font-display text-[clamp(2.2rem,6.5vw,4.6rem)] leading-[1.05] transition-colors hover:text-sun"
                      >
                        <span className="w-8 text-sm font-sans font-semibold tabular-nums opacity-50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="transition-transform duration-500 group-hover:translate-x-3">
                          {item.label()}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-end justify-between gap-6 border-t border-paper/20 pt-6 text-sm"
              >
                <div>
                  <p className="kicker opacity-60">{m.site_republic()}</p>
                  <p className="mt-1 opacity-80">{m.menu_hint()}</p>
                </div>
                <LocaleSwitcher tone="light" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Les trois bandes du drapeau béninois : vert vertical à gauche, jaune et rouge empilés.
function Flag() {
  return (
    <span className="grid h-7 w-10 grid-cols-[38%_62%] overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" aria-hidden="true">
      <span className="bg-[#008751]" />
      <span className="grid grid-rows-2">
        <span className="bg-[#fcd116]" />
        <span className="bg-[#e8112d]" />
      </span>
    </span>
  )
}
