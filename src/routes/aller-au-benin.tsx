import { createFileRoute } from '@tanstack/react-router'

import PageStub from '#/components/layout/PageStub'
import { m } from '#/paraglide/messages'

export const Route = createFileRoute('/aller-au-benin')({
  head: () => ({ meta: [{ title: `${m.nav_go_benin()} | ${m.site_name()}` }] }),
  component: () => <PageStub title={m.nav_go_benin()} />,
})
