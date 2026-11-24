import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { profile } from '../data'
import Section from './Section'

const ease = [0.22, 1, 0.36, 1] as const

// Wadah: menyalakan anak-anaknya satu per satu
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

// Email naik dari balik "tirai" (dipotong overflow-hidden)
const rise: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

const socials: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const line: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease } },
}

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Section
      id="kontak"
      className="bg-graphite text-silver-100 [&_:focus-visible]:outline-steel-light"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={item}
          className="mb-10 max-w-[22ch] font-display text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] font-medium tracking-[-0.02em]"
        >
          Have a project or just wanna say hi?
        </motion.p>

        <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.button
            variants={rise}
            onClick={copyEmail}
            className="block cursor-pointer text-left font-display text-[clamp(1.9rem,7.4vw,6.5rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-silver-50 underline decoration-[0.06em] underline-offset-[0.12em] transition-colors hover:text-steel-light"
          >
            {profile.email}
          </motion.button>
        </span>

        <motion.span
          variants={item}
          className="mt-4 mb-10 block h-7 overflow-hidden text-silver-400"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'done' : 'idle'}
              className="block"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? 'Email copied to clipboard' : 'Click to copy email'}
            </motion.span>
          </AnimatePresence>
        </motion.span>

        <motion.div
          variants={socials}
          className="flex flex-wrap gap-x-8 gap-y-2 font-display font-medium"
        >
          {profile.socials.map((s) => (
            <motion.a
              key={s.label}
              variants={item}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-steel-light hover:underline"
            >
              {s.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Garis pemisah menggambar dari kiri ke kanan */}
        <motion.div
          variants={line}
          className="mt-20 h-px origin-left bg-silver-100/30"
        />

        <motion.div
          variants={fade}
          className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-[0.95rem] text-silver-400"
        >
          <p>
            © {new Date().getFullYear()} {profile.name}. Made with React, Vite, Tailwind, Motion, and TypeScript. All rights reserved
          </p>
          <a
            href="#top"
            className="font-display font-medium underline-offset-4 transition-colors hover:text-silver-50 hover:underline"
          >
            Back to top
          </a>
        </motion.div>
      </motion.div>
    </Section>
  )
}