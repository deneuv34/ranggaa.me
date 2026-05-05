<script setup lang="ts">
import { profile } from '../data/profile'
import { ArrowDown } from 'lucide-vue-next'

const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__glow" />

    <div class="hero__content">
      <div class="hero__badge">
        <span class="hero__badge-dot" />
        Available for opportunities
      </div>

      <h1 class="hero__name">{{ profile.name }}</h1>

      <p class="hero__tagline">
        {{ profile.title }} crafting scalable systems and modern web applications with Go, TypeScript, and React.
      </p>

      <div class="hero__actions">
        <button @click="scrollToContact" class="hero__btn-primary">
          Get in Touch
        </button>
        <a href="/resume.pdf" target="_blank" class="hero__btn-secondary">
          View Resume
        </a>
      </div>
    </div>

    <div class="hero__scroll" @click="scrollToAbout">
      <div class="hero__scroll-line" />
    </div>
  </section>
</template>
