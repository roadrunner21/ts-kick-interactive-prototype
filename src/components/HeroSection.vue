<!-- src/components/HeroSection.vue -->

<template>
  <section
      class="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-kick-bg to-kick-highlight">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Empowering Kick with Innovative Solutions</h1>
    <p class="text-xl md:text-2xl mb-6">Enhancing community engagement and event experiences</p>
    <img
        src="https://media.licdn.com/dms/image/v2/C5603AQGIuEhmmO6TpA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1661158419356?e=1736985600&v=beta&t=D3FvE_U8GaAGP8kvonIVCvNsADZUO-xSjzMwsbwqCnM"
        alt="Your Name" class="w-32 h-32 rounded-full mb-4">
    <button @click="scrollToNextSection"
            class="bg-kick-highlight text-kick-bg py-2 px-4 rounded hover:bg-kick-highlight-hover">
      Learn More
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
  setup(): { scrollToNextSection: () => void } {
    // Function to scroll to the next section
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