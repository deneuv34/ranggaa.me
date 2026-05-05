# Personal Website — Design Spec

**Date:** 2026-05-05
**Author:** Rangga Adhitya Prawira
**Project:** ranggaame

---

## Overview

A single-page personal portfolio website showcasing Rangga's professional profile, experience, and skills. Bold dark aesthetic with purple/blue accent gradients, heavy animations, and dark/light mode toggle.

## Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`, TypeScript)
- **Build:** Vite
- **Styling:** Tailwind CSS (class-based dark mode strategy)
- **Animations:** GSAP + ScrollTrigger
- **Particles:** tsparticles (interactive particle background)
- **3D Effects:** VanillaTilt.js (card hover tilt)
- **Fonts:** Display: "Clash Display" (or similar geometric bold); Body: "Satoshi" (or similar clean geometric sans). Loaded via Fontsource or Google Fonts. No Inter/Roboto/Arial.

## Visual Style

- **Theme:** Bold with Accent — dark base (#0a0a0a), purple/blue gradient accents
- **Dark mode default**, light mode available via toggle
- **Glassmorphism** cards with subtle backdrop-blur
- **Animated gradient blobs** as background decoration
- **Heavy motion** throughout — page load sequence, scroll reveals, hover effects, persistent animations

## Page Structure (Single Page, Scrolling)

### 1. Hero Section
- Full viewport height
- Interactive particle background (floating dots/connections, react to mouse)
- Animated morphing gradient blob behind text
- Name: fade-in with scale animation
- Tagline: typing effect — "Fullstack Engineer | Scalable Systems & Modern Web Apps"
- CTA buttons: "Get in Touch" (scroll to contact) + "Download Resume" (PDF link)
- Scroll-down indicator with infinite bounce

### 2. About Section
- Summary paragraph (condensed from LinkedIn profile):
  > "I'm a fullstack engineer who builds end-to-end systems — from user-facing interfaces to the backend services that power them. My core strength is in backend and system design, but I also work across the frontend to deliver complete, production-ready features. I focus on scalable APIs, event-driven systems, and responsive maintainable UIs. Recently exploring AI-powered applications, RAG, and recommendation systems."
- Glassmorphism card with gradient border
- Text reveal animation (line by line on scroll)

### 3. Experience Section
- Vertical timeline layout (line on left side)
- Cards alternate slide-in from left/right with stagger
- 3D tilt on hover (VanillaTilt, max 10°)
- Each card shows: company, role, dates, key contributions

**Roles (chronological, newest first):**
1. **Kredivo Group** — Senior Full Stack Engineer (Feb 2024 – Present)
   - Internal platforms, TypeScript, scalable APIs, cross-functional collaboration
2. **Xendit** — Software Engineer (Jun 2022 – Feb 2024)
   - Virtual Account payments, duplicate payment alert system, ~$250K/year savings
3. **Rencana** — Co-Founder (Dec 2021 – Sep 2023)
   - Financial/investment planner startup
4. **Keller Williams Realty** — Software Engineer (Apr 2021 – Jul 2023)
   - Contact Management Service for world's largest real estate franchise
5. **Female Daily Network** — Backend Developer (Mar 2019 – Mar 2021)
   - Beauty platform web services, NodeJS, TypeScript, Go
6. **Beonco** — Web Developer (Jul 2018 – Mar 2019)
   - E-Commerce, PHP/Laravel
7. **Triplogic** — Software Engineer (May 2017 – Jul 2018)
   - On-demand logistics, PHP, TypeScript, Go, React
8. **Refactory** — Mobile Programmer Intern (Jan 2017 – Apr 2017)
   - React Native

### 4. Companies Section
- Logo showcase of notable companies: **Kredivo**, **Xendit**, **Keller Williams Realty**
- Marquee-style infinite horizontal scroll animation
- Logos displayed in grayscale by default
- On hover: colorize + glow effect + 3D tilt
- Scale-in with elastic ease on scroll reveal

### 5. Skills/Tech Section
- Floating tag cloud / grid layout
- Categories:
  - **Languages:** Go, TypeScript, Python, PHP, JavaScript
  - **Frontend:** React, React Native, Vue
  - **Backend:** Node.js, REST APIs, Microservices, Event-Driven Architecture
  - **Cloud/Infra:** GCP, BigQuery, Cloud Storage, Kubernetes, Docker
  - **Databases:** PostgreSQL, MongoDB, Redis
  - **Tools:** Git, CI/CD
- Tags cascade in with staggered random delay
- Hover: pulse + accent border glow

### 6. Contact Section
- Heading: "Let's Connect"
- Links with icons: Email (deneuv3.4@gmail.com), LinkedIn, GitHub, GitLab
- Phone: +6285314555514
- Icons hover: scale 1.2 + accent color + shadow bloom
- Gradient underline animation on heading

### Navigation (NavBar)
- Sticky top navigation
- Scroll-spy highlights active section
- Dark/light mode toggle button (sun/moon icon with rotation transition)
- Nav links: underline slides in from left on hover
- Transparent background, blur on scroll

## Animations Specification

### Page Load Sequence (orchestrated)
1. Particle background fades in (0–0.5s)
2. Name scales 0.8→1 with opacity (0.3–0.9s, ease-out)
3. Typing effect on tagline starts (1.2s delay)
4. CTA buttons slide up with 100ms stagger (1.8s delay)
5. Scroll indicator bounces in (2.2s delay)

### Scroll-Triggered (GSAP ScrollTrigger)
- Each section: fade + translateY(60px→0) on viewport entry
- Inner elements stagger 50–100ms between items
- Experience cards: alternate left/right slide-in
- Skill tags: cascade with random delay offsets (50–200ms)
- Company logos: scale(0→1) with elastic ease

### Persistent Animations
- Gradient blob: CSS `@keyframes` morphing shape (15s infinite loop)
- Particles: continuous float, mouse proximity interaction
- Scroll indicator: infinite bounce (2s loop)
- Company logo marquee: continuous horizontal scroll (30s loop)

### Hover/Interaction
- Experience cards + company logos: 3D tilt (VanillaTilt, max 10°, glare)
- CTA buttons: gradient shift + scale(1.02) + glow box-shadow
- Skill tags: pulse + accent border glow
- Contact icons: scale(1.2) + color accent + shadow bloom
- Nav links: underline width 0→100% from left (0.3s)

### Dark/Light Mode Toggle
- 0.3s CSS transition on all color properties
- Particle color scheme changes (purple dots → indigo/teal)
- Gradient blob palette shifts
- Toggle icon: sun↔moon with rotation animation

## Project Structure

```
ranggaame/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── public/
│   ├── resume.pdf
│   └── logos/
│       ├── kredivo.svg
│       ├── xendit.svg
│       └── keller-williams.svg
├── src/
│   ├── App.vue
│   ├── main.ts
│   ├── style.css              # Tailwind directives + custom keyframes
│   ├── components/
│   │   ├── NavBar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ExperienceSection.vue
│   │   ├── CompaniesSection.vue
│   │   ├── SkillsSection.vue
│   │   └── ContactSection.vue
│   ├── composables/
│   │   ├── useScrollAnimation.ts
│   │   ├── useTheme.ts
│   │   └── useTypingEffect.ts
│   └── data/
│       └── profile.ts         # All content centralized
└── docs/
    └── superpowers/
        └── specs/
```

## Data Source

All profile content lives in `src/data/profile.ts` — name, title, summary, experience entries, skills, contact links, company logos. Components read from this single source. Content updates never require touching component files.

## Deployment

Static site — build with `vite build`, deploy to any static host (Vercel, Netlify, GitHub Pages). No server required.

## Success Criteria

- Loads fast (<2s first paint)
- All animations smooth (60fps, GPU-accelerated transforms)
- Responsive: works on mobile, tablet, desktop
- Accessible: semantic HTML, keyboard navigation, reduced-motion media query fallback
- Dark/light mode persists via localStorage
- Company logos clearly visible and recognizable
- Content matches LinkedIn profile accurately
