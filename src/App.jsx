import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Platform from './components/Platform.jsx'
import SafetyLoop from './components/SafetyLoop.jsx'
import Protect from './components/Protect.jsx'
import Pipeline from './components/Pipeline.jsx'
import Testimonials from './components/Testimonials.jsx'
import CTA from './components/CTA.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Platform />
        <SafetyLoop />
        <Protect />
        <Pipeline />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
