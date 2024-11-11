<!-- Stream.vue -->

<template>
  <div class="aspect-w-16 aspect-h-9 rounded-lg flex items-center justify-center">
    <!-- Use the StreamerSmiley component with a specific emotion -->
    <StreamerSmiley emotion="neutral" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StreamerSmiley from './StreamerSmiley.vue';

export default defineComponent({
  name: 'Stream',
  components: {
    StreamerSmiley,
  },
});
</script>

<style scoped>
/* No additional styles needed as Tailwind is handling styles */
</style>
