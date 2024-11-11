<!-- src/components/Chat.vue -->

<template>
  <div class="bg-kick-bg rounded-lg p-2 h-64 overflow-y-auto">
    <!-- Chat Header -->
    <div class="border-b border-kick-border pb-2 mb-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages -->
    <div class="text-white text-sm">
      <div
          v-for="(message, index) in displayedChatMessages"
          :key="index"
          class="mb-1"
      >
        <span class="font-semibold mr-1">{{ message.username }}:</span>
        <span v-html="message.text"></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed } from 'vue';
import { chatMessages, startChatSimulation, stopChatSimulation } from '../chatLogic';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'Chat',
  setup() {
    const donationStore = useDonationStore();

    onMounted(() => {
      startChatSimulation();
    });

    onUnmounted(() => {
      stopChatSimulation();
    });

    const displayedChatMessages = computed(() => {
      return [
        ...donationStore.chatMessages.map((msg) => ({
          username: 'System',
          text: msg,
        })),
        ...chatMessages.value,
      ];
    });

    return { displayedChatMessages };
  },
});
</script>

<style scoped>
.emote {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
