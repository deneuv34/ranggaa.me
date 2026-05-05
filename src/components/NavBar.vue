<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { Sun, Moon, Menu } from 'lucide-vue-next'

const { isDark, toggle } = useTheme()
const activeSection = ref('hero')
const isMobileMenuOpen = ref(false)

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const handleScroll = () => {
  const allSections = [{ id: 'hero' }, ...sections]
  for (const section of [...allSections].reverse()) {
    const el = document.getElementById(section.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 150) {
        activeSection.value = section.id
        break
      }
    }
  }
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="nav">
    <div class="nav__inner">
      <button @click="scrollTo('hero')" class="nav__logo">
        RA
      </button>

      <div class="nav__links">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="scrollTo(section.id)"
          class="nav__link"
          :class="{ 'nav__link--active': activeSection === section.id }"
        >
          {{ section.label }}
        </button>

        <button @click="toggle" class="nav__theme-toggle" aria-label="Toggle theme">
          <Sun v-if="isDark" :size="14" />
          <Moon v-else :size="14" />
        </button>
      </div>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="nav__mobile-btn"
        aria-label="Toggle menu"
      >
        <Menu :size="16" />
      </button>
    </div>

    <div class="nav__mobile-menu" :class="{ 'nav__mobile-menu--open': isMobileMenuOpen }">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="nav__mobile-link"
        :class="{ 'nav__mobile-link--active': activeSection === section.id }"
      >
        {{ section.label }}
      </button>
      <button @click="toggle" class="nav__mobile-link">
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </div>
  </nav>
</template>
