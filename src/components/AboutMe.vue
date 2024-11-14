<!-- src/components/AboutMe.vue -->

<template>
  <section id="about-me" class="py-20 px-4 bg-kick-bg text-kick-text">
    <div class="container mx-auto flex flex-col md:flex-row items-center">
      <!-- Image -->
      <div class="md:w-1/3 mb-8 md:mb-0 md:mr-8 flex justify-center animate-fadeIn">
        <img src="https://placehold.co/300x300.png" alt="Your Name" class="w-64 h-64 rounded-full object-cover">
      </div>
      <!-- Text -->
      <div class="md:w-2/3">
        <h2 class="section-heading">About Me</h2>
        <p class="text-lg leading-relaxed">
          I am a software developer with over a decade of experience specializing in <span class="text-kick-highlight font-semibold">JavaScript</span> across the stack, particularly in frontend development with React and Vue...
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AboutMe',
};
</script>

<style scoped>
/* No additional styles needed */
</style>
