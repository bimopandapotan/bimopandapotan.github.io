import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

const WORDS = ['Software,', 'hardware,', 'security.']

// Pengaturan waktu (detik)
const START = 0.4 // kata pertama muncul
const GAP = 0.4 // jeda antar kata
const HOLD = 2.5 // total waktu sebelum layar pembuka naik

const ease = [0.22, 1, 0.36, 1] as const

export default function Intro({ onDone }: { onDone: () => void }) {
  // Simpan callback di ref supaya timer tidak ter-reset saat induk re-render
  const done = useRef(onDone)
  done.current = onDone

  useEffect(() => {
    const timer = setTimeout(() => done.current(), HOLD * 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      role="status"
      aria-label="Software, hardware, security."
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-graphite px-gutter"
      onClick={() => done.current()}
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <p
        aria-hidden="true"
        className="flex flex-wrap justify-center gap-x-[0.3em] font-display text-[clamp(2rem,7vw,5.5rem)] leading-tight font-medium tracking-[-0.03em]"
      >
        {WORDS.map((word, i) => (
          <span key={word} className="-my-[0.1em] overflow-hidden py-[0.1em]">
            <motion.span
              className={`block ${i === WORDS.length - 1 ? 'text-steel-light' : 'text-silver-50'}`}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease, delay: START + i * GAP }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </p>
    </motion.div>
  )
}