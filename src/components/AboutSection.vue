<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { MapPin, Briefcase } from 'lucide-vue-next'

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
  <section id="about" class="about">
    <div class="about__inner">
      <h2 class="about__title about-title">
        <span class="gradient-text">About Me</span>
      </h2>

      <div class="about__card glass-card gradient-border about-card">
        <div>
          <p
            v-for="(line, i) in summaryLines"
            :key="i"
            class="about__text about-line"
            style="margin-bottom: 1rem;"
          >
            {{ line }}
          </p>
        </div>

        <div class="about__tags">
          <span class="about__tag about__tag--location about-line">
            <MapPin :size="14" style="display: inline; vertical-align: middle; margin-right: 4px;" />
            {{ profile.location }}
          </span>
          <span class="about__tag about__tag--experience about-line">
            <Briefcase :size="14" style="display: inline; vertical-align: middle; margin-right: 4px;" />
            {{ profile.experience.length }}+ years experience
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
