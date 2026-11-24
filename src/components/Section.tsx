import type { ReactNode } from 'react'

export default function Section({
  id,
  className = '',
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`px-gutter py-[clamp(5rem,12vw,9rem)] ${className}`}
    >
      {children}
    </section>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-12 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-none font-medium tracking-[-0.03em]">
      {children}
    </h2>
  )
}