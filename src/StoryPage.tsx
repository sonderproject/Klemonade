import { Nav } from './components/Nav'
import { FullStory } from './components/FullStory'
import { Footer } from './components/Footer'
import { StickyCTA } from './components/StickyCTA'
import { SparkleCursor } from './components/SparkleCursor'

export default function StoryPage() {
  return (
    <>
      <Nav />
      <main>
        <FullStory />
      </main>
      <Footer />
      <StickyCTA href="../#find-us" />
      <SparkleCursor />
    </>
  )
}
