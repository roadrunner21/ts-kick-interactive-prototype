<!-- src/components/Inspiration.vue -->

<template>
  <section class="relative py-40 bg-inspiration-bg bg-contain bg-fixed">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <!-- Content -->
    <div class="relative z-10 max-w-3xl mx-auto text-center kick-frame text-white px-4 animate-fadeIn">
      <blockquote class="text-2xl md:text-3xl font-semibold italic">
        "Key quote or insight from Eddie's conversation with Westcol..."
      </blockquote>
      <p class="mt-4 text-lg">
        This conversation inspired me to develop solutions that align with Kick's vision.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'InspirationSection',
};
</script>

<style scoped>
/* No additional styles needed */
</style>
