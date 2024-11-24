<template>
  <div class="bg-kick-bg rounded-lg flex flex-col relative">
    <!-- Chat Header -->
    <div class="border-b border-kick-border p-2">
      <p class="text-white font-semibold text-center">Chat</p>
    </div>

    <!-- Main Content Area -->
    <div class="relative flex flex-1 overflow-hidden">
      <!-- Hype Train (if active) -->
      <HypeTrain class="absolute top-0 left-0 right-0 z-10"/>

      <!-- Chat Messages Container -->
      <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-2 sm:p-4 min-h-[600px] max-h-[600px]"
          @scroll="onScroll"
          tabindex="0"
      >
        <!-- Chat Messages -->
        <div class="text-white text-sm space-y-1">
          <ChatMessage
              v-for="(message) in displayedChatMessages"
              :key="message.id"
              :username="message.username"
              :text="message.text"
              @contentChanged="handleContentChange"
          />
        </div>
      </div>
    </div>

    <!-- Autoscroll Disabled Disclaimer -->
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
          role="button"
          tabindex="0"
          @click="enableAutoScroll"
          @keydown.enter="enableAutoScroll"
      >
        <p class="text-white text-sm">
          Autoscroll disabled. Click to show new messages.
        </p>
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
  inject,
} from 'vue';
import { useChatStore } from '@/stores/chatStore';
import { useDonationStore } from '@/stores/donationStore';
import type { ChatLogicType } from '@/chatLogic';
import { useChatScroll } from "@/composables/useChatScroll";
import HypeTrain from "@/components/PrototypeDemonstration/HypeTrain.vue";
import ChatMessage from './ChatMessage.vue';

export default defineComponent({
  name: 'StreamChat',
  components: {
    ChatMessage,
    HypeTrain,
  },
  setup() {
    const chatLogic = inject<ChatLogicType>('chatLogic');
    if (!chatLogic) throw new Error('chatLogic not provided');

    const chatStore = useChatStore();
    const donationStore = useDonationStore();
    const chatContainer = ref<HTMLDivElement | null>(null);
    const displayedChatMessages = computed(() => chatStore.messages);

    const {
      isAutoScroll,
      scrollToBottom,
      enableAutoScroll,
      onScroll,
      handleContentChange,
    } = useChatScroll(chatContainer);

    watch(
        () => displayedChatMessages.value.length,
        async () => {
          if (isAutoScroll.value) {
            await nextTick();
            scrollToBottom();
          }
        },
        {
          immediate: false, flush: 'post',
        },
    );


    onMounted(() => {
      chatLogic.startChatSimulation();
      scrollToBottom();
    });

    onUnmounted(() => {
      chatLogic.stopChatSimulation();
    });

    return {
      displayedChatMessages,
      chatContainer,
      isAutoScroll,
      enableAutoScroll,
      onScroll,
      handleContentChange,
      donationStore,
    };
  },
});
</script>
