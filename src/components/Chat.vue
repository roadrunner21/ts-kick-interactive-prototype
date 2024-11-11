<!-- Chat.vue -->

<template>
  <div class="bg-kick-bg rounded-lg p-2 h-64 overflow-y-auto">
    <!-- Chat Header -->
    <div class="border-b border-kick-border pb-2 mb-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages Placeholder -->
    <p class="text-white text-center">Chat</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Chat',
});
</script>

<style scoped>
/* Component-specific styles (if any) */
</style>
