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
          class="contact-link group flex flex-col items-center gap-3 p-6 glass-card rounded-2xl hover:glow hover:scale-105 hover:border-primary-500/30 transition-all duration-300 w-28 md:w-32"
        >
          <svg
            class="w-7 h-7 md:w-8 md:h-8 text-gray-400 group-hover:text-primary-400 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[link.icon]" />
          </svg>
          <span class="font-body text-xs md:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
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
