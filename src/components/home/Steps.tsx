import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages'

const steps = [
  { t: () => m.step_1_title(), d: () => m.step_1_desc() },
  { t: () => m.step_2_title(), d: () => m.step_2_desc() },
  { t: () => m.step_3_title(), d: () => m.step_3_desc() },
  { t: () => m.step_4_title(), d: () => m.step_4_desc() },
]

export default function Steps() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.4 })
  const photo = useRef<HTMLDivElement>(null)
  const { scrollYProgress: pp } = useScroll({ target: photo, offset: ['start end', 'end start'] })
  const py = useTransform(pp, [0, 1], ['-9%', '9%'])

  return (
    <section className="wrap py-28 md:py-40">
      <Reveal>
        <p className="kicker text-clay">{m.steps_kicker()}</p>
      </Reveal>
      <h2 className="mt-4 max-w-[18ch] text-[clamp(2.1rem,4.6vw,4rem)] leading-[1.05]">
        <SplitWords text={m.steps_title()} />
      </h2>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
      <ol ref={ref} className="relative">
        <span className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-ink/15 md:left-[1.4rem]" aria-hidden="true" />
        <motion.span
          style={{ scaleY: line }}
          className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-clay md:left-[1.4rem]"
          aria-hidden="true"
        />
        {steps.map((s, i) => (
          <li key={s.t()} className="relative pb-14 pl-14 last:pb-0 md:pb-20 md:pl-20">
            <Reveal y={22}>
              <span className="absolute left-0 top-1 grid size-[2.3rem] place-items-center rounded-full border border-ink/30 bg-paper text-[0.85rem] font-bold tabular-nums md:size-[2.8rem]">
                {i + 1}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.3rem)] leading-tight">{s.t()}</h3>
              <p className="mt-2 max-w-md text-[1rem] leading-relaxed text-ink-soft" style={{ color: 'var(--ink-soft)' }}>
                {s.d()}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
        <div ref={photo} className="relative hidden aspect-[4/5] self-start overflow-hidden bg-ink md:sticky md:top-28 md:block">
          <motion.img
            src="/images/benin/dantokpa.webp"
            alt="Marché Dantokpa, Cotonou"
            loading="lazy"
            style={{ y: py }}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
