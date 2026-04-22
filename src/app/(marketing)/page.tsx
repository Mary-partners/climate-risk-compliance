import Hero from '@/components/home/Hero'
import LogosRow from '@/components/home/LogosRow'
import ProblemStatement from '@/components/home/ProblemStatement'
import ThemeTeasers from '@/components/home/ThemeTeasers'
import CTABand from '@/components/home/CTABand'

export default function Home() {
  return (
    <main>
      <Hero />
      <LogosRow />
      <ProblemStatement />
      <ThemeTeasers />
      <CTABand />
    </main>
  )
}
