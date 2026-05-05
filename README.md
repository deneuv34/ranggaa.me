# Ranggaame Portfolio

Personal portfolio website for **Rangga Adhitya Prawira**, a Fullstack Engineer focused on scalable systems, API-first architecture, fintech products, and modern web apps.

## Overview

This site presents professional background, featured companies, experience, skills, resume access, and contact links in a clean editorial UI.

## Tech Stack

- **Vue 3**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **GSAP** for entrance animations
- **Lucide Vue** for icons

## Features

- Responsive single-page portfolio
- Dark/light theme support
- Smooth section navigation
- Animated hero intro
- Interactive polygon background
- Experience timeline
- Featured company logos
- Skills grouped by category
- Contact links + resume CTA

## Project Structure

```txt
src/
  App.vue
  components/
    NavBar.vue
    HeroSection.vue
    AboutSection.vue
    CompaniesSection.vue
    ExperienceSection.vue
    SkillsSection.vue
    ContactSection.vue
    PolygonBackground.vue
  composables/
    useTheme.ts
  data/
    profile.ts
  style.css
public/
  logos/
  resume.pdf
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Content Updates

Most portfolio content lives in:

```txt
src/data/profile.ts
```

Update this file to change:

- name/title/tagline
- summary
- work experience
- featured companies
- skills
- contact links
- phone number

Static assets live in:

```txt
public/
```

## Design Direction

The current UI uses an editorial-clean style:

- flat surfaces
- subtle hairline borders
- restrained shadows
- clean typography hierarchy
- smooth hover states
- minimal visual noise

## License

Personal portfolio project. All personal content, logos, and resume assets belong to their respective owners.
