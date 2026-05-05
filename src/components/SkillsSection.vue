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

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  languages: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
  frontend: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300' },
  backend: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-300' },
  cloud: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300' },
  databases: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300' },
  tools: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
}

onMounted(() => {
  animateOnScroll('#skills .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#skills .skill-category', { y: 30, stagger: 0.15, delay: 0.2 })
})
</script>

<template>
  <section id="skills" class="py-32 px-6 relative">
    <div class="max-w-5xl mx-auto">
      <h2 class="section-title font-display font-bold text-3xl md:text-5xl mb-16 text-center">
        <span class="gradient-text">Skills & Technologies</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(skills, category) in categories"
          :key="category"
          class="skill-category glass-card p-6"
        >
          <h3 class="font-display font-semibold text-base mb-4 text-gray-200">
            {{ categoryLabels[category as string] }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skills"
              :key="skill.name"
              :class="[
                'px-3 py-1.5 rounded-full text-sm font-body border cursor-default',
                'hover:scale-105 hover:shadow-lg transition-all duration-300',
                categoryColors[category as string]?.bg,
                categoryColors[category as string]?.border,
                categoryColors[category as string]?.text,
              ]"
            >
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
