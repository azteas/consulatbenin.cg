import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { SplitWords } from '#/components/motion/Reveal'
import { extraPhotos, sites, text } from '#/data/sites'
import { m } from '#/paraglide/messages'

const ease = [0.2, 0.8, 0.2, 1] as const
const all = [...sites, ...extraPhotos]
const slides = ['amazones', 'cite', 'ouidah', 'littoral', 'ganvie', 'marina'].map(
  (k) => all.find((s) => s.key === k)!,
)

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Le minuteur repart de zéro à chaque changement (clic compris).
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearTimeout(id)
  }, [index])

  const current = slides[index]

  return (
    <section ref={ref} className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[6%] bottom-[-6%] -z-10">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.key}
            src={current.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current.focus ?? 'center' }}
            initial={{ opacity: 0, scale: 1.18 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.6 }, scale: { duration: 9, ease: 'linear' } }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-ink/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="wrap flex h-full flex-col justify-end pb-24 pt-28 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="kicker mb-6 flex items-center gap-3 text-sun"
        >
          <span className="h-px w-10 bg-sun" /> {m.hero_kicker()}
        </motion.p>

        <h1 className="text-[clamp(2.3rem,6vw,5.4rem)] leading-[1.02]">
          <SplitWords immediate delay={0.35} text={`${m.hero_title_1()} ${m.hero_title_2()}`} />
          <br />
          <span className="text-sun italic">
            <SplitWords immediate delay={0.8} text={m.hero_title_3()} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease }}
          className="mt-9 flex max-w-5xl flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-md">
            <p className="text-[1.02rem] leading-relaxed text-paper/85">{m.hero_subtitle()}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="rounded-full bg-sun px-6 py-3 text-[0.9rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {m.hero_cta_services()}
              </Link>
              <Link
                to="/aller-au-benin"
                className="rounded-full border border-paper/45 px-6 py-3 text-[0.9rem] font-semibold transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                {m.hero_cta_discover()}
              </Link>
            </div>
          </div>

          <form action="/suivi" className="w-full max-w-sm">
            <label htmlFor="hero-ref" className="kicker text-paper/70">
              {m.hero_track_label()}
            </label>
            <div className="mt-2 flex border-b border-paper/60 focus-within:border-sun">
              <input
                id="hero-ref"
                name="ref"
                required
                placeholder={m.tracking_placeholder()}
                className="w-full bg-transparent py-3 text-[0.95rem] text-paper placeholder:text-paper/50 focus:outline-none"
              />
              <button type="submit" className="whitespace-nowrap px-1 text-sm font-semibold text-sun">
                {m.tracking_button()} →
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Légende de la photo + repères de diaporama */}
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-7 flex items-center justify-between text-[0.78rem] text-paper/75">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-semibold text-paper">{text(current.name)}</span> · {text(current.place)}
          </motion.p>
        </AnimatePresence>
        <div className="pointer-events-auto flex items-center gap-2" role="tablist" aria-label="Photos">
          {slides.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={text(s.name)}
              onClick={() => setIndex(i)}
              className="group py-3"
            >
              <span className={`block h-[2px] transition-all duration-500 ${i === index ? 'w-10 bg-sun' : 'w-5 bg-paper/50 group-hover:bg-paper'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
