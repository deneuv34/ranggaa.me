<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

const summaryLines = profile.summary.split('. ').map((s, idx, arr) =>
  idx < arr.length - 1 ? s + '.' : s
)

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
            v-for="(line, i) in summaryLines"
            :key="i"
            class="about-line font-body text-lg leading-relaxed text-gray-300"
          >
            {{ line }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-3">
          <span class="about-line px-4 py-2 rounded-full text-sm font-body bg-primary-500/10 text-primary-300 border border-primary-500/20">
            📍 {{ profile.location }}
          </span>
          <span class="about-line px-4 py-2 rounded-full text-sm font-body bg-accent-500/10 text-accent-400 border border-accent-500/20">
            💼 {{ profile.experience.length }}+ years experience
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
