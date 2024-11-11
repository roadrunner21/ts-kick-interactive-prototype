<template>
  <div class="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex items-center justify-center text-white">
    <!-- Smiley Placeholder for the stream video -->
    <StreamerSmiley emotion="neutral" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FlipperSmiley from './StreamerSmiley.vue';
import StreamerSmiley from "./StreamerSmiley.vue";

export default defineComponent({
  name: 'Stream',
  components: {
    StreamerSmiley,
    FlipperSmiley,
  },
});
</script>

<style scoped>
/* Component-specific styles (if any) */
</style>
