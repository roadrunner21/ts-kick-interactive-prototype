<!-- src/components/AboutMe.vue -->

<template>
  <section id="about-me" class="py-20 px-4 bg-kick-bg text-kick-text">
    <div class="container mx-auto flex flex-col md:flex-row items-center">
      <!-- Image -->
      <div class="md:w-1/3 mb-8 md:mb-0 md:mr-8 flex justify-center animate-fadeIn">
        <img
            src="https://i.ibb.co/RS8LT7f/headshotframe-me.png"
            alt="Marco Hefti"
            class="w-64 h-64 object-cover"
        >
      </div>
      <!-- Text -->
      <div class="md:w-2/3">
        <h2 class="section-heading">About Me</h2>
        <p class="text-lg leading-relaxed">
          I am a software developer with over a decade of experience specializing in <span class="text-kick-highlight font-semibold">JavaScript</span> across the stack, particularly in frontend development with React and Vue. My career began with a 4-year apprenticeship in software development, where I developed production planning software and conducted process optimization for small to medium-sized companies. Following that, I transitioned to full-stack web development with Laravel and React. In the past five years, I've further specialized in JavaScript, focusing on Node.js, Vue, and React, while still handling some backend tasks for smaller projects.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutMe',
});
</script>

<style scoped>
/* No additional styles needed */
</style>
