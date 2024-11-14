<!-- src/components/ProposedSolutions.vue -->

<template>
  <section class="py-20 px-4 bg-kick-bg text-kick-text">
    <h2 class="section-heading">Proposed Solutions</h2>
    <div class="max-w-4xl mx-auto space-y-12">
      <!-- Solutions -->
      <div v-for="(solution, index) in solutions" :key="index" class="md:flex md:items-center animate-fadeIn">
        <!-- Image -->
        <div class="md:w-1/2 mb-6 md:mb-0 md:mr-8">
          <img :src="solution.image" alt="" class="w-full rounded shadow-lg">
        </div>
        <!-- Content -->
        <div class="md:w-1/2">
          <h3 class="text-2xl font-semibold mb-2">{{ solution.title }}</h3>
          <p>{{ solution.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
 defineComponent, ref, 
} from 'vue';

export default defineComponent({
  name: 'ProposedSolutions',
  setup() {
    // Define solutions as a ref to make it reactive
    const solutions = ref([
      {
        title: 'Stream Overlay Feature',
        image: 'https://placehold.co/600x400.png',
        description: 'Real-time event-specific overlays and a marketplace for custom overlays to engage independent developers.',
      },
      {
        title: 'Ban Appeals System',
        image: 'https://placehold.co/600x400.png',
        description: 'Streamlined process for viewers to appeal bans directly through the platform.',
      },
      {
        title: 'Multistream Support',
        image: 'https://placehold.co/600x400.png',
        description: 'Enable viewers to watch multiple streams simultaneously, enhancing collaboration between streamers.',
      },
      {
        title: 'VOD Continuation and Timestamp Syncing',
        image: 'https://placehold.co/600x400.png',
        description: 'Allow viewers to resume watching from where they left off, improving user retention.',
      },
      {
        title: 'Chat Autocomplete',
        image: 'https://placehold.co/600x400.png',
        description: 'Enhance chat interactions with emote and username autocomplete functionality.',
      },
    ]);

    return {
      solutions,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
