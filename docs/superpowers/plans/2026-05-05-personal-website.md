# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page personal portfolio for Rangga Adhitya Prawira with bold dark aesthetic, heavy animations, and dark/light mode.

**Architecture:** Vue 3 SPA with component-per-section, centralized data layer, GSAP scroll animations, tsparticles background, and Tailwind CSS theming with class-based dark mode.

**Tech Stack:** Vue 3, Vite, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, tsparticles, VanillaTilt.js

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Entry HTML, font links |
| `package.json` | Dependencies and scripts |
| `vite.config.ts` | Vite config |
| `tailwind.config.ts` | Theme colors, fonts, animations |
| `tsconfig.json` | TypeScript config |
| `src/main.ts` | App bootstrap |
| `src/App.vue` | Root layout, section composition |
| `src/style.css` | Tailwind directives, custom keyframes, base styles |
| `src/data/profile.ts` | All content data |
| `src/composables/useTheme.ts` | Dark/light mode logic + localStorage |
| `src/composables/useScrollAnimation.ts` | GSAP ScrollTrigger setup |
| `src/composables/useTypingEffect.ts` | Typing animation composable |
| `src/components/NavBar.vue` | Sticky nav, scroll-spy, theme toggle |
| `src/components/HeroSection.vue` | Hero with particles, blob, typing |
| `src/components/AboutSection.vue` | About card with text reveal |
| `src/components/ExperienceSection.vue` | Timeline with tilt cards |
| `src/components/CompaniesSection.vue` | Logo marquee |
| `src/components/SkillsSection.vue` | Tag cloud grid |
| `src/components/ContactSection.vue` | Contact links |
| `public/logos/kredivo.svg` | Kredivo logo |
| `public/logos/xendit.svg` | Xendit logo |
| `public/logos/keller-williams.svg` | Keller Williams logo |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `src/main.ts`, `src/App.vue`, `src/style.css`

- [ ] **Step 1: Initialize project with Vite**

```bash
cd /Users/deneuv34/Working/personal/ranggaame
npm create vite@latest . -- --template vue-ts
```

Select overwrite if prompted (directory exists with docs/).

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install gsap @tsparticles/vue3 @tsparticles/slim vanilla-tilt
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind**

Replace `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        dark: {
          50: '#1a1a2e',
          100: '#16162a',
          200: '#111127',
          300: '#0d0d23',
          400: '#0a0a1f',
          500: '#07071b',
          600: '#050517',
          700: '#030313',
          800: '#02020f',
          900: '#01010b',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 15s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 4: Configure Vite**

Replace `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

- [ ] **Step 5: Set up index.html with fonts**

Replace `index.html`:

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rangga Adhitya Prawira — Fullstack Engineer</title>
    <link rel="preconnect" href="https://api.fontshare.com" />
    <link
      href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="font-body antialiased">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 6: Set up src/style.css**

Replace `src/style.css`:

```css
@import "tailwindcss";

@layer base {
  * {
    @apply transition-colors duration-300;
  }

  body {
    @apply bg-[#0a0a0a] text-white;
  }

  .dark body {
    @apply bg-[#0a0a0a] text-white;
  }

  :root {
    --gradient-start: #6366f1;
    --gradient-mid: #8b5cf6;
    --gradient-end: #a78bfa;
  }

  .light {
    --gradient-start: #4f46e5;
    --gradient-mid: #7c3aed;
    --gradient-end: #6366f1;
  }
}

@layer components {
  .glass-card {
    @apply backdrop-blur-xl border border-white/10 rounded-2xl;
    background: rgba(255, 255, 255, 0.03);
  }

  .light .glass-card {
    @apply border-gray-200/50;
    background: rgba(255, 255, 255, 0.7);
  }

  .gradient-text {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
  }

  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .glow {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.3), 0 0 60px rgba(139, 92, 246, 0.1);
  }

  .light .glow {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.15), 0 0 40px rgba(139, 92, 246, 0.05);
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Set up src/main.ts**

Replace `src/main.ts`:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

createApp(App).mount('#app')
```

- [ ] **Step 8: Set up minimal App.vue**

Replace `src/App.vue`:

