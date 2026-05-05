<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import VanillaTilt from 'vanilla-tilt'

const { animateOnScroll } = useScrollAnimation()
const logoRefs = ref<HTMLElement[]>([])

const marqueeLogos = [...profile.featuredCompanies, ...profile.featuredCompanies, ...profile.featuredCompanies]

const setLogoRef = (el: any, i: number) => {
  if (el && i < profile.featuredCompanies.length) logoRefs.value[i] = el as HTMLElement
}

onMounted(() => {
  animateOnScroll('#companies .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#companies .marquee-wrapper', { y: 40, scale: 0.95, duration: 0.8, delay: 0.2 })

  logoRefs.value.forEach(el => {
    if (el) {
      VanillaTilt.init(el, {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.15,
      })
    }
  })
})
</script>

<template>
  <section id="companies" class="companies">
    <div class="companies__inner">
      <h2 class="companies__title section-title">
        <span class="gradient-text">Companies I've Worked With</span>
      </h2>

      <div class="companies__marquee marquee-wrapper">
        <div class="companies__fade-left" />
        <div class="companies__fade-right" />

        <div class="companies__track">
          <div
            v-for="(company, i) in marqueeLogos"
            :key="`${company.name}-${i}`"
            :ref="(el) => setLogoRef(el, i)"
            class="companies__logo-card glass-card"
          >
            <img
              :src="company.logo"
              :alt="company.name"
              class="companies__logo-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
