<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import VanillaTilt from 'vanilla-tilt'

const { animateOnScroll } = useScrollAnimation()
const logoRefs = ref<HTMLElement[]>([])

// Duplicate for seamless marquee
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
  <section id="companies" class="py-32 px-6 relative overflow-hidden">
    <div class="max-w-6xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Companies I've Worked With</span>
      </h2>

      <!-- Marquee Container -->
      <div class="marquee-wrapper relative">
        <!-- Fade edges -->
        <div class="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <!-- Scrolling logos -->
        <div class="flex animate-marquee gap-8 md:gap-16 items-center py-8 w-max">
          <div
            v-for="(company, i) in marqueeLogos"
            :key="`${company.name}-${i}`"
            :ref="(el) => setLogoRef(el, i)"
            class="flex-shrink-0 w-40 md:w-52 h-20 md:h-24 flex items-center justify-center glass-card p-4 md:p-6 grayscale hover:grayscale-0 hover:glow transition-all duration-500 cursor-pointer"
          >
            <img
              :src="company.logo"
              :alt="company.name"
              class="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-500 invert"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
