<!-- src/components/Chat.vue -->

<template>
  <div class="bg-kick-bg rounded-lg flex flex-col h-full">
    <!-- Chat Header -->
    <div class="border-b border-kick-border p-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages - Scrollable Content -->
    <div
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-2"
    >
      <div class="text-white text-sm space-y-1">
        <div
            v-for="(message, index) in displayedChatMessages"
            :key="index"
            class="flex items-start"
        >
          <span class="font-semibold mr-1">{{ message.username }}:</span>
          <span v-html="message.text"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { startChatSimulation, stopChatSimulation } from '../chatLogic';
import { useChatStore } from '../stores/chatStore';

export default defineComponent({
  name: 'Chat',
  setup() {
    const chatStore = useChatStore();
    const chatContainer = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      startChatSimulation();
      scrollToBottom();
    });

    onUnmounted(() => {
      stopChatSimulation();
    });

    // Displayed messages directly from chatStore
    const displayedChatMessages = computed(() => chatStore.messages);

    // Watch for new messages and scroll to the bottom of the chat
    watch(displayedChatMessages, () => {
      scrollToBottom();
    });

    // Scroll to the bottom of the chat container
    function scrollToBottom() {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    return { displayedChatMessages, chatContainer };
  },
});
</script>

<style scoped>
.emote {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  display: inline;
}
</style>
