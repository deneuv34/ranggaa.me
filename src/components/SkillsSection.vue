<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { profile, type Skill } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Code, Layout, Server, Cloud, Database, Wrench } from 'lucide-vue-next'
import { markRaw, type Component } from 'vue'

const { animateOnScroll } = useScrollAnimation()

const categories = computed(() => {
  const map: Record<string, Skill[]> = {}
  profile.skills.forEach(skill => {
    if (!map[skill.category]) map[skill.category] = []
    map[skill.category].push(skill)
  })
  return map
})

const categoryMeta: Record<string, { label: string; icon: Component }> = {
  languages: { label: 'Languages', icon: markRaw(Code) },
  frontend: { label: 'Frontend', icon: markRaw(Layout) },
  backend: { label: 'Backend', icon: markRaw(Server) },
  cloud: { label: 'Cloud & Infra', icon: markRaw(Cloud) },
  databases: { label: 'Databases', icon: markRaw(Database) },
  tools: { label: 'Tools', icon: markRaw(Wrench) },
}

onMounted(() => {
  animateOnScroll('#skills .skills-animate', { y: 20, duration: 0.5, stagger: 0.1 })
})
</script>

<template>
  <section id="skills" class="skills">
    <div class="skills__inner">
      <div class="skills__header skills-animate">
        <p class="section-label">Skills</p>
        <h2 class="section-heading">Technologies I work with</h2>
      </div>

      <div class="skills__bento">
        <div
          v-for="(skills, category) in categories"
          :key="category"
          class="skills__category card skills-animate"
        >
          <h3 class="skills__category-title">
            <component :is="categoryMeta[category as string]?.icon" class="skills__category-icon" :size="16" />
            {{ categoryMeta[category as string]?.label }}
          </h3>
          <div class="skills__tags">
            <span
              v-for="skill in skills"
              :key="skill.name"
              class="skills__tag"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
