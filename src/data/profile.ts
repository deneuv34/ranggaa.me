export interface Experience {
  company: string
  role: string
  period: string
  location?: string
  description: string
  highlights: string[]
  logo?: string
}

export interface Skill {
  name: string
  category: 'languages' | 'frontend' | 'backend' | 'cloud' | 'databases' | 'tools'
}

export interface ContactLink {
  label: string
  url: string
  icon: string
}

export const profile = {
  name: 'Rangga Adhitya Prawira',
  title: 'Fullstack Engineer',
  tagline: 'Fullstack Engineer | Scalable Systems & Modern Web Apps | Go, TypeScript, React | Event-Driven & API-First Architecture',
  location: 'Bandung, West Java, Indonesia',

  summary: `I'm a fullstack engineer who builds end-to-end systems — from user-facing interfaces to the backend services that power them. My core strength is in backend and system design, but I also work across the frontend to deliver complete, production-ready features. I focus on scalable APIs, event-driven systems, and responsive maintainable UIs. Recently exploring AI-powered applications, RAG, and recommendation systems.`,

  experience: [
    {
      company: 'Kredivo Group',
      role: 'Senior Full Stack Engineer',
      period: 'Feb 2024 – Present',
      location: 'Jakarta, Indonesia',
      description: 'Leading digital financial services provider in Southeast Asia, operating Kredivo, KrediFazz, and Krom.',
      highlights: [
        'Developed and maintained internal platforms supporting critical business workflows',
        'Built end-to-end features across frontend and backend using TypeScript',
        'Designed scalable APIs ensuring reliability and performance',
        'Contributed to system design focusing on maintainability and modularity',
      ],
      logo: '/logos/kredivo.png',
    },
    {
      company: 'Xendit',
      role: 'Software Engineer',
      period: 'Jun 2022 – Feb 2024',
      location: 'Indonesia',
      description: 'Southeast Asian fintech providing payment infrastructure and APIs for high-volume real-time transactions.',
      highlights: [
        'Developed core services for Virtual Account payments in Indonesia',
        'Designed backend services handling payment lifecycle flows',
        'Co-designed duplicate payment alert system saving ~$250K/year',
        'Improved internal visibility into payment anomalies',
      ],
      logo: '/logos/xendit.svg',
    },
    {
      company: 'Rencana',
      role: 'Co-Founder',
      period: 'Dec 2021 – Sep 2023',
      location: 'Indonesia',
      description: 'Financial and investment planner through consultation and digital media.',
      highlights: [
        'Co-founded fintech startup for financial planning',
        'Built digital platform for financial consultation services',
      ],
    },
    {
      company: 'Keller Williams Realty',
      role: 'Software Engineer',
      period: 'Apr 2021 – Jul 2023',
      location: 'Remote',
      description: "World's largest real estate franchise by agent count with 180,000+ associates globally.",
      highlights: [
        'Developed and maintained Contact Management Service',
        'Supercharged agent productivity through tooling improvements',
      ],
      logo: '/logos/keller-williams.png',
    },
    {
      company: 'Female Daily Network',
      role: 'Backend Developer',
      period: 'Mar 2019 – Mar 2021',
      location: 'Jakarta, Indonesia',
      description: "Indonesia's largest beauty destination revolutionizing beauty product discovery.",
      highlights: [
        'Maintained and developed web services using NodeJS, TypeScript, and Go',
        'Built backend systems for beauty product platform',
      ],
    },
    {
      company: 'Beonco',
      role: 'Web Developer',
      period: 'Jul 2018 – Mar 2019',
      location: 'Malang, East Java',
      description: 'Indonesia-Malaysia E-Commerce subsidiary of PT. The Netwerk.',
      highlights: [
        'Created and maintained web services using PHP with Laravel/Lumen',
      ],
    },
    {
      company: 'Triplogic',
      role: 'Software Engineer',
      period: 'May 2017 – Jul 2018',
      location: 'Bandung',
      description: 'On-demand logistics startup for inter/intra-city last mile delivery.',
      highlights: [
        'Built backend services using PHP, TypeScript, Go',
        'Contributed to React Native and React JS frontend',
      ],
    },
    {
      company: 'Refactory',
      role: 'Mobile Programmer Intern',
      period: 'Jan 2017 – Apr 2017',
      location: 'Bandung',
      description: 'Mobile development bootcamp and agency.',
      highlights: [
        'Developed mobile applications with React Native',
      ],
    },
  ] as Experience[],

  featuredCompanies: [
    { name: 'Kredivo', logo: '/logos/kredivo.png' },
    { name: 'Xendit', logo: '/logos/xendit.svg' },
    { name: 'Keller Williams', logo: '/logos/keller-williams.png' },
  ],

  skills: [
    { name: 'Go', category: 'languages' },
    { name: 'TypeScript', category: 'languages' },
    { name: 'Python', category: 'languages' },
    { name: 'PHP', category: 'languages' },
    { name: 'JavaScript', category: 'languages' },
    { name: 'React', category: 'frontend' },
    { name: 'React Native', category: 'frontend' },
    { name: 'Vue', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'REST APIs', category: 'backend' },
    { name: 'Microservices', category: 'backend' },
    { name: 'Event-Driven Architecture', category: 'backend' },
    { name: 'GCP', category: 'cloud' },
    { name: 'BigQuery', category: 'cloud' },
    { name: 'Cloud Storage', category: 'cloud' },
    { name: 'Kubernetes', category: 'cloud' },
    { name: 'Docker', category: 'cloud' },
    { name: 'PostgreSQL', category: 'databases' },
    { name: 'MongoDB', category: 'databases' },
    { name: 'Redis', category: 'databases' },
    { name: 'Git', category: 'tools' },
    { name: 'CI/CD', category: 'tools' },
    { name: 'Elasticsearch', category: 'databases' },
    { name: 'MySQL', category: 'databases' },
    { name: 'AWS', category: 'cloud' },
    { name: 'RabbitMQ', category: 'tools' },
    { name: 'NestJS', category: 'backend' },
    { name: 'Nuxt.js', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'Laravel', category: 'backend' },
    { name: 'Kafka', category: 'tools' },
  ] as Skill[],

  contact: [
    { label: 'Email', url: 'mailto:deneuv3.4@gmail.com', icon: 'mail' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ranggaad', icon: 'linkedin' },
    { label: 'GitHub', url: 'https://github.com/deneuv34', icon: 'github' },
    { label: 'GitLab', url: 'https://gitlab.com/deneuv34', icon: 'gitlab' },
  ] as ContactLink[],

  phone: '+6285314555514',
} as const
