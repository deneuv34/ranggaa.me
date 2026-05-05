<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { Sun, Moon } from 'lucide-vue-next'

const { isDark, toggle } = useTheme()
const isScrolled = ref(false)
const activeSection = ref('hero')
const isMobileMenuOpen = ref(false)

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'companies', label: 'Companies' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  for (const section of [...sections].reverse()) {
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
  <nav class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <div class="nav__inner">
      <button @click="scrollTo('hero')" class="nav__logo gradient-text">
        RA
      </button>

      <div class="nav__links">
        <button
          v-for="section in sections.slice(1)"
          :key="section.id"
          @click="scrollTo(section.id)"
          class="nav__link"
          :class="{ 'nav__link--active': activeSection === section.id }"
        >
          {{ section.label }}
          <span class="nav__link-indicator" />
        </button>

        <button @click="toggle" class="nav__theme-toggle" aria-label="Toggle theme">
          <Sun v-if="isDark" class="nav__theme-icon nav__theme-icon--sun" />
          <Moon v-else class="nav__theme-icon nav__theme-icon--moon" />
        </button>
      </div>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="nav__mobile-btn"
        aria-label="Toggle menu"
      >
        <div>
          <span class="nav__hamburger-line" :class="{ 'nav__hamburger-line--open-top': isMobileMenuOpen }" />
          <span class="nav__hamburger-line" :class="{ 'nav__hamburger-line--open-mid': isMobileMenuOpen }" style="margin-top: 6px;" />
          <span class="nav__hamburger-line" :class="{ 'nav__hamburger-line--open-bot': isMobileMenuOpen }" style="margin-top: 6px;" />
        </div>
      </button>
    </div>

    <div class="nav__mobile-menu" :class="{ 'nav__mobile-menu--open': isMobileMenuOpen }">
      <button
        v-for="section in sections.slice(1)"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="nav__mobile-link"
        :class="{ 'nav__mobile-link--active': activeSection === section.id }"
      >
        {{ section.label }}
      </button>
      <button @click="toggle" class="nav__mobile-link">
        {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </div>
  </nav>
</template>
