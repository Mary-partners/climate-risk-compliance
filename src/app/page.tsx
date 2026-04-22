import Nav from '@/components/home/Nav'
import Hero from '@/components/home/Hero'
import LogosRow from '@/components/home/LogosRow'
import ProblemStatement from '@/components/home/ProblemStatement'
import PlatformPillars from '@/components/home/PlatformPillars'
import FrameworksSupported from '@/components/home/FrameworksSupported'
import WhoItsFor from '@/components/home/WhoItsFor'
import GlobalRoadmap from '@/components/home/GlobalRoadmap'
import WhyUs from '@/components/home/WhyUs'
import CTABand from '@/components/home/CTABand'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <LogosRow />
      <ProblemStatement />
      <PlatformPillars />
      <FrameworksSupported />
      <WhoItsFor />
      <GlobalRoadmap />
      <WhyUs />
      <CTABand />
      <Footer />
    </main>
  )
}
