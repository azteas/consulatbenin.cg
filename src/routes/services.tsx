import { createFileRoute } from '@tanstack/react-router'

import PageStub from '#/components/layout/PageStub'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/services')({
  head: () => ({ meta: [{ title: `${m.nav_services()} | ${m.site_name()}` }] }),
  component: () => <PageStub title={m.nav_services()} />,
})
