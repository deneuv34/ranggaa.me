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
  animateOnScroll('#contact .contact-animate', { y: 20, duration: 0.5, stagger: 0.1 })
})
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__inner">
      <h2 class="contact__heading contact-animate">Let's work together</h2>
      <p class="contact__subtitle contact-animate">
        Open to new opportunities and interesting collaborations.
      </p>

      <div class="contact__links contact-animate">
        <a
          v-for="link in profile.contact"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact__link"
        >
          <component :is="iconMap[link.icon]" class="contact__link-icon" :size="16" />
          {{ link.label }}
        </a>
      </div>

      <p class="contact__phone contact-animate">{{ profile.phone }}</p>
    </div>

    <div class="contact__footer contact-animate">
      <p class="contact__copyright">
        © {{ new Date().getFullYear() }} {{ profile.name }}
      </p>
    </div>
  </section>
</template>
