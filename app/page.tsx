import AboutSection from '@/components/particle/about'
import FAQSection from '@/components/particle/faq'
import Footer from '@/components/particle/footer'
import HeroSection from '@/components/particle/heroSection'
import LeaderboardSection from '@/components/particle/leaderboard'
import MetodeSection from '@/components/particle/Methods'
import Navbar from '@/components/particle/navbar'
import TestimonySection from '@/components/particle/testimony'

const page = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutSection/>
      <MetodeSection/>
      <LeaderboardSection/>
      <TestimonySection/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default page
