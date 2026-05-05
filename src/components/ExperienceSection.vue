<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Briefcase } from 'lucide-vue-next'

const { animateOnScroll } = useScrollAnimation()

onMounted(() => {
  animateOnScroll('#experience .exp-animate', { y: 30, duration: 0.6, stagger: 0.12 })
})
</script>

<template>
  <section id="experience" class="experience">
    <div class="experience__inner">
      <div class="experience__header exp-animate">
        <p class="section-label">Experience</p>
        <h2 class="section-heading">Where I've worked</h2>
      </div>

      <div class="experience__timeline">
        <div class="experience__line" />

        <div
          v-for="(exp, index) in profile.experience"
          :key="exp.company"
          class="experience__item exp-animate"
          :class="{ 'experience__item--right': index % 2 !== 0 }"
        >
          <div class="experience__node">
            <Briefcase :size="12" />
          </div>

          <div class="experience__card">
            <div class="experience__period">{{ exp.period }}</div>
            <h3 class="experience__company">{{ exp.company }}</h3>
            <p class="experience__role">{{ exp.role }}</p>
            <ul class="experience__list">
              <li
                v-for="h in exp.highlights"
                :key="h"
                class="experience__list-item"
              >
                {{ h }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
