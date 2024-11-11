<!-- src/components/Chat.vue -->

<template>
  <div class="bg-kick-bg rounded-lg flex flex-col h-full">
    <!-- Chat Header -->
    <div class="border-b border-kick-border p-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages - Scrollable Content -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-2">
      <div class="text-white text-sm space-y-1">
        <ChatMessage
            v-for="(message, index) in displayedChatMessages"
            :key="index"
            :username="message.username"
            :text="message.text"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { startChatSimulation, stopChatSimulation } from '../chatLogic';
import { useChatStore } from '../stores/chatStore';
import ChatMessage from './ChatMessage.vue';

export default defineComponent({
  name: 'Chat',
  components: {
    ChatMessage,
  },
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

    const displayedChatMessages = computed(() => chatStore.messages);

    watch(displayedChatMessages, () => {
      scrollToBottom();
    });

    function scrollToBottom() {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    return { displayedChatMessages, chatContainer };
  },
});
</script>

