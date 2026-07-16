import Nav from './components/Nav'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'

function App() {
  return (
    <main>
      <div className="flex h-screen snap-start snap-always flex-col">
        <Nav />
        <Hero />
      </div>
      <Projects />
      <Skills />
    </main>
  )
}

export default App
