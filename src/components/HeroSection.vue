<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useTypingEffect } from '../composables/useTypingEffect'

const { displayText, isComplete } = useTypingEffect(profile.tagline, 40, 1200)

const isLoaded = ref(false)
const showButtons = ref(false)
const showScroll = ref(false)

onMounted(() => {
  setTimeout(() => { isLoaded.value = true }, 300)
  setTimeout(() => { showButtons.value = true }, 1800)
  setTimeout(() => { showScroll.value = true }, 2200)
})

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Animated Gradient Blob -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-20 blur-3xl pointer-events-none animate-blob"
      style="background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa, #6366f1); background-size: 400% 400%; animation: blob 15s infinite, gradient-shift 8s ease infinite;"
    />

    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl">
      <!-- Name -->
      <h1
        class="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 transition-all duration-700 ease-out"
        :class="isLoaded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-[0.85] translate-y-4'"
      >
        <span class="gradient-text">{{ profile.name }}</span>
      </h1>

      <!-- Typing Tagline -->
      <div class="h-16 md:h-12 flex items-center justify-center">
        <p class="font-body text-base md:text-lg lg:text-xl text-gray-400">
          {{ displayText }}<span
            class="inline-block w-0.5 h-5 bg-primary-400 ml-1"
            :class="isComplete ? 'animate-pulse opacity-0' : 'animate-pulse'"
          />
        </p>
      </div>

      <!-- CTA Buttons -->
      <div
        class="flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-700 ease-out"
        :class="showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
      >
        <button
          @click="scrollToContact"
          class="group relative px-8 py-3.5 rounded-full font-body font-medium text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          <span class="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-[length:200%_100%] animate-gradient-shift" />
          <span class="relative">Get in Touch</span>
        </button>
        <a
          href="/resume.pdf"
          target="_blank"
          class="px-8 py-3.5 rounded-full font-body font-medium border border-white/20 hover:border-primary-400/50 hover:bg-white/5 hover:scale-[1.03] transition-all duration-300"
        >
          Download Resume
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700"
      :class="showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    >
      <div class="animate-bounce-slow">
        <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>
