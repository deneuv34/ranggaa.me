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
  particles: {
    color: { value: '#333333' },
    links: {
      color: '#333333',
      distance: 200,
      enable: true,
      opacity: 0.05,
      width: 0.5,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none' as const,
      random: true,
      straight: false,
      outModes: { default: 'bounce' as const },
    },
    number: {
      density: { enable: true },
      value: 30,
    },
    opacity: { value: 0.15 },
    size: { value: { min: 0.5, max: 1.5 } },
  },
}
</script>

<template>
  <div class="app">
    <div class="grain-overlay" />
    <NavBar />

    <vue-particles
      id="tsparticles"
      class="app__particles"
      :options="particlesOptions"
    />

    <main class="app__main">
      <HeroSection />
      <AboutSection />
      <CompaniesSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  </div>
</template>