```vue
<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen">
    <p class="text-center text-white pt-20 font-display text-4xl">ranggaame — scaffolding complete</p>
  </div>
</template>
```

- [ ] **Step 9: Verify dev server runs**

```bash
npm run dev
```

Expected: Vite dev server starts, page shows "ranggaame — scaffolding complete" with Clash Display font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: project scaffolding - Vue 3 + Vite + Tailwind + deps"
```

---

### Task 2: Profile Data Layer

**Files:**
- Create: `src/data/profile.ts`

- [ ] **Step 1: Create profile data file**

Create `src/data/profile.ts`:

```ts
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
  icon: string // Lucide icon name
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
      logo: '/logos/kredivo.svg',
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
      logo: '/logos/keller-williams.svg',
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
    { name: 'Kredivo', logo: '/logos/kredivo.svg' },
    { name: 'Xendit', logo: '/logos/xendit.svg' },
    { name: 'Keller Williams', logo: '/logos/keller-williams.svg' },
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
  ] as Skill[],

  contact: [
    { label: 'Email', url: 'mailto:deneuv3.4@gmail.com', icon: 'mail' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ranggaad', icon: 'linkedin' },
    { label: 'GitHub', url: 'https://github.com/deneuv34', icon: 'github' },
    { label: 'GitLab', url: 'https://gitlab.com/deneuv34', icon: 'gitlab' },
  ] as ContactLink[],

  phone: '+6285314555514',
} as const
```

- [ ] **Step 2: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: add centralized profile data layer"
```

---

### Task 3: Theme Composable + NavBar

**Files:**
- Create: `src/composables/useTheme.ts`, `src/components/NavBar.vue`

- [ ] **Step 1: Create useTheme composable**

Create `src/composables/useTheme.ts`:

```ts
import { ref, watch, onMounted } from 'vue'

const isDark = ref(true)

export function useTheme() {
  const toggle = () => {
    isDark.value = !isDark.value
  }

  const applyTheme = () => {
    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  })

  watch(isDark, applyTheme)

  return { isDark, toggle }
}
```

- [ ] **Step 2: Create NavBar component**

Create `src/components/NavBar.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggle } = useTheme()
const isScrolled = ref(false)
const activeSection = ref('hero')
const isMobileMenuOpen = ref(false)

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'companies', label: 'Companies' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Scroll spy
  for (const section of [...sections].reverse()) {
    const el = document.getElementById(section.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 150) {
        activeSection.value = section.id
        break
      }
    }
  }
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-black/70 dark:bg-black/70 light:bg-white/70 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <button
        @click="scrollTo('hero')"
        class="font-display font-bold text-xl gradient-text"
      >
        RA
      </button>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <button
          v-for="section in sections.slice(1)"
          :key="section.id"
          @click="scrollTo(section.id)"
          class="relative text-sm font-body text-gray-400 hover:text-white dark:hover:text-white transition-colors group"
          :class="{ 'text-white': activeSection === section.id }"
        >
          {{ section.label }}
          <span
            class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            :class="activeSection === section.id ? 'w-full' : 'w-0 group-hover:w-full'"
          />
        </button>

        <!-- Theme Toggle -->
        <button
          @click="toggle"
          class="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
          aria-label="Toggle theme"
        >
          <svg
            v-if="isDark"
            class="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-primary-400 transition-transform duration-500 rotate-180"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden w-10 h-10 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <div class="space-y-1.5">
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ 'opacity-0': isMobileMenuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
          />
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4"
    >
      <button
        v-for="section in sections.slice(1)"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
        :class="{ 'text-white': activeSection === section.id }"
      >
        {{ section.label }}
      </button>
      <button @click="toggle" class="block w-full text-left text-gray-400 hover:text-white py-2">
        {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </div>
  </nav>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useTheme.ts src/components/NavBar.vue
git commit -m "feat: add theme composable and NavBar with scroll-spy"
```

---

### Task 4: Hero Section with Particles + Typing Effect

**Files:**
- Create: `src/composables/useTypingEffect.ts`, `src/components/HeroSection.vue`

- [ ] **Step 1: Create typing effect composable**

