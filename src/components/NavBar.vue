<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

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
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-black/70 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <button
        @click="scrollTo('hero')"
        class="font-display font-bold text-xl gradient-text"
      >
        RA
      </button>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <button
          v-for="section in sections.slice(1)"
          :key="section.id"
          @click="scrollTo(section.id)"
          class="relative text-sm font-body text-gray-400 hover:text-white transition-colors group"
          :class="{ '!text-white': activeSection === section.id }"
        >
          {{ section.label }}
          <span
            class="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
            :class="activeSection === section.id ? 'w-full' : 'w-0 group-hover:w-full'"
          />
        </button>

        <!-- Theme Toggle -->
        <button
          @click="toggle"
          class="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300 overflow-hidden"
          aria-label="Toggle theme"
        >
          <svg
            v-if="isDark"
            class="w-5 h-5 text-yellow-400 transition-transform duration-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-primary-400 transition-transform duration-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden w-10 h-10 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <div class="space-y-1.5">
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ 'opacity-0': isMobileMenuOpen }"
          />
          <span
            class="block w-6 h-0.5 bg-white transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
          />
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4"
    >
      <button
        v-for="section in sections.slice(1)"
        :key="section.id"
        @click="scrollTo(section.id)"
        class="block w-full text-left text-gray-400 hover:text-white transition-colors py-2"
        :class="{ '!text-white': activeSection === section.id }"
      >
        {{ section.label }}
      </button>
      <button @click="toggle" class="block w-full text-left text-gray-400 hover:text-white py-2">
        {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
    </div>
  </nav>
</template>
