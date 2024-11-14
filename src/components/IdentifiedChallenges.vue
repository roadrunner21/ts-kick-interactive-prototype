<!-- src/components/IdentifiedChallenges.vue -->

<template>
  <section class="py-20 px-4 bg-kick-bg">
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">Identified Challenges</h2>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Community Engagement Gaps -->
      <div>
        <h3 class="text-2xl font-semibold mb-2">Community Engagement Gaps</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Missing interactive tools like hypetrains and channel points.</li>
          <li>Lack of chat enhancements such as emote autocomplete.</li>
        </ul>
      </div>
      <!-- Event Participation Difficulties -->
      <div>
        <h3 class="text-2xl font-semibold mb-2">Event Participation Difficulties</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Challenges in keeping viewers engaged during long events.</li>
          <li>Reliance on external platforms like Discord for event updates.</li>
        </ul>
      </div>
      <!-- User Retention Issues -->
      <div>
        <h3 class="text-2xl font-semibold mb-2">User Retention Issues</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Missing features like VOD continuation and timestamp syncing.</li>
        </ul>
      </div>
      <!-- Collaboration Features -->
      <div>
        <h3 class="text-2xl font-semibold mb-2">Collaboration Features</h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Lack of multistream support for streamer collaborations.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: 'IdentifiedChallenges',
};
</script>

<style scoped>
/* Scoped styles for IdentifiedChallenges */
</style>
