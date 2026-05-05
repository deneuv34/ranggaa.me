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
</script>

<template>
  <div class="app">
    <div class="grain-overlay" />
    <div class="dot-grid" />
    <NavBar />

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
