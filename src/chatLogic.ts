// src/chatLogic.ts

import {
 ref, computed, 
} from 'vue';
import type { Pinia } from 'pinia';
import { useChatStore } from './stores/chatStore';
import { useSentimentStore } from './stores/sentimentStore';
import { chatMessagesData } from './assets/data/chatMessages';
import { usernamesData } from './assets/data/usernames';

// Define ChatLogicType
export interface ChatLogicType {
  startChatSimulation: () => void;
  stopChatSimulation: () => void;
  updateMessageInterval: (newInterval: number) => void;
}

/**
 *
 * @param pinia
 */
export function createChatLogic(pinia: Pinia): ChatLogicType {
  const chatStore = useChatStore(pinia);
  const sentimentStore = useSentimentStore(pinia);

  const messageInterval = ref(2000);
  let chatIntervalId: number | null = null;

  const currentSentiment = computed(() => sentimentStore.currentSentiment);

  /**
   *
   */
  function addChatMessage() {
    const sentimentMessages = chatMessagesData.filter(
      (msg) => msg.sentiment === currentSentiment.value,
    );

    if (sentimentMessages.length === 0) return;

    const randomMessage =
      sentimentMessages[Math.floor(Math.random() * sentimentMessages.length)];
    const randomUsername =
      usernamesData[Math.floor(Math.random() * usernamesData.length)];

    chatStore.addMessage({
      username: randomUsername,
      text: randomMessage.text,
    });
  }

  /**
   *
   */
  function startChatSimulation() {
    if (chatIntervalId !== null) return;
    chatIntervalId = window.setInterval(addChatMessage, messageInterval.value);
  }

  /**
   *
   */
  function stopChatSimulation() {
    if (chatIntervalId !== null) {
      clearInterval(chatIntervalId);
      chatIntervalId = null;
    }
  }

  /**
   *
   * @param newInterval
   */
  function updateMessageInterval(newInterval: number) {
    messageInterval.value = newInterval;
    stopChatSimulation();
    startChatSimulation();
  }

  return {
    startChatSimulation,
    stopChatSimulation,
    updateMessageInterval,
  };
}
