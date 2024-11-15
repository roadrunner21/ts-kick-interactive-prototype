<!-- src/components/AdditionalIdeas.vue -->

<template>
  <section class="py-20 px-4 bg-black text-kick-text">
    <h2 class="section-heading">Additional Ideas</h2>
    <div class="max-w-3xl mx-auto space-y-8">
      <!-- Ideas -->
      <div v-for="(idea, index) in ideas" :key="index" class="text-center animate-fadeIn">
        <h3 class="text-2xl font-semibold mb-2">{{ idea.title }}</h3>
        <p>{{ idea.description }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
 defineComponent, ref, 
} from 'vue';

export default defineComponent({
  name: 'AdditionalIdeas',
  setup() {
    // Define ideas using ref to be reactive
    const ideas = ref([
      {
        title: 'AI Integration for Translations',
        description: 'Implementing AI-powered real-time translations to enhance accessibility for global audiences.',
      },
      {
        title: 'Advanced Analytics Dashboard',
        description: 'Providing streamers with deeper insights into viewer engagement and stream performance.',
      },
    ]);

    return {
      ideas,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
