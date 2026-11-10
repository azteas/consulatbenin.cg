import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { sites, text } from '#/data/sites'
import { m } from '#/paraglide/messages'

// Galerie horizontale libre : elle défile sur elle-même (souris, doigt, flèches),
// mais ne retient jamais la page — le défilement vertical continue normalement.
export default function Discover() {
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 })
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    setProgress(p)
    setActive(Math.round(p * (sites.length - 1)))
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = scroller.current
    const card = el?.querySelector('[data-card]') as HTMLElement | null
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' })
  }

  // Glisser à la souris (le tactile utilise le défilement natif).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = e.currentTarget
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft, moved: 0 }
    el.style.scrollSnapType = 'none'
    el.style.cursor = 'grabbing'
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    d.moved = Math.max(d.moved, Math.abs(dx))
    e.currentTarget.scrollLeft = d.startLeft - dx
  }
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = e.currentTarget
    el.style.scrollSnapType = ''
    el.style.cursor = ''
  }

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32" aria-labelledby="discover-title">
      <div className="wrap flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker text-sun">{m.discover_kicker()}</p>
          </Reveal>
          <h2 id="discover-title" className="mt-5 text-[clamp(2.1rem,4.4vw,3.8rem)] leading-[1.04]">
            <SplitWords text={m.discover_title()} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-paper/70">{m.discover_intro()}</p>
          </Reveal>
        </div>

        <div className="flex gap-3" role="group" aria-label={m.discover_kicker()}>
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Précédent"
            className="grid size-12 place-items-center rounded-full border border-paper/35 transition-colors hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Suivant"
            className="grid size-12 place-items-center rounded-full border border-paper/35 transition-colors hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          // Un glissement ne doit pas être pris pour un clic sur une carte.
          if (drag.current.moved > 6) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = 0
          }
        }}
        className="mt-14 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-[max(1.25rem,calc((100vw-1240px)/2))] pb-4 [scroll-padding-inline:max(1.25rem,calc((100vw-1240px)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {sites.map((s, i) => (
          <Link
            key={s.key}
            to="/aller-au-benin"
            data-card
            draggable={false}
            className="group block w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[25rem]"
          >
            {/* Même cadre pour toutes les photos */}
            <div className="aspect-[4/5] overflow-hidden bg-paper/10">
              <img
                src={s.image}
                alt={`${text(s.name)}, ${text(s.place)}`}
                loading="lazy"
                draggable={false}
                className="h-full w-full scale-[1.04] select-none object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.12]"
                style={{ objectPosition: s.focus ?? 'center' }}
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-[1.55rem] leading-tight">{text(s.name)}</h3>
              <span className="text-[0.78rem] font-semibold tabular-nums text-sun">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <p className="kicker mt-1 text-paper/55">{text(s.place)}</p>
            <p className="mt-3 min-h-[6.2rem] text-[0.93rem] leading-relaxed text-paper/75">{text(s.blurb)}</p>
          </Link>
        ))}
      </div>

      <div className="wrap mt-10 flex items-center gap-5 text-[0.78rem] tabular-nums text-paper/70">
        <span>{String(active + 1).padStart(2, '0')}</span>
        <span className="relative h-px flex-1 bg-paper/20">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left bg-sun transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
          />
        </span>
        <span>{String(sites.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
