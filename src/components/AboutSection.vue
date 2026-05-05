<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { MapPin } from 'lucide-vue-next'

const { animateOnScroll } = useScrollAnimation()

onMounted(() => {
  animateOnScroll('#about .about-animate', { y: 20, duration: 0.6, stagger: 0.1 })
})
</script>

<template>
  <section id="about" class="about">
    <div class="about__inner">
      <p class="section-label about-animate">About</p>

      <div class="about__grid">
        <div class="about__card card about-animate">
          <p class="about__text">{{ profile.summary }}</p>
        </div>

        <div class="about__sidebar">
          <div class="about__stat-card card about-animate">
            <div class="about__stat-value">{{ profile.experience.length }}+</div>
            <div class="about__stat-label">Years of Experience</div>
          </div>

          <div class="about__stat-card card about-animate">
            <div class="about__stat-value">{{ profile.featuredCompanies.length }}</div>
            <div class="about__stat-label">Notable Companies</div>
          </div>

          <div class="about__location card about-animate">
            <MapPin :size="16" class="about__location-icon" />
            <span class="about__location-text">{{ profile.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
