<!-- src/components/HeroSection.vue -->

<template>
  <section class="relative flex flex-col items-center justify-center text-center py-40 bg-black vhs-effect-strong">
    <!-- Content -->
    <div class="relative z-10 animate-fadeIn">
      <!-- Title -->
      <h1 class="text-5xl md:text-6xl font-kickPixel text-kick-highlight mb-4 glitch-text" v-glitch>
        Elevating Kick
      </h1>

      <!-- Description -->
      <p class="text-lg md:text-xl text-white max-w-3xl mx-auto">
        Leveraging innovation to enhance Kick's community features, boost viewer engagement, and empower creators with cutting-edge tools.
      </p>
      <!-- Call-to-Action Button -->
      <button @click="scrollToNextSection" class="btn-primary mt-6">
        Explore My Vision
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