<!-- Chat.vue -->

<template>
  <div class="bg-kick-bg rounded-lg p-2 h-64 overflow-y-auto">
    <!-- Chat Header -->
    <div class="border-b border-kick-border pb-2 mb-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages -->
    <div class="text-white">
      <div v-for="(message, index) in donationStore.chatMessages" :key="index" class="mb-1">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'Chat',
  setup() {
    const donationStore = useDonationStore();
    return { donationStore };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
