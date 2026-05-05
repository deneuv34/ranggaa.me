<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { profile, type Skill } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'

const { animateOnScroll } = useScrollAnimation()

const categories = computed(() => {
  const map: Record<string, Skill[]> = {}
  profile.skills.forEach(skill => {
    if (!map[skill.category]) map[skill.category] = []
    map[skill.category].push(skill)
  })
  return map
})

const categoryLabels: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  cloud: 'Cloud & Infra',
  databases: 'Databases',
  tools: 'Tools',
}

onMounted(() => {
  animateOnScroll('#skills .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#skills .skill-category', { y: 30, stagger: 0.15, delay: 0.2 })
})
</script>

<template>
  <section id="skills" class="skills">
    <div class="skills__inner">
      <h2 class="skills__title section-title">
        <span class="gradient-text">Skills & Technologies</span>
      </h2>

      <div class="skills__grid">
        <div
          v-for="(skills, category) in categories"
          :key="category"
          class="skills__category glass-card skill-category"
        >
          <h3 class="skills__category-title">
            {{ categoryLabels[category as string] }}
          </h3>
          <div class="skills__tags">
            <span
              v-for="skill in skills"
              :key="skill.name"
              :class="`skills__tag skills__tag--${category}`"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