Create `src/composables/useTypingEffect.ts`:

```ts
import { ref, onMounted, onUnmounted } from 'vue'

export function useTypingEffect(text: string, speed = 50, startDelay = 1200) {
  const displayText = ref('')
  const isComplete = ref(false)
  let timeout: ReturnType<typeof setTimeout> | null = null
  let charIndex = 0

  const type = () => {
    if (charIndex < text.length) {
      displayText.value += text[charIndex]
      charIndex++
      timeout = setTimeout(type, speed)
    } else {
      isComplete.value = true
    }
  }

  onMounted(() => {
    timeout = setTimeout(type, startDelay)
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { displayText, isComplete }
}
```

- [ ] **Step 2: Create HeroSection component**

Create `src/components/HeroSection.vue`:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useTypingEffect } from '../composables/useTypingEffect'

const { displayText, isComplete } = useTypingEffect(profile.tagline, 40, 1200)

const isLoaded = ref(false)
const showButtons = ref(false)
const showScroll = ref(false)

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 300)
  setTimeout(() => { showButtons.value = true }, 1800)
  setTimeout(() => { showScroll.value = true }, 2200)
})

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Particle Background - placeholder div, will be replaced with tsparticles in integration -->
    <div id="tsparticles" class="absolute inset-0 z-0" />

    <!-- Animated Gradient Blob -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 blur-3xl animate-blob pointer-events-none"
      style="background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa, #6366f1); background-size: 400% 400%; animation: blob 15s infinite, gradient-shift 8s ease infinite;"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl">
      <!-- Name -->
      <h1
        class="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-4 transition-all duration-700"
        :class="isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.8]'"
      >
        <span class="gradient-text">{{ profile.name }}</span>
      </h1>

      <!-- Typing Tagline -->
      <div class="h-16 md:h-12 flex items-center justify-center">
        <p class="font-body text-lg md:text-xl text-gray-400 dark:text-gray-400">
          {{ displayText }}<span
            class="inline-block w-0.5 h-5 bg-primary-400 ml-1 animate-pulse"
            :class="{ 'opacity-0': isComplete }"
          />
        </p>
      </div>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-700"
        :class="showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          @click="scrollToContact"
          class="px-8 py-3 rounded-full font-body font-medium text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
        >
          Get in Touch
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          class="px-8 py-3 rounded-full font-body font-medium border border-white/20 hover:border-primary-400/50 hover:bg-white/5 hover:scale-[1.02] transition-all duration-300"
        >
          Download Resume
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700"
      :class="showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="animate-bounce-slow">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useTypingEffect.ts src/components/HeroSection.vue
git commit -m "feat: add Hero section with typing effect and animations"
```

---

### Task 5: About Section

**Files:**
- Create: `src/components/AboutSection.vue`, `src/composables/useScrollAnimation.ts`

- [ ] **Step 1: Create scroll animation composable**

Create `src/composables/useScrollAnimation.ts`:

```ts
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  const animateOnScroll = (
    selector: string,
    options: {
      y?: number
      x?: number
      opacity?: number
      duration?: number
      stagger?: number
      delay?: number
      ease?: string
      scale?: number
    } = {}
  ) => {
    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.1,
      delay = 0,
      ease = 'power3.out',
      scale = 1,
    } = options

    gsap.fromTo(
      selector,
      { y, x, opacity, scale },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: selector,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  return { animateOnScroll, gsap, ScrollTrigger }
}
```

- [ ] **Step 2: Create AboutSection component**

Create `src/components/AboutSection.vue`:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

onMounted(() => {
  animateOnScroll('#about .about-title', { y: 40, duration: 0.6 })
  animateOnScroll('#about .about-card', { y: 60, duration: 0.8, delay: 0.2 })
  animateOnScroll('#about .about-line', { y: 20, stagger: 0.08, delay: 0.4 })
})
</script>

<template>
  <section id="about" class="py-32 px-6 relative">
    <div class="max-w-4xl mx-auto">
      <h2 class="about-title font-display font-bold text-3xl md:text-5xl mb-12 text-center">
        <span class="gradient-text">About Me</span>
      </h2>

      <div class="about-card glass-card gradient-border p-8 md:p-12">
        <div class="space-y-4">
          <p
            v-for="(line, i) in profile.summary.split('. ').map((s, idx, arr) => idx < arr.length - 1 ? s + '.' : s)"
            :key="i"
            class="about-line font-body text-lg text-gray-300 dark:text-gray-300 leading-relaxed"
          >
            {{ line }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <span class="about-line px-4 py-2 rounded-full text-sm font-body bg-primary-500/10 text-primary-300 border border-primary-500/20">
            {{ profile.location }}
          </span>
          <span class="about-line px-4 py-2 rounded-full text-sm font-body bg-accent-500/10 text-accent-400 border border-accent-500/20">
            {{ profile.experience.length }}+ years experience
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useScrollAnimation.ts src/components/AboutSection.vue
git commit -m "feat: add About section with scroll animations"
```

