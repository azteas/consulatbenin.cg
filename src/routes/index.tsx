import { createFileRoute } from '@tanstack/react-router'

import CtaBand from '#/components/home/CtaBand'
import Discover from '#/components/home/Discover'
import Hero from '#/components/home/Hero'
import Marquee from '#/components/home/Marquee'
import Services from '#/components/home/Services'
import Steps from '#/components/home/Steps'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Discover />
      <Steps />
      <CtaBand />
    </>
  )
}
