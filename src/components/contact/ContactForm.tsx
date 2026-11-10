import { revalidateLogic, useForm } from '@tanstack/react-form'
import { useServerFn } from '@tanstack/react-start'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import {
  type ContactResult,
  consulateKeys,
  contactSchema,
  topicKeys,
} from '#/lib/contact-schema'
import { getLocale } from '#/paraglide/runtime'
import { m } from '#/paraglide/messages'
import { submitContact } from '#/server/contact'

const ease = [0.2, 0.8, 0.2, 1] as const

// Traduit les codes d'erreur du schéma partagé.
const errorText = (e: unknown): string => {
  const code = typeof e === 'string' ? e : (e as { message?: string } | undefined)?.message
  switch (code) {
    case 'name':
      return m.form_err_name()
    case 'email':
      return m.form_err_email()
    case 'phone':
      return m.form_err_phone()
    case 'message':
      return m.form_err_message()
    default:
      return m.form_err_generic()
  }
}

const consulateLabel: Record<(typeof consulateKeys)[number], () => string> = {
  brazzaville: () => m['form_consulate_brazzaville'](),
  'pointe-noire': () => m['form_consulate_pointe-noire'](),
}
const topicLabel: Record<(typeof topicKeys)[number], () => string> = {
  info: () => m.topic_info(),
  passport: () => m.topic_passport(),
  card: () => m.topic_card(),
  legal: () => m.topic_legal(),
  civil: () => m.topic_civil(),
  appointment: () => m.topic_appointment(),
  other: () => m.topic_other(),
}

const fieldBase =
  'w-full border-0 border-b border-ink/35 bg-transparent px-0 py-3 text-[1.02rem] text-ink transition-colors placeholder:text-ink/35 focus:border-forest focus:outline-none focus:ring-0 aria-[invalid=true]:border-clay'