---

### Task 6: Experience Section with Timeline

**Files:**
- Create: `src/components/ExperienceSection.vue`

- [ ] **Step 1: Create ExperienceSection component**

Create `src/components/ExperienceSection.vue`:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import VanillaTilt from 'vanilla-tilt'

const { animateOnScroll } = useScrollAnimation()
const cardRefs = ref<HTMLElement[]>([])

onMounted(() => {
  animateOnScroll('#experience .section-title', { y: 40, duration: 0.6 })

  // Animate cards alternating from left/right
  const cards = document.querySelectorAll('#experience .timeline-card')
  cards.forEach((card, i) => {
    const direction = i % 2 === 0 ? -60 : 60
    animateOnScroll(`#experience .timeline-card-${i}`, {
      x: direction,
      y: 20,
      duration: 0.7,
      delay: i * 0.1,
    })
  })

  // Apply VanillaTilt to cards
  cardRefs.value.forEach(el => {
    if (el) {
      VanillaTilt.init(el, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.1,
      })
    }
  })
})
</script>

<template>
  <section id="experience" class="py-32 px-6 relative">
    <div class="max-w-5xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Experience</span>
      </h2>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />

        <!-- Timeline Items -->
        <div class="space-y-12">
          <div
            v-for="(exp, i) in profile.experience"
            :key="exp.company"
            :ref="(el) => { if (el) cardRefs[i] = el as HTMLElement }"
            :class="`timeline-card timeline-card-${i}`"
            class="relative pl-12 md:pl-20"
          >
            <!-- Timeline Dot -->
            <div class="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-500/20" />

            <!-- Card -->
            <div class="glass-card p-6 md:p-8 hover:border-primary-500/30 transition-all duration-300">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 class="font-display font-semibold text-xl text-white">{{ exp.company }}</h3>
                  <p class="font-body text-primary-400 font-medium">{{ exp.role }}</p>
                </div>
                <span class="font-body text-sm text-gray-500 whitespace-nowrap">{{ exp.period }}</span>
              </div>

              <p class="font-body text-gray-400 text-sm mb-4">{{ exp.description }}</p>

              <ul class="space-y-2">
                <li
                  v-for="highlight in exp.highlights"
                  :key="highlight"
                  class="font-body text-sm text-gray-300 flex items-start gap-2"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ExperienceSection.vue
