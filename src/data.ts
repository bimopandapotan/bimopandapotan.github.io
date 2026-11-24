// Ubah semua isi di file ini dengan datamu sendiri.

export type Project = {
  id: string
  title: string
  year: string
  summary: string
  stack: string[]
  links: { label: string; href: string }[]
}

export const profile = {
  name: 'Bimo Pandapotan',
  role: 'Software Developer',
  location: 'Bandung, Indonesia',
  intro:
    'I create problems instead of solutions.',
  about:
    'I am an undergraduate student at Institut Teknologi Bandung, majoring in Electrical Engineering. I am a Software Engineer specifically Back-End Engineer. Currently working on a massive project that determines the future of humanity.',
  status: 'I am open to freelance and collaborations.',
  email: 'bimosatp522@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/bimopandapotan' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/bimo-pandapotan' },
    { label: 'Instagram', href: 'https://instagram.com/rdbiim._' },
  ],
}

export const projects: Project[] = [
  {
    id: 'ai-home',
    title: 'AI Integrated Mini Smart Home',
    year: '2025',
    summary:
      'Combined whatsapp-web.js and Gemini AI with Internet of Things to make you control devices through chats.',
    stack: ['JavaScript', 'Node.js', 'Python', ],
    links: [
      { label: 'Demo', href: '#' },
      { label: 'Source code', href: '#' },
    ],
  },
  {
    id: 'monitoring-web',
    title: 'Monitoring Web',
    year: '2025',
    summary:
      'A website for trainers to observe and monitor the interns easily and practical.',
    stack: ['PHP', 'Laravel', 'MySQL', 'TailwindCSS'],
    links: [{ label: 'Demo', href: '#' }],
  },
  {
    id: 'ai-assistant',
    title: 'Amateur AI Assistant',
    year: '2025',
    summary:
      'An ecosystem where you can talk to AI and tell them to do something.',
    stack: ['Python', 'TTS', 'STT', 'SQLite'],
    links: [
      { label: 'Demo', href: '#' },
      { label: 'Source code', href: '#' },
    ],
  },
  {
    id: 'face-attendance',
    title: 'Attendance Using Python Face Recognition',
    year: '2025',
    summary:
      'Now you can check your attendance just by showing your face on the camera.',
    stack: ['PHP', 'Laravel', 'Python', 'FastAPI', 'Flask'],
    links: [{ label: 'Source code', href: '#' }],
  },
]

export const skills = [
  'React',
  'TypeScript',
  'Motion',
  'Vite',
  'Next.js',
  'TailwindCSS',
  'Node.js',
  'Figma',
  'Git',
  'PHP',
  'Laravel',
  'Java',
  'HTML',
  'CSS',
  'JavaScript',
  'Firebase',
  'MySQL',
  'PostgreSQL',
]

export type Education = {
  school: string
  degree: string
  years: string
  note: string
}

export const education: Education[] = [
  {
    school: 'Institut Teknologi Bandung',
    degree: 'Bachelor of Electrical Engineering',
    years: '2026 – 2030',
    note: 'Participated in Aksi Angkatan STEI-R ITB 2026 as a Junior Software Engineer, created apps that solve major problems in campus life.',
  },
  {
    school: 'SMK Negeri 2 Surakarta',
    degree: 'Software Engineering',
    years: '2023 – 2026',
    note: 'Did nothing.',
  },
]