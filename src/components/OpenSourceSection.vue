<template>
  <section class="py-20 px-4 bg-black">
    <div class="container mx-auto text-center">
      <!-- Header -->
      <h2 class="text-4xl font-bold text-kick-highlight mb-6">Dive Into the Code</h2>

      <!-- Description -->
      <p class="text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
        This entire presentation including the prototype is
        <span class="font-semibold text-kick-highlight">open source</span>! If you're curious about how I built this page using Vue and want to peek under the hood, you're in luck.
      </p>
      <p class="text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Feel free to check out the code on GitHub. It's a great way to see my development skills in action and get a sense of how I approach building scalable and maintainable applications.
      </p>

      <!-- GitHub Button -->
      <a
          href="https://github.com/roadrunner21/ts-kick-interactive-prototype"
          target="_blank"
          class="inline-flex items-center bg-kick-highlight text-black font-semibold px-6 py-3 rounded hover:bg-kick-highlight-light transition duration-300"
      >
        <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub Logo"
            class="h-6 w-6 mr-3"
        />
        Check Out the Code on GitHub
      </a>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OpenSourceSection',
});
</script>

<style scoped>
</style>