git commit -m "feat: add Experience section with timeline and 3D tilt"
```

---

### Task 7: Companies Section with Logo Marquee

**Files:**
- Create: `src/components/CompaniesSection.vue`, `public/logos/kredivo.svg`, `public/logos/xendit.svg`, `public/logos/keller-williams.svg`

- [ ] **Step 1: Create company logo SVGs**

Create `public/logos/kredivo.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="20" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="currentColor">KREDIVO</text>
</svg>
```

Create `public/logos/xendit.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="20" y="42" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="currentColor">XENDIT</text>
</svg>
```

Create `public/logos/keller-williams.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="10" y="42" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="currentColor">KELLER WILLIAMS</text>
</svg>
```

Note: These are placeholder text-based SVGs. Replace with actual company logos (download from official brand resources or use high-quality versions). The component handles grayscale/color transitions regardless of SVG content.

- [ ] **Step 2: Create CompaniesSection component**

Create `src/components/CompaniesSection.vue`:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import VanillaTilt from 'vanilla-tilt'

const { animateOnScroll } = useScrollAnimation()
const logoRefs = ref<HTMLElement[]>([])

// Duplicate logos for seamless marquee
const marqueeLogos = [...profile.featuredCompanies, ...profile.featuredCompanies, ...profile.featuredCompanies]

onMounted(() => {
  animateOnScroll('#companies .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#companies .marquee-container', { y: 40, scale: 0.95, duration: 0.8, delay: 0.2 })

  logoRefs.value.forEach(el => {
    if (el) {
      VanillaTilt.init(el, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
      })
    }
  })
})
</script>

<template>
  <section id="companies" class="py-32 px-6 relative overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Companies I've Worked With</span>
      </h2>

      <!-- Marquee Container -->
      <div class="marquee-container relative">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none dark:from-[#0a0a0a]" />
        <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none dark:from-[#0a0a0a]" />

        <!-- Scrolling logos -->
        <div class="flex animate-marquee gap-16 items-center py-8">
          <div
            v-for="(company, i) in marqueeLogos"
            :key="`${company.name}-${i}`"
            :ref="(el) => { if (el && i < profile.featuredCompanies.length) logoRefs[i] = el as HTMLElement }"
            class="flex-shrink-0 w-48 h-24 flex items-center justify-center glass-card p-6 grayscale hover:grayscale-0 hover:glow transition-all duration-500 cursor-pointer"
          >
            <img
              :src="company.logo"
              :alt="company.name"
              class="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
              style="filter: brightness(0) invert(1);"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Commit**

```bash
mkdir -p public/logos
git add src/components/CompaniesSection.vue public/logos/
git commit -m "feat: add Companies section with logo marquee"
```

---

### Task 8: Skills Section

**Files:**
- Create: `src/components/SkillsSection.vue`

- [ ] **Step 1: Create SkillsSection component**

Create `src/components/SkillsSection.vue`:

```vue
<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

const categories = computed(() => {
  const map: Record<string, typeof profile.skills> = {}
  profile.skills.forEach(skill => {
    if (!map[skill.category]) map[skill.category] = []
    map[skill.category].push(skill)
  })
  return map
})

const categoryLabels: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  cloud: 'Cloud & Infra',
  databases: 'Databases',
  tools: 'Tools',
}

const categoryColors: Record<string, string> = {
  languages: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300',
  frontend: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-300',
  backend: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300',
  cloud: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300',
  databases: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-300',
  tools: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300',
}

onMounted(() => {
  animateOnScroll('#skills .section-title', { y: 40, duration: 0.6 })

  // Stagger skill tags with random delays
  const tags = document.querySelectorAll('#skills .skill-tag')
  tags.forEach((_, i) => {
    animateOnScroll(`#skills .skill-tag-${i}`, {
      y: 30,
      scale: 0.8,
      duration: 0.5,
      delay: Math.random() * 0.3,
    })
  })
})
</script>

<template>
  <section id="skills" class="py-32 px-6 relative">
    <div class="max-w-5xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Skills & Technologies</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(skills, category) in categories"
          :key="category"
          class="glass-card p-6"
        >
          <h3 class="font-display font-semibold text-lg mb-4 text-gray-200">
            {{ categoryLabels[category as string] }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(skill, i) in skills"
              :key="skill.name"
              :class="[
                `skill-tag skill-tag-${i}`,
                'px-3 py-1.5 rounded-full text-sm font-body border bg-gradient-to-r cursor-default',
                'hover:scale-105 hover:shadow-lg transition-all duration-300',
                categoryColors[category as string]
              ]"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsSection.vue
