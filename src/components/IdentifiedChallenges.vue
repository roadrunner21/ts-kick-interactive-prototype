<!-- src/components/IdentifiedChallenges.vue -->

<template>
  <section class="py-20 px-4 bg-kick-bg text-kick-text">
    <h2 class="section-heading">Identified Challenges</h2>
    <div class="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
      <!-- Challenges -->
      <div v-for="(challenge, index) in challenges" :key="index" class="flex items-start animate-fadeIn">
        <!-- Icon -->
        <div class="flex-shrink-0 mr-4">
          <img :src="challenge.icon" alt="" class="h-12 w-12">
        </div>
        <!-- Content -->
        <div>
          <h3 class="text-2xl font-semibold mb-2">{{ challenge.title }}</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li v-for="(item, idx) in challenge.points" :key="idx">{{ item }}</li>
          </ul>
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
  name: 'IdentifiedChallenges',
  setup() {
    // Define challenges array with ref for reactivity
    const challenges = ref([
      {
        title: 'Community Engagement Gaps',
        icon: 'https://placehold.co/64x64.png',
        points: [
          'Missing interactive tools like hypetrains and channel points.',
          'Lack of chat enhancements such as emote autocomplete.',
        ],
      },
      {
        title: 'Event Participation Difficulties',
        icon: 'https://placehold.co/64x64.png',
        points: [
          'Challenges in keeping viewers engaged during long events.',
          'Reliance on external platforms like Discord for event updates.',
        ],
      },
      {
        title: 'User Retention Issues',
        icon: 'https://placehold.co/64x64.png',
        points: ['Missing features like VOD continuation and timestamp syncing.'],
      },
      {
        title: 'Collaboration Features',
        icon: 'https://placehold.co/64x64.png',
        points: ['Lack of multistream support for streamer collaborations.'],
      },
    ]);

    return {
      challenges,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
