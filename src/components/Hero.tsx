import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'motion/react'
import { profile } from '../data'
import Background from './Background'

const RADIUS = 220
const PUSH = 70

const nameVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
}

const letterVariants: Variants = {
  hidden: { y: '55%', opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 110, damping: 15 },
  },
}

// Lapisan luar: animasi masuk + titik ukur. Lapisan dalam: efek menjauh dari kursor.
function Letter({ char }: { char: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tilt = useMotionValue(0)
  const spring = { stiffness: 170, damping: 13, mass: 0.6 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)
  const sr = useSpring(tilt, spring)

  useEffect(() => {
    if (reduce) return

    const reset = () => {
      x.set(0)
      y.set(0)
      tilt.set(0)
    }

    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const b = el.getBoundingClientRect()
      const dx = e.clientX - (b.left + b.width / 2)
      const dy = e.clientY - (b.top + b.height / 2)
      const dist = Math.hypot(dx, dy)

      if (dist === 0 || dist > RADIUS) return reset()

      const force = 1 - dist / RADIUS
      x.set(-(dx / dist) * force * PUSH)
      y.set(-(dy / dist) * force * PUSH)
      tilt.set((dx / dist) * force * -28)
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', reset)
    }
  }, [reduce, x, y, tilt])

  return (
    <motion.span ref={ref} className="inline-block" variants={letterVariants}>
      <motion.span
        className="-my-[0.1em] inline-block py-[0.1em] text-metal"
        style={{ x: sx, y: sy, rotate: sr }}
      >
        {char}
      </motion.span>
    </motion.span>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const [failed] = useState(false)
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden flex min-h-svh flex-col justify-end gap-12 bg-brushed px-gutter pt-28 pb-10"
    >
      {!failed && ready && (
        <div className="absolute inset-0 -z-10">
          <Background
              material="chrome"
              lightMode
              shardColor="#c9cdd4"
              accentColor="#46689a"
              count={900}
            />
        </div>
      )}

      <motion.h1
        className="cursor-default font-display text-[clamp(4.5rem,19vw,17rem)] leading-[0.86] font-medium tracking-[-0.05em]"
        aria-label={profile.name}
        variants={nameVariants}
        initial="hidden"
        animate={ready ? 'show' : 'hidden'}
      >
        {profile.name.split(' ').map((word, wi) => (
          <span className="block" key={wi} aria-hidden="true">
            {[...word].map((char, i) => (
              <Letter key={i} char={char} />
            ))}
          </span>
        ))}
      </motion.h1>

      <motion.div
        className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
      >
        <p className="max-w-[32ch] text-[1.4rem] leading-snug">{profile.intro}</p>
        <p className="text-right font-display font-medium text-steel">
          {profile.role}
          <br />
          {profile.location}
        </p>
      </motion.div>
    </section>
  )
}