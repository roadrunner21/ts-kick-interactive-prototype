<template>
  <div class="bg-kick-bg rounded-lg flex flex-col h-full relative">
    <!-- Chat Header -->
    <div class="border-b border-kick-border p-2">
      <p class="text-white font-semibold">Chat</p>
    </div>
    <!-- Chat Messages - Scrollable Content -->
    <div
        ref="chatContainer"
        class="flex-1 overflow-y-auto p-2"
        @scroll="onScroll"
    >
      <div class="text-white text-sm space-y-1">
        <ChatMessage
            v-for="(message, index) in displayedChatMessages"
            :key="index"
            :username="message.username"
            :text="message.text"
            @contentChanged="handleContentChange"
        />
      </div>
    </div>
    <!-- Autoscroll Notification -->
    <transition
        enter-active-class="transition-opacity duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-500"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="!isAutoScroll"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 bg-opacity-90 text-center cursor-pointer rounded"
          @click="enableAutoScroll"
      >
        <p class="text-white text-sm">Autoscroll disabled. Click to show new messages.</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  ref,
  watch,
  nextTick,
  onBeforeUpdate,
  onUpdated,
} from 'vue';
import { startChatSimulation, stopChatSimulation } from '../chatLogic';
import { useChatStore } from '../stores/chatStore';
import ChatMessage from './ChatMessage.vue';
import type { ChatMessage as ChatMessageType } from '../stores/chatStore';

export default defineComponent({
  name: 'Chat',
  components: {
    ChatMessage,
  },
  setup() {
    const chatStore = useChatStore();
    const chatContainer = ref<HTMLDivElement | null>(null);
    const isAutoScroll = ref(true);

    const displayedChatMessages = computed(() => chatStore.messages);

    // References to track previous messages and height of removed message
    const previousMessages = ref<ChatMessageType[]>([]);
    const previousFirstMessageHeight = ref(0);

    // ResizeObserver to handle dynamic content changes (e.g., image loads)
    const resizeObserver = new ResizeObserver(() => {
      if (isAutoScroll.value) {
        scrollToBottom();
      }
    });

    // Function to scroll to the bottom of the chat
    function scrollToBottom() {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    }

    // Enable auto-scroll and scroll to bottom
    function enableAutoScroll() {
      isAutoScroll.value = true;
      scrollToBottom();
    }

    // Handle user scroll to determine auto-scroll status
    function onScroll() {
      if (chatContainer.value) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
        const buffer = 50; // Buffer in pixels

        // Determine if the user is near the bottom
        isAutoScroll.value = scrollTop + clientHeight >= scrollHeight - buffer;
      }
    }

    // Handle content changes (e.g., image loads)
    function handleContentChange() {
      if (isAutoScroll.value) {
        nextTick(scrollToBottom);
      }
    }

    // Before the update, check if a message is about to be removed
    onBeforeUpdate(() => {
      if (previousMessages.value.length > displayedChatMessages.value.length) {
        // A message is about to be removed from the top
        if (chatContainer.value) {
          const firstMessage = chatContainer.value.querySelector('.chat-message');
          if (firstMessage) {
            previousFirstMessageHeight.value = firstMessage.getBoundingClientRect().height;
          }
        }
      }
    });

    // After the update, adjust scrollTop if a message was removed
    onUpdated(() => {
      if (previousMessages.value.length > displayedChatMessages.value.length) {
        if (chatContainer.value) {
          chatContainer.value.scrollTop -= previousFirstMessageHeight.value;
        }
      }
      // Update previousMessages to current messages
      previousMessages.value = displayedChatMessages.value.slice();
    });

    // Watch for new messages to auto-scroll if enabled
    watch(displayedChatMessages, async () => {
      if (isAutoScroll.value) {
        await nextTick();
        scrollToBottom();
      }
    });

    // Initialize chat simulation and observe container
    onMounted(() => {
      startChatSimulation();
      scrollToBottom();

      if (chatContainer.value) {
        resizeObserver.observe(chatContainer.value);
      }
      previousMessages.value = displayedChatMessages.value.slice();
    });

    // Cleanup on component unmount
    onUnmounted(() => {
      stopChatSimulation();
      if (chatContainer.value) {
        resizeObserver.unobserve(chatContainer.value);
      }
    });

    return {
      displayedChatMessages,
      chatContainer,
      isAutoScroll,
      enableAutoScroll,
      onScroll,
      handleContentChange,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