git commit -m "feat: add Skills section with categorized tag grid"
```

---

### Task 9: Contact Section

**Files:**
- Create: `src/components/ContactSection.vue`

- [ ] **Step 1: Create ContactSection component**

Create `src/components/ContactSection.vue`:

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

const iconPaths: Record<string, string> = {
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
  gitlab: 'M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z',
}

onMounted(() => {
  animateOnScroll('#contact .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#contact .contact-link', { y: 30, stagger: 0.1, delay: 0.2 })
})
</script>

<template>
  <section id="contact" class="py-32 px-6 relative">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-4">
        <span class="gradient-text">Let's Connect</span>
      </h2>
      <p class="font-body text-gray-400 mb-12 text-lg">
        Open to opportunities and collaborations
      </p>

      <!-- Contact Links -->
      <div class="flex flex-wrap justify-center gap-6">
        <a
          v-for="link in profile.contact"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link group flex flex-col items-center gap-3 p-6 glass-card rounded-2xl hover:glow hover:scale-105 hover:border-primary-500/30 transition-all duration-300 w-32"
        >
          <svg
            class="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[link.icon]" />
          </svg>
          <span class="font-body text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
            {{ link.label }}
          </span>
        </a>
      </div>

      <!-- Phone -->
      <p class="mt-8 font-body text-gray-500 text-sm">
        {{ profile.phone }}
      </p>
    </div>

    <!-- Footer -->
    <div class="mt-24 text-center">
      <p class="font-body text-gray-600 text-sm">
        © {{ new Date().getFullYear() }} {{ profile.name }}. Built with Vue & ❤️
      </p>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ContactSection.vue
git commit -m "feat: add Contact section with icon links"
```

---

### Task 10: App Integration + Particles Setup

**Files:**
- Modify: `src/App.vue`, `src/main.ts`

- [ ] **Step 1: Update main.ts with particles plugin**

Replace `src/main.ts`:

```ts
import { createApp } from 'vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
```

- [ ] **Step 2: Update App.vue to compose all sections**

Replace `src/App.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import CompaniesSection from './components/CompaniesSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useTheme } from './composables/useTheme'

useTheme()

const particlesOptions = ref({
  fullScreen: false,
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.5 } },
    },
  },
  particles: {
    color: { value: '#6366f1' },
    links: {
      color: '#6366f1',
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: { default: 'bounce' as const },
    },
    number: {
      density: { enable: true },
      value: 60,
    },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
  },
})
</script>

<template>
  <div class="relative">
    <NavBar />

    <!-- Particles Background (hero area) -->
    <vue-particles
      id="tsparticles"
      class="absolute inset-0 h-screen z-0"
      :options="particlesOptions"
    />

    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CompaniesSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>
```

- [ ] **Step 3: Verify the app builds and runs**

```bash
npm run build
npm run dev
```

Expected: No build errors. Dev server starts. All sections render with animations.

- [ ] **Step 4: Commit**

```bash
git add src/App.vue src/main.ts
git commit -m "feat: integrate all sections with particles background"
```

---

### Task 11: Responsive + Light Mode Polish

**Files:**
- Modify: `src/style.css`, various components as needed

- [ ] **Step 1: Add light mode styles to style.css**

Append to `src/style.css`:

```css
/* Light mode overrides */
.light body {
  @apply bg-white text-gray-900;
}

.light .glass-card {
  @apply bg-white/80 border-gray-200/60 shadow-lg shadow-gray-200/20;
}

.light .gradient-text {
  background-image: linear-gradient(135deg, #4f46e5, #7c3aed, #6366f1);
}

/* Marquee fade edges for light mode */
.light .marquee-container .from-\[\#0a0a0a\] {
  --tw-gradient-from: #ffffff;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.light ::-webkit-scrollbar-track {
  background: #f5f5f5;
}

.light ::-webkit-scrollbar-thumb {
  background: #ccc;
}
```

- [ ] **Step 2: Verify responsive behavior**

Open dev tools, test at:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1440px width

All sections should stack properly on mobile, use grid on desktop.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add light mode styles and responsive polish"
```

---

### Task 12: Final Build Verification + Resume PDF

**Files:**
- Create: `public/resume.pdf` (copy from ~/Downloads/Profile.pdf)

- [ ] **Step 1: Copy resume PDF**

```bash
cp ~/Downloads/Profile.pdf /Users/deneuv34/Working/personal/ranggaame/public/resume.pdf
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/`.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Expected: Site loads correctly at preview URL. All sections visible, animations work, dark/light toggle works, resume download works.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: add resume PDF, final build verification"
```
