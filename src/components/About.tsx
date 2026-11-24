import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react'
import { profile } from '../data'
import Reveal from './Reveal'
import Section, { SectionTitle } from './Section'

function Word({
  word,
  range,
  progress,
}: {
  word: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.55'],
  })

  // Hanya naik, tidak pernah turun
  const progress = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > progress.get()) progress.set(v)
  })

  const words = profile.about.split(' ')

  return (
    <Section id="tentang" className="bg-silver-100">
      <Reveal>
        <SectionTitle>About me</SectionTitle>
      </Reveal>

      {/* Kata-kata menyala satu per satu mengikuti scroll */}
      <p
        ref={ref}
        className="max-w-[26em] font-display text-[clamp(1.6rem,3.8vw,3rem)] leading-[1.2] font-medium tracking-[-0.02em]"
      >
        {reduce
          ? profile.about
          : words.map((w, i) => (
              <Word
                key={i}
                word={w}
                progress={progress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            ))}
      </p>

      <Reveal delay={0.1}>
        <p className="mt-12 flex items-center gap-3 font-display font-medium text-steel before:size-2.5 before:shrink-0 before:rounded-full before:bg-steel before:content-['']">
          {profile.status}
        </p>
      </Reveal>
    </Section>
  )
}