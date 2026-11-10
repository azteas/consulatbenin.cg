import { createFileRoute } from '@tanstack/react-router'

import PageStub from '#/components/layout/PageStub'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/rendez-vous')({
  head: () => ({ meta: [{ title: `${m.nav_appointment()} | ${m.site_name()}` }] }),
  component: () => <PageStub title={m.nav_appointment()} />,
})
