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

      <div class="mt-4">
        <label for="messageRate" class="mr-2">Chat Speed:</label>
        <select id="messageRate" v-model="messageRate" @change="changeMessageRate">
          <option value="5000">Slow</option>
          <option value="2000">Normal</option>
          <option value="1000">Fast</option>
          <option value="500">Very Fast</option>
        </select>
      </div>
    </div>

    <!-- Main Container: Stream and Chat -->
    <div class="flex w-full max-w-7xl border border-kick-border rounded-lg bg-kick-stream-bg mt-4">
      <!-- Stream and Chat Layout -->
      <div class="flex w-full">
        <!-- Stream Component -->
        <div class="w-2/3 p-4">
          <Stream />
        </div>
        <!-- Chat Component -->
        <div class="w-1/3 p-4 border-l border-kick-border">
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
import { updateMessageInterval } from "./chatLogic.ts";

export default defineComponent({
  name: 'App',
  components: {
    Stream,
    Chat,
    DonationButtons,
  },
  data() {
    return {
      messageRate: '2000', // Default to Normal speed
    };
  },
  methods: {
    changeMessageRate() {
      updateMessageInterval(parseInt(this.messageRate));
    },
  },
});
</script>

<style>
/* No additional styles needed */
</style>
