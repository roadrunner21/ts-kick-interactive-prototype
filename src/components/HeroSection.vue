<template>
  <section class="relative flex flex-col items-center justify-center text-center h-screen bg-black vhs-effect-strong"
  >
    <!-- Content -->
    <div class="relative z-10 animate-fadeIn">
      <!-- Title -->
      <h1 class="text-5xl md:text-6xl font-kickPixel text-kick-highlight mb-8 glitch-text" v-glitch>
        Elevating Kick
      </h1>

      <!-- Description -->
      <p class="text-lg md:text-xl text-white mb-4 max-w-3xl mx-auto">
        I'm excited to share some ideas on how we can enhance Kick's community features, boost viewer engagement, and empower creators with innovative tools.
      </p>
      <!-- Call-to-Action Button -->
      <button @click="$emit('scroll-down')" class="btn-primary mt-6">
        Dive into My Vision
      </button>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 animate-bounceSlow">
      <button @click="$emit('scroll-down')">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>
