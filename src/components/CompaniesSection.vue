<script setup lang="ts">
import { profile } from '../data/profile'

const marqueeLogos = [...profile.featuredCompanies, ...profile.featuredCompanies, ...profile.featuredCompanies, ...profile.featuredCompanies]
</script>

<template>
  <section id="companies" class="companies">
    <div class="companies__inner">
      <p class="section-label companies__label">Trusted by</p>

      <div class="companies__track-wrapper">
        <div class="companies__fade-left" />
        <div class="companies__fade-right" />

        <div class="companies__track">
          <img
            v-for="(company, i) in marqueeLogos"
            :key="`${company.name}-${i}`"
            :src="company.logo"
            :alt="company.name"
            class="companies__logo"
          />
        </div>
      </div>
    </div>
  </section>
</template>
