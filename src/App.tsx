import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Flavors } from './components/Flavors'
import { Story } from './components/Story'
import { FindUs } from './components/FindUs'
import { Footer } from './components/Footer'
import { StickyCTA } from './components/StickyCTA'
import { SparkleCursor } from './components/SparkleCursor'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Flavors />
        <Story />
        <FindUs />
      </main>
      <Footer />
      <StickyCTA />
      <SparkleCursor />
    </>
  )
}
