<!-- src/components/PrototypeDemonstration/PrototypeComponent.vue -->
<template>
  <div class="border border-kick-border rounded-lg overflow-hidden">
    <!-- Donation Buttons Section -->
    <div class="flex flex-wrap justify-center p-4 border-b border-kick-border">
      <DonationButtons />
    </div>

    <!-- Main Prototype Layout -->
    <div class="flex flex-col lg:flex-row w-full">
      <!-- Stream Component -->
      <div class="w-full lg:w-2/3 p-4 flex flex-col">
        <StreamFeed />
      </div>

      <!-- Chat Component -->
      <div class="w-full lg:w-1/3 p-4 border-t lg:border-t-0 lg:border-l border-kick-border flex flex-col">
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
