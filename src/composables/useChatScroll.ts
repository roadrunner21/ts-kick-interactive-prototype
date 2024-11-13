import {
 ref, nextTick, Ref, 
} from 'vue';

interface ChatScroll {
  isAutoScroll: Ref<boolean>;
  scrollToBottom: () => void;
  enableAutoScroll: () => void;
  onScroll: () => void;
  handleContentChange: () => void;
}

/**
 * Manages auto-scrolling behavior for a chat container.
 * @param {Ref<HTMLDivElement | null>} chatContainer - Reference to the chat container DOM element.
 * @returns {ChatScroll} - State and functions to manage chat scrolling.
 */
export function useChatScroll(chatContainer: Ref<HTMLDivElement | null>): ChatScroll {
  const isAutoScroll = ref(true);

  /**
   * Scrolls the chat container to the bottom.
   */
  const scrollToBottom = (): void => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  };

  /**
   * Enables auto-scroll mode and scrolls to the bottom.
   */
  const enableAutoScroll = (): void => {
    isAutoScroll.value = true;
    scrollToBottom();
  };

  /**
   * Updates `isAutoScroll` based on scroll position.
   */
  const onScroll = (): void => {
    if (chatContainer.value) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
      const buffer = 50;
      isAutoScroll.value = scrollTop + clientHeight >= scrollHeight - buffer;
    }
  };

  /**
   * Handles content changes within the chat container and scrolls if needed.
   */
  const handleContentChange = (): void => {
    if (isAutoScroll.value) {
      nextTick().then(scrollToBottom).catch(console.error);
    }
  };

  return {
    isAutoScroll,
    scrollToBottom,
    enableAutoScroll,
    onScroll,
    handleContentChange,
  };
}
