import { AnimatePresence,MotionConfig, motion, useScroll, useSpring, type Variants } from 'motion/react'
import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Intro from './components/Intro'

const links = [
  { href: '#', label: 'Home' },
  { href: '#tentang', label: 'About' },
  { href: '#proyek', label: 'Projects' },
  { href: '#keahlian', label: 'Skills' },
  { href: '#pendidikan', label: 'Education' },
  { href: '#kontak', label: 'Contact' },
]

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[5px] origin-left bg-steel"
      style={{ scaleX }}
    />
  )
}

const navVariants: Variants = {
  hidden: { y: -32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
      delay: 0.6,
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0 },
}

export default function App() {
  const [introOpen, setIntroOpen] = useState(true) // layar pembuka masih tampil
  const [ready, setReady] = useState(false) // layar sudah hilang total

  useEffect(() => {
    history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  // Kunci scroll sampai layar pembuka benar-benar hilang
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={() => setReady(true)}>
        {introOpen && <Intro onDone={() => setIntroOpen(false)} />}
      </AnimatePresence>
      <ScrollProgress />
      {ready && (
        <motion.nav
          aria-label="Navigasi utama"
          variants={navVariants}
          initial="hidden"
          animate="show"
          className="fixed inset-x-0 top-[18px] z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] gap-1 rounded-full bg-graphite/90 p-1.5 font-display text-[0.95rem] font-medium shadow-lg backdrop-blur max-sm:text-[0.8rem]"
        >
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              variants={linkVariants}
              className="rounded-full px-3.5 py-1.5 text-silver-100 transition-colors hover:bg-white/10 hover:text-white max-sm:px-2"
            >
              {l.label}
            </motion.a>
          ))}
        </motion.nav>
      )}
      <main>
        <Hero ready={ready} />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </MotionConfig>
  )
}