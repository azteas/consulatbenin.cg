import { z } from 'zod'

export const consulateKeys = ['brazzaville', 'pointe-noire'] as const
export const topicKeys = ['info', 'passport', 'card', 'legal', 'civil', 'appointment', 'other'] as const

// Les messages d'erreur sont des codes : l'interface les traduit (FR/EN).
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'name').max(120, 'name'),
  email: z.string().trim().max(200, 'email').pipe(z.email('email')),
  phone: z
    .string()
    .trim()
    .max(40, 'phone')
    .regex(/^[+\d\s().-]*$/, 'phone'),
  consulate: z.enum(consulateKeys),
  topic: z.enum(topicKeys),
  message: z.string().trim().min(10, 'message').max(2000, 'message'),
  // Champ piège : invisible pour les humains, rempli par les robots.
  website: z.string().max(0),
  locale: z.enum(['fr', 'en']),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactResult = { ok: true } | { ok: false; code: 'invalid' | 'rate_limited' | 'server' }
