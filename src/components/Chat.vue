<!-- src/components/Chat.vue -->

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
        />
        <!-- Sentinel Element -->
        <div ref="sentinel"></div>
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
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 bg-opacity-90 text-center cursor-pointer rounded animate-fadeInUp"
          @click="enableAutoScroll"
      >
        <p class="text-white text-sm">Autoscroll disabled. Click to show new messages.</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, computed, ref, watch, nextTick } from 'vue';
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
    const sentinel = ref<HTMLDivElement | null>(null);
    const isAutoScroll = ref(true);

    let observer: IntersectionObserver | null = null;

    onMounted(() => {
      startChatSimulation();
      scrollToBottom();

      if (sentinel.value && chatContainer.value) {
        observer = new IntersectionObserver(
            (entries) => {
              if (entries[0].isIntersecting) {
                isAutoScroll.value = true;
              } else {
                isAutoScroll.value = false;
              }
            },
            {
              root: chatContainer.value,
              threshold: 1.0,
            }
        );
        observer.observe(sentinel.value);
      }
    });

    onUnmounted(() => {
      stopChatSimulation();
      if (observer && sentinel.value) {
        observer.unobserve(sentinel.value);
      }
    });

    const displayedChatMessages = computed(() => chatStore.messages);

    watch(displayedChatMessages, async () => {
      if (isAutoScroll.value) {
        await nextTick();
        scrollToBottom(true); // Jump to the bottom when a new message is added and autoscroll is active
      }
    });

    function scrollToBottom(jump = false) {
      if (sentinel.value) {
        sentinel.value.scrollIntoView({ behavior: jump ? 'auto' : 'smooth' });
      }
    }

    function enableAutoScroll() {
      isAutoScroll.value = true;
      scrollToBottom(true); // Instantly scroll to the bottom when clicking the disclaimer
    }

    function onScroll() {
      if (chatContainer.value && sentinel.value) {
        const isAtBottom =
            chatContainer.value.scrollHeight - chatContainer.value.scrollTop <= chatContainer.value.clientHeight + 10;

        isAutoScroll.value = isAtBottom;
      }
    }

    return {
      displayedChatMessages,
      chatContainer,
      sentinel,
      isAutoScroll,
      enableAutoScroll,
      onScroll,
    };
  },
});
</script>
