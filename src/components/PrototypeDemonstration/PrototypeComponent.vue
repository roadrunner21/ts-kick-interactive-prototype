<!-- src/components/PrototypeDemonstration/PrototypeComponent.vue -->

<template>
  <div class="border border-kick-border rounded-lg overflow-hidden">
    <!-- Donation Buttons Section within PrototypeComponent -->
    <div class="flex justify-center p-4 border-b border-kick-border">
      <DonationButtons />
    </div>

    <!-- Main Prototype Layout (Stream and Chat) -->
    <div class="flex w-full">
      <!-- Stream Component -->
      <div class="w-2/3 p-4 flex flex-col">
        <StreamFeed />
      </div>

      <!-- Chat Component with Height Limit and Scrollable Overflow -->
      <div class="w-1/3 p-4 border-l border-kick-border flex flex-col max-h-[600px] overflow-y-auto">
        <StreamChat />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StreamFeed from './StreamFeed.vue';
import StreamChat from './StreamChat.vue';
import DonationButtons from './DonationButtons.vue';

export default defineComponent({
  name: 'PrototypeComponent',
  components: {
    StreamFeed,
    StreamChat,
    DonationButtons,
  },
});
</script>

<style scoped>
/* Scoped styles for PrototypeComponent */
</style>
