<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import VanillaTilt from 'vanilla-tilt'

const { animateOnScroll } = useScrollAnimation()
const cardRefs = ref<HTMLElement[]>([])

const setCardRef = (el: any, i: number) => {
  if (el) cardRefs.value[i] = el as HTMLElement
}

onMounted(() => {
  animateOnScroll('#experience .section-title', { y: 40, duration: 0.6 })

  profile.experience.forEach((_, i) => {
    const direction = i % 2 === 0 ? -40 : 40
    const el = document.querySelector(`#experience .timeline-card-${i}`)
    if (el) {
      animateOnScroll(`#experience .timeline-card-${i}`, {
        x: direction,
        y: 20,
        duration: 0.7,
        delay: i * 0.05,
      })
    }
  })

  // Apply VanillaTilt
  cardRefs.value.forEach(el => {
    if (el) {
      VanillaTilt.init(el, {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.08,
      })
    }
  })
})
</script>

<template>
  <section id="experience" class="py-32 px-6 relative">
    <div class="max-w-5xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Experience</span>
      </h2>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-accent-500/30 to-transparent" />

        <!-- Timeline Items -->
        <div class="space-y-10">
          <div
            v-for="(exp, i) in profile.experience"
            :key="exp.company"
            :ref="(el) => setCardRef(el, i)"
            :class="`timeline-card timeline-card-${i}`"
            class="relative pl-12 md:pl-20"
          >
            <!-- Timeline Dot -->
            <div class="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-500/20" />

            <!-- Card -->
            <div class="glass-card p-6 md:p-8 hover:border-primary-500/30 transition-all duration-300">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 class="font-display font-semibold text-xl text-white">{{ exp.company }}</h3>
                  <p class="font-body text-primary-400 font-medium">{{ exp.role }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-body text-sm text-gray-500 whitespace-nowrap">{{ exp.period }}</span>
                </div>
              </div>

              <p class="font-body text-gray-400 text-sm mb-4">{{ exp.description }}</p>

              <ul class="space-y-2">
                <li
                  v-for="highlight in exp.highlights"
                  :key="highlight"
                  class="font-body text-sm text-gray-300 flex items-start gap-2"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 shrink-0" />
                  {{ highlight }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
