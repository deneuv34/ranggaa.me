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
  <section id="experience" class="experience">
    <div class="experience__inner">
      <h2 class="experience__title section-title">
        <span class="gradient-text">Experience</span>
      </h2>

      <div class="experience__timeline">
        <div class="experience__timeline-line" />

        <div class="experience__items">
          <div
            v-for="(exp, i) in profile.experience"
            :key="exp.company"
            :ref="(el) => setCardRef(el, i)"
            :class="`timeline-card timeline-card-${i}`"
            class="experience__item"
          >
            <div class="experience__dot" />

            <div class="experience__card glass-card">
              <div class="experience__header">
                <div>
                  <h3 class="experience__company">{{ exp.company }}</h3>
                  <p class="experience__role">{{ exp.role }}</p>
                </div>
                <span class="experience__period">{{ exp.period }}</span>
              </div>

              <p class="experience__description">{{ exp.description }}</p>

              <ul class="experience__highlights">
                <li
                  v-for="highlight in exp.highlights"
                  :key="highlight"
                  class="experience__highlight"
                >
                  <span class="experience__highlight-dot" />
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
