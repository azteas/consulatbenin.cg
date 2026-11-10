import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'

import { db } from '#/db'
import * as schema from '#/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  user: {
    additionalFields: {
      role: { type: 'string', defaultValue: 'agent', input: false },
    },
  },
  // Back-office uniquement : les comptes sont créés par un administrateur.
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  plugins: [tanstackStartCookies()],
})
