<!-- App.vue -->

<template>
  <div class="flex flex-col items-center min-h-screen bg-kick-bg text-kick-text">
    <!-- Header with Kick Logo -->
    <header class="w-full p-4 flex justify-start items-center">
      <img src="https://kick.com/img/kick-logo.svg" alt="Kick Logo" class="h-8">
    </header>

    <!-- Donation Buttons Section -->
    <div class="w-full p-4 text-center">
      <h1 class="text-2xl font-semibold mb-4">Support the Streamer</h1>
      <DonationButtons />
    </div>

    <!-- Main Container: Stream and Chat -->
    <div class="flex w-full max-w-7xl border border-kick-border rounded-lg bg-kick-stream-bg mt-4" style="height: 70vh;">
      <!-- Stream and Chat Layout -->
      <div class="flex w-full">
        <!-- Stream Component -->
        <div class="w-2/3 p-4 flex flex-col">
          <Stream />
        </div>
        <!-- Chat Component with Max and Min Height -->
        <div class="w-1/3 p-4 border-l border-kick-border flex flex-col min-h-0">
          <Chat />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Stream from './components/StreamFeed.vue';
import Chat from './components/StreamChat.vue';
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
/* No additional styles needed */
</style>
