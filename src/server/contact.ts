import { createServerFn } from '@tanstack/react-start'
import { getRequestIP } from '@tanstack/react-start/server'

import { type ContactResult, contactSchema } from '#/lib/contact-schema'

// Le site n'a aucune base de données : le message est transmis à une API tierce
// (service d'e-mail, CRM, outil de tickets…) configurée par CONTACT_API_URL.

// Limite simple par IP (mémoire du processus) : 5 messages / 10 minutes.
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5
const API_TIMEOUT_MS = 10_000

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

    const ip = getRequestIP({ xForwardedFor: true }) ?? 'unknown'
    if (rateLimited(ip)) return { ok: false, code: 'rate_limited' }

    const { CONTACT_API_URL, CONTACT_API_KEY } = process.env

    if (!CONTACT_API_URL) {
      // Développement : on trace le message pour pouvoir tester l'interface sans service tiers.
      if (process.env.NODE_ENV !== 'production') {
        console.info('[contact] CONTACT_API_URL absent, message non transmis :', {
          ...input,
          message: `${input.message.slice(0, 60)}…`,
        })
        return { ok: true }
      }
      console.error('[contact] CONTACT_API_URL n’est pas configuré : message perdu.')
      return { ok: false, code: 'server' }
    }

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(CONTACT_API_KEY ? { Authorization: `Bearer ${CONTACT_API_KEY}` } : {}),
        },
        body: JSON.stringify({
          source: 'consulat-benin.cg',
          receivedAt: new Date().toISOString(),
          name: clean(input.name),
          email: input.email,
          phone: input.phone ? clean(input.phone) : null,
          consulate: input.consulate,
          topic: input.topic,
          message: input.message,
          locale: input.locale,
        }),
        signal: AbortSignal.timeout(API_TIMEOUT_MS),
      })
      if (!res.ok) {
        console.error('[contact] l’API a répondu', res.status)
        return { ok: false, code: 'server' }
      }
      return { ok: true }
    } catch (err) {
      console.error('[contact] appel à l’API impossible :', err instanceof Error ? err.message : err)
      return { ok: false, code: 'server' }
    }
  })
