import { useRef } from 'react'
import { motion } from 'motion/react'
import { skills } from '../data'
import Section, { SectionTitle } from './Section'

const tones = [
  'bg-graphite text-silver-100',
  'bg-silver-50 text-graphite',
  'bg-steel text-white',
]
const tilts = [-4, 3, -2, 5, -6, 2]

export default function Skills() {
  const area = useRef<HTMLDivElement>(null)

  return (
    <Section id="keahlian" className="bg-silver-300">
      <SectionTitle>Tech Stacks</SectionTitle>
      <p className="-mt-6 mb-10 max-w-[40ch] opacity-80">
        The chips below can be thrown. Throw anywhere
      </p>

      <div
        ref={area}
        className="relative flex min-h-[22rem] flex-wrap content-start gap-4 rounded-3xl border border-dashed border-graphite/40 p-8"
      >
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            className={`cursor-grab rounded-full px-5 py-2.5 font-display text-xl leading-tight font-medium shadow-[0_8px_18px_-10px_rgba(38,42,50,0.6)] select-none active:cursor-grabbing ${tones[i % tones.length]}`}
            style={{ rotate: tilts[i % tilts.length] }}
            drag
            dragConstraints={area}
            dragElastic={0.25}
            whileHover={{ scale: 1.06 }}
            whileDrag={{ scale: 1.12, zIndex: 5 }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: i * 0.04 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </Section>
  )
}