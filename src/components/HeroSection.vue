<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'
import { useTypingEffect } from '../composables/useTypingEffect'
import { ArrowDown } from 'lucide-vue-next'

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
  <section id="hero" class="hero">
    <div class="hero__blob" />

    <div class="hero__content">
      <h1
        class="hero__name"
        :class="isLoaded ? 'hero__name--visible' : 'hero__name--hidden'"
      >
        <span class="gradient-text">{{ profile.name }}</span>
      </h1>

      <div class="hero__tagline-wrapper">
        <p class="hero__tagline">
          {{ displayText }}<span
            class="hero__cursor"
            :class="{ 'hero__cursor--done': isComplete }"
          />
        </p>
      </div>

      <div
        class="hero__cta"
        :class="showButtons ? 'hero__cta--visible' : 'hero__cta--hidden'"
      >
        <button @click="scrollToContact" class="hero__btn-primary">
          <span class="hero__btn-primary-bg" />
          <span class="hero__btn-primary-text">Get in Touch</span>
        </button>
        <a href="/resume.pdf" target="_blank" class="hero__btn-secondary">
          Download Resume
        </a>
      </div>
    </div>

    <div
      class="hero__scroll"
      :class="showScroll ? 'hero__scroll--visible' : 'hero__scroll--hidden'"
    >
      <ArrowDown class="hero__scroll-icon" />
    </div>
  </section>
</template>
