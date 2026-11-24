import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { projects } from '../data'
import Section, { SectionTitle } from './Section'

export default function Projects() {
  const [open, setOpen] = useState<string | null>(projects[0].id)

  return (
    <Section id="proyek" className="bg-silver-50">
      <SectionTitle>Projects</SectionTitle>

      <div>
        {projects.map((p) => {
          const isOpen = open === p.id
          return (
            <article
              key={p.id}
              className="border-t border-graphite/30 last:border-b"
            >
              <h3>
                <button
                  className="group flex w-full cursor-pointer items-center gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${p.id}`}
                  onClick={() => setOpen(isOpen ? null : p.id)}
                >
                  <span className="font-display text-[clamp(1.7rem,5vw,3.4rem)] leading-[1.1] font-medium tracking-[-0.03em] transition duration-300 group-hover:translate-x-2 group-hover:text-steel">
                    {p.title}
                  </span>
                  <span className="ml-auto tabular-nums opacity-70">{p.year}</span>
                  <motion.span
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-current text-2xl leading-none"
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    +
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${p.id}`}
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <div className="grid gap-x-12 gap-y-6 pb-8 md:grid-cols-[1.3fr_1fr]">
                      <p className="max-w-[52ch]">{p.summary}</p>
                      <div className="flex flex-col gap-5">
                        <ul className="flex flex-wrap gap-2">
                          {p.stack.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-graphite/40 px-3.5 py-0.5 text-[0.95rem]"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-6 font-display font-medium">
                          {p.links.map((l) => (
                            <a
                              key={l.label}
                              href={l.href}
                              className="text-steel underline underline-offset-4 transition-colors hover:text-graphite"
                            >
                              {l.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          )
        })}
      </div>
    </Section>
  )
}