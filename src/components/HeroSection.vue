<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { gsap } from 'gsap'
const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  // Staggered entrance
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero__badge', {
    y: 16,
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
  })
  .from('.hero__name', {
    y: 40,
    opacity: 0,
    duration: 0.8,
  }, '-=0.3')
  .from('.hero__tagline', {
    y: 24,
    opacity: 0,
    duration: 0.7,
  }, '-=0.4')
  .from('.hero__actions', {
    y: 20,
    opacity: 0,
    duration: 0.6,
  }, '-=0.3')
  .from('.hero__scroll', {
    opacity: 0,
    duration: 0.8,
  }, '-=0.2')
})
</script>

<template>
  <section
    id="hero"
    class="hero"
  >

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

    <button class="hero__scroll" @click="scrollToAbout" aria-label="Scroll down">
      <div class="hero__scroll-line" />
    </button>
  </section>
</template>
