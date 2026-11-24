import type { ReactNode } from 'react'
import { motion } from 'motion/react'

type Props = {
  children: ReactNode
  delay?: number
  x?: number
  y?: number
  className?: string
}

// Membungkus apa pun: muncul sekali saat masuk ke layar.
export default function Reveal({ children, delay = 0, x = 0, y = 36, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}