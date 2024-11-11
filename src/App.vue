<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100">
    <!-- Donation Buttons Outside the Prototype Box -->
    <div class="w-full p-4 bg-white shadow-md text-center">
      <h1 class="text-2xl font-semibold mb-4">Support the Streamer</h1>
      <DonationButtons />
    </div>


    <!-- Main Container: Stream and Chat -->
    <div class="flex w-full max-w-7xl border border-gray-300 rounded-lg shadow-lg bg-white mt-4">
      <!-- Stream and Chat Layout -->
      <div class="flex w-full">
        <!-- Stream Component -->
        <div class="w-2/3 p-4">
          <Stream />
        </div>
        <!-- Chat Component -->
        <div class="w-1/3 p-4 border-l border-gray-200">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Stream from './components/Stream.vue';
import Chat from './components/Chat.vue';
import DonationButtons from './components/DonationButtons.vue';

export default defineComponent({
  name: 'App',
  components: {
    Stream,
    Chat,
    DonationButtons,
  },
});
</script>

<style>
/* Global styles (if needed) */
</style>
