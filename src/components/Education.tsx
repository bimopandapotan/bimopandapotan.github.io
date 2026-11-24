import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { education } from '../data'
import Reveal from './Reveal'
import Section, { SectionTitle } from './Section'

export default function Education() {
  const list = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ['start 0.75', 'end 0.6'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 })

  return (
    <Section id="pendidikan" className="bg-silver-100">
      <Reveal>
        <SectionTitle>Education</SectionTitle>
      </Reveal>

      <div ref={list} className="relative grid max-w-3xl gap-14 pl-10">
        {/* Garis waktu terisi mengikuti scroll */}
        <div
          className="absolute top-2 bottom-2 left-[0.55rem] w-0.5 bg-graphite/15"
          aria-hidden="true"
        >
          <motion.div className="h-full w-full origin-top bg-steel" style={{ scaleY }} />
        </div>

        {education.map((e) => (
          <Reveal className="relative" key={e.school} x={-28} y={20}>
            <motion.span
              className="absolute top-[0.4rem] -left-[2.45rem] size-[1.1rem] rounded-full bg-steel ring-[5px] ring-silver-100"
              aria-hidden="true"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }}
            />
            <p className="font-display font-medium text-steel tabular-nums">{e.years}</p>
            <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.3rem)] leading-[1.15] font-medium tracking-[-0.02em]">
              {e.school}
            </h3>
            <p className="font-medium">{e.degree}</p>
            <p className="mt-1.5 max-w-[50ch] opacity-80">{e.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
