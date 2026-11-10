import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import { Reveal, SplitWords } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages'

export default function CtaBand() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink py-32 text-paper md:py-44">
      <motion.img
        src="/images/benin/amazones.webp"
        alt=""
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[14%] -z-10 h-[128%] w-full object-cover opacity-45"
      />
      <div className="wrap">
        <Reveal>
          <p className="kicker text-sun">{m.cta_kicker()}</p>
        </Reveal>
        <h2 className="mt-5 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.03]">
          <SplitWords text={m.cta_title()} />
        </h2>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-md text-[1.05rem] text-paper/80">{m.cta_text()}</p>
          <Link
            to="/rendez-vous"
            className="mt-9 inline-block rounded-full bg-sun px-8 py-4 text-[0.95rem] font-semibold text-ink transition-transform duration-300 hover:-translate-y-1"
          >
            {m.cta_button()}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