export default function ContactForm() {
  const send = useServerFn(submitContact)
  const [done, setDone] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      consulate: 'brazzaville' as (typeof consulateKeys)[number],
      topic: 'info' as (typeof topicKeys)[number],
      message: '',
      website: '',
      locale: (getLocale() === 'en' ? 'en' : 'fr') as 'fr' | 'en',
    },
    // Validation à l'envoi, puis à chaque saisie : l'erreur disparaît dès que le champ est corrigé.
    validationLogic: revalidateLogic({ mode: 'submit', modeAfterSubmission: 'change' }),
    validators: { onDynamic: contactSchema },
    onSubmit: async ({ value }) => {
      setFailure(null)
      try {
        const res = (await send({ data: value })) as ContactResult
        if (res.ok) {
          setDone(true)
          form.reset()
        } else {
          setFailure(res.code === 'rate_limited' ? m.form_err_rate() : m.form_err_generic())
        }
      } catch {
        setFailure(m.form_err_generic())
      }
    },
  })

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex min-h-[26rem] flex-col items-start justify-center border border-ink/20 bg-paper-deep p-8 md:p-12"
          >
            <svg viewBox="0 0 52 52" className="size-14 text-forest" fill="none" aria-hidden="true">
              <motion.circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
              <motion.path d="M15 27l8 8 14-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease }} />
            </svg>
            <h3 className="mt-6 font-display text-3xl">{m.form_ok_title()}</h3>
            <p className="mt-3 max-w-sm text-[1rem]" style={{ color: 'var(--ink-soft)' }}>
              {m.form_ok_text()}
            </p>
            <button
              type="button"
              onClick={() => setDone(false)}
              className="link-draw mt-8 text-[0.92rem] font-semibold"
            >
              {m.form_again()}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              void form.handleSubmit()
            }}
            className="grid gap-x-8 gap-y-7 md:grid-cols-2"
          >
            <Field form={form} name="name" label={m.form_name()} autoComplete="name" required />
            <Field form={form} name="email" label={m.form_email()} type="email" autoComplete="email" required />
            <Field form={form} name="phone" label={m.form_phone()} type="tel" autoComplete="tel" />

            <form.Field name="consulate">
              {(f) => (
                <Select label={m.form_consulate()} id="f-consulate" value={f.state.value} onChange={(v) => f.handleChange(v as never)}>
                  {consulateKeys.map((k) => (
                    <option key={k} value={k}>
                      {consulateLabel[k]()}
                    </option>
                  ))}
                </Select>
              )}
            </form.Field>

            <div className="md:col-span-2">
              <form.Field name="topic">
                {(f) => (
                  <Select label={m.form_topic()} id="f-topic" value={f.state.value} onChange={(v) => f.handleChange(v as never)}>
                    {topicKeys.map((k) => (
                      <option key={k} value={k}>
                        {topicLabel[k]()}
                      </option>
                    ))}
                  </Select>
                )}
              </form.Field>
            </div>

            <div className="md:col-span-2">
              <form.Field name="message">
                {(f) => {
                  const err = f.state.meta.errors[0]
                  return (
                    <div>
                      <label htmlFor="f-message" className="kicker text-ink/60">
                        {m.form_message()}
                      </label>
                      <textarea
                        id="f-message"
                        name="message"
                        rows={6}
                        maxLength={2000}
                        value={f.state.value}
                        onChange={(e) => f.handleChange(e.target.value)}
                        onBlur={f.handleBlur}
                        aria-invalid={err ? true : undefined}
                        aria-describedby={err ? 'f-message-err' : undefined}
                        className={`${fieldBase} resize-y`}
                      />
                      <div className="flex justify-between gap-4 text-[0.8rem]">
                        <span id="f-message-err" className="text-clay" role={err ? 'alert' : undefined}>
                          {err ? errorText(err) : ''}
                        </span>
                        <span className="tabular-nums text-ink/45">{f.state.value.length} / 2000</span>
                      </div>
                    </div>
                  )
                }}
              </form.Field>
            </div>

            {/* Champ piège anti-robots : masqué pour les humains */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <form.Field name="website">
                {(f) => (
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                )}
              </form.Field>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-5 md:col-span-2">
              <p className="max-w-xs text-[0.8rem]" style={{ color: 'var(--ink-soft)' }}>
                {m.form_privacy()}
              </p>
              <form.Subscribe selector={(s) => s.isSubmitting}>
                {(submitting) => (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-forest px-8 py-3.5 text-[0.92rem] font-semibold text-paper transition-colors duration-300 hover:bg-clay disabled:cursor-wait disabled:opacity-60"
                  >
                    {submitting ? m.form_sending() : m.form_send()}
                  </button>
                )}
              </form.Subscribe>
            </div>

            <AnimatePresence>
              {failure ? (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border-l-2 border-clay bg-clay/10 px-4 py-3 text-[0.92rem] text-ink md:col-span-2"
                >
                  {failure}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

type FieldName = 'name' | 'email' | 'phone'

function Field({
  form,
  name,
  label,
  type = 'text',
  autoComplete,
  required,
}: Readonly<{
  form: ReturnType<typeof useForm<any, any, any, any, any, any, any, any, any, any, any, any>>
  name: FieldName
  label: string
  type?: string
  autoComplete?: string
  required?: boolean
}>) {
  return (
    <form.Field name={name}>
      {(f: any) => {
        const err = f.state.meta.errors[0]
        const id = `f-${name}`
        return (
          <div>
            <label htmlFor={id} className="kicker text-ink/60">
              {label}
              {required ? <span className="text-clay"> *</span> : null}
            </label>
            <input
              id={id}
              name={name}
              type={type}
              autoComplete={autoComplete}
              value={f.state.value}
              onChange={(e) => f.handleChange(e.target.value)}
              onBlur={f.handleBlur}
              aria-invalid={err ? true : undefined}
              aria-describedby={err ? `${id}-err` : undefined}
              className={fieldBase}
            />
            <p id={`${id}-err`} className="min-h-5 text-[0.8rem] text-clay" role={err ? 'alert' : undefined}>
              {err ? errorText(err) : ''}
            </p>
          </div>
        )
      }}
    </form.Field>
  )
}

function Select({
  label,
  id,
  value,
  onChange,
  children,
}: Readonly<{ label: string; id: string; value: string; onChange: (v: string) => void; children: React.ReactNode }>) {
  return (
    <div>
      <label htmlFor={id} className="kicker text-ink/60">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={`${fieldBase} cursor-pointer`}>
        {children}
      </select>
      <p className="min-h-5" />
    </div>
  )
}
