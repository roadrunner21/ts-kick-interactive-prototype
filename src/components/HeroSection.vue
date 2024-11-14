<!-- src/components/HeroSection.vue -->

<template>
  <section class="relative flex flex-col items-center justify-center text-center py-40 bg-hero-pattern bg-cover bg-center">
    <!-- Overlay for readability -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="relative z-10 animate-fadeIn">
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-white">
        Elevating Kick's Community Engagement and Event Experience
      </h1>
      <p class="text-2xl md:text-3xl mb-6 text-white">
        Innovative Solutions to Enhance Streamer and Viewer Interactions
      </p>
      <button @click="scrollToNextSection" class="btn-primary mt-6">
        Learn More
      </button>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 animate-bounceSlow">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
  setup(): { scrollToNextSection: () => void } {
    const scrollToNextSection = (): void => {
      const nextSection = document.getElementById('about-me');
      nextSection?.scrollIntoView({
 behavior: 'smooth', 
});
    };

    return {
      scrollToNextSection,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
