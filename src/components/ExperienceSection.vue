<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

onMounted(() => {
  animateOnScroll('#experience .exp-animate', { y: 20, duration: 0.5, stagger: 0.08 })
})
</script>

<template>
  <section id="experience" class="experience">
    <div class="experience__inner">
      <div class="experience__header exp-animate">
        <p class="section-label">Experience</p>
        <h2 class="section-heading">Where I've worked</h2>
      </div>

      <div class="experience__list">
        <div
          v-for="exp in profile.experience"
          :key="exp.company"
          class="experience__item card card--interactive exp-animate"
        >
          <div>
            <div class="experience__company">{{ exp.company }}</div>
          </div>
          <div class="experience__role">{{ exp.role }}</div>
          <div class="experience__period">{{ exp.period }}</div>

          <div class="experience__detail">
            <p class="experience__description">{{ exp.description }}</p>
            <div class="experience__highlights">
              <span
                v-for="h in exp.highlights"
                :key="h"
                class="experience__highlight"
              >
                {{ h }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
