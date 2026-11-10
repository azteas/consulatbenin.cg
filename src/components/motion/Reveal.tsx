import { motion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.2, 0.8, 0.2, 1] as const

// Apparition au défilement : léger glissement vers le haut.
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

// Titre révélé mot par mot, chaque mot monte depuis un masque.
export function SplitWords({
  text,
  className,
  delay = 0,
  immediate = false,
}: {
  text: string
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const words = text.split(' ')
  const trigger = immediate
    ? { animate: 'show' }
    : {
        whileInView: 'show',
        viewport: { once: true, margin: '0px 0px -10% 0px' },
      }
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text}
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden="true"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em', marginBottom: '-0.12em' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 0.95, ease }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
