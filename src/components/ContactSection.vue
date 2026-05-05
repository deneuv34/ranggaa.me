<script setup lang="ts">
import { onMounted } from 'vue'
import { profile } from '../data/profile'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import { Mail, Linkedin, Github, Gitlab } from 'lucide-vue-next'
import { markRaw, type Component } from 'vue'

const { animateOnScroll } = useScrollAnimation()

const iconMap: Record<string, Component> = {
  mail: markRaw(Mail),
  linkedin: markRaw(Linkedin),
  github: markRaw(Github),
  gitlab: markRaw(Gitlab),
}

onMounted(() => {
  animateOnScroll('#contact .section-title', { y: 40, duration: 0.6 })
  animateOnScroll('#contact .contact-link', { y: 30, stagger: 0.1, delay: 0.2 })
})
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__inner">
      <h2 class="contact__title section-title">
        <span class="gradient-text">Let's Connect</span>
      </h2>
      <p class="contact__subtitle">
        Open to opportunities and collaborations
      </p>

      <div class="contact__links">
        <a
          v-for="link in profile.contact"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact__link glass-card contact-link"
        >
          <component
            :is="iconMap[link.icon]"
            class="contact__link-icon"
            :size="28"
          />
          <span class="contact__link-label">{{ link.label }}</span>
        </a>
      </div>

      <p class="contact__phone">{{ profile.phone }}</p>
    </div>

    <div class="contact__footer">
      <p class="contact__copyright">
        © {{ new Date().getFullYear() }} {{ profile.name }}. Built with Vue & ❤️
      </p>
    </div>
  </section>
</template>
