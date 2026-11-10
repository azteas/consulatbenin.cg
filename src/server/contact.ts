import { createServerFn } from '@tanstack/react-start'
import { getRequestIP } from '@tanstack/react-start/server'

import { type ContactResult, contactSchema } from '#/lib/contact-schema'

// Limite simple par IP (mémoire du processus) : 5 messages / 10 minutes.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5

function rateLimited(key: string) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}

const clean = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export const submitContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    const parsed = contactSchema.safeParse(data)
    if (!parsed.success) return { ok: false, code: 'invalid' }
    const input = parsed.data

    // Robot : on répond « ok » sans rien enregistrer.
    if (input.website) return { ok: true }

    const ip = getRequestIP({ xForwardedFor: true }) ?? 'unknown'
    if (rateLimited(ip)) return { ok: false, code: 'rate_limited' }

    try {
      const { createHash } = await import('node:crypto')
      const { db } = await import('#/db')
      const { contactMessages } = await import('#/db/schema')
      const { eq } = await import('drizzle-orm')

      const [row] = await db
        .insert(contactMessages)
        .values({
          name: clean(input.name),
          email: input.email,
          phone: input.phone ? clean(input.phone) : null,
          consulate: input.consulate,
          topic: input.topic,
          message: input.message,
          locale: input.locale,
          ipHash: createHash('sha256').update(ip).digest('hex').slice(0, 24),
        })
        .returning({ id: contactMessages.id })

      // Notification par e-mail : uniquement si le SMTP est configuré (voir .env.example).
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO } = process.env
      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        try {
          const { contact } = await import('#/data/contact')
          const { consulates } = await import('#/data/network')
          const nodemailer = await import('nodemailer')
          const to = CONTACT_TO || consulates.find((c) => c.key === input.consulate)?.emails?.[0] || contact.emails[0]
          const transport = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT ?? 587),
            secure: Number(SMTP_PORT ?? 587) === 465,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
          })
          await transport.sendMail({
            from: SMTP_FROM || SMTP_USER,
            to,
            replyTo: { name: clean(input.name), address: input.email },
            subject: `[Site] ${input.topic} – ${clean(input.name)}`,
            text: [
              `Consulat : ${input.consulate}`,
              `Sujet : ${input.topic}`,
              `Nom : ${clean(input.name)}`,
              `E-mail : ${input.email}`,
              `Téléphone : ${input.phone || '—'}`,
              `Langue : ${input.locale}`,
              '',
              input.message,
            ].join('\n'),
          })
          await db.update(contactMessages).set({ emailedAt: new Date() }).where(eq(contactMessages.id, row.id))
        } catch (err) {
          // Le message est déjà en base : on ne fait pas échouer l'envoi pour un souci SMTP.
          console.error('[contact] envoi e-mail impossible :', err instanceof Error ? err.message : err)
        }
      }
      return { ok: true }
    } catch (err) {
      console.error('[contact] enregistrement impossible :', err instanceof Error ? err.message : err)
      return { ok: false, code: 'server' }
    }
  })
