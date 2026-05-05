<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import CompaniesSection from './components/CompaniesSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useTheme } from './composables/useTheme'

useTheme()

const particlesOptions = {
  fullScreen: false,
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' as const },
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
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: { default: 'bounce' as const },
    },
    number: {
      density: { enable: true },
      value: 50,
    },
    opacity: { value: 0.25 },
    size: { value: { min: 1, max: 2.5 } },
  },
}
</script>

<template>
  <div class="app">
    <NavBar />

    <vue-particles
      id="tsparticles"
      class="app__particles"
      :options="particlesOptions"
    />

    <main class="app__main">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <CompaniesSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>
