// src/chatLogic.ts

import {
 ref, computed, 
} from 'vue';
import type { Pinia } from 'pinia';
import { chatMessagesData } from '@/data/chatMessages';
import { usernamesData } from '@/data/usernames';
import { useChatStore } from './stores/chatStore';
import { useSentimentStore } from './stores/sentimentStore';

// Define ChatLogicType
export interface ChatLogicType {
  startChatSimulation: () => void;
  stopChatSimulation: () => void;
  updateMessageInterval: (newInterval: number) => void;
}

// Constants
const DEFAULT_MESSAGE_INTERVAL = 2000;

/**
 * Adds a chat message based on the current sentiment.
 * @param {string} currentSentiment - The current sentiment value.
 * @param {ReturnType<typeof useChatStore>} chatStore - The chat store instance.
 */
function addChatMessage(
  currentSentiment: string,
  chatStore: ReturnType<typeof useChatStore>,
): void {
  const sentimentMessages = chatMessagesData.filter(
    (msg) => msg.sentiment === currentSentiment,
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
 * Creates chat logic for managing chat simulations.
 * @param {Pinia} pinia - The Pinia instance for state management.
 * @returns {ChatLogicType} An object containing methods to control chat simulation.
 */
export function createChatLogic(pinia: Pinia): ChatLogicType {
  const chatStore = useChatStore(pinia);
  const sentimentStore = useSentimentStore(pinia);

  const messageInterval = ref<number>(DEFAULT_MESSAGE_INTERVAL);
  let chatIntervalId: number | null = null;

  const currentSentiment = computed(() => sentimentStore.currentSentiment);

  /**
   * Starts the chat simulation by setting an interval to add messages.
   */
  function startChatSimulation(): void {
    if (chatIntervalId !== null) return;
    chatIntervalId = window.setInterval(() => {
      addChatMessage(currentSentiment.value, chatStore);
    }, messageInterval.value);
  }

  /**
   * Stops the chat simulation by clearing the message interval.
   */
  function stopChatSimulation(): void {
    if (chatIntervalId !== null) {
      clearInterval(chatIntervalId);
      chatIntervalId = null;
    }
  }

  /**
   * Updates the interval at which chat messages are added and restarts the simulation.
   * @param {number} newInterval - The new interval time in milliseconds.
   */
  function updateMessageInterval(newInterval: number): void {
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
