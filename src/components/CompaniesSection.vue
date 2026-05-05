<script setup lang="ts">
import { profile } from '../data/profile'
</script>

<template>
  <section id="companies" class="companies">
    <div class="companies__inner">
      <p class="section-label companies__label">Built products at</p>

      <div class="companies__logos">
        <img
          v-for="company in profile.featuredCompanies"
          :key="company.name"
          :src="company.logo"
          :alt="company.name"
          class="companies__logo"
        />
      </div>
    </div>
  </section>
</template>
