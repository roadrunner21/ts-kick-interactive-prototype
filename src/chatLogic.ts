// src/chatLogic.ts

import { ref, computed } from 'vue';
import { chatMessagesData } from './assets/data/chatMessages';
import { usernamesData } from './assets/data/usernames';
import { useChatStore } from './stores/chatStore';
import { useSentimentStore } from './stores/sentimentStore';
import type { Pinia } from 'pinia';

const messageInterval = ref(200); // Default interval in milliseconds

let chatStore: ReturnType<typeof useChatStore>;
let sentimentStore: ReturnType<typeof useSentimentStore>;

// Initialize stores with provided pinia instance
export function initializeChatLogic(pinia: Pinia) {
  chatStore = useChatStore(pinia);
  sentimentStore = useSentimentStore(pinia);
}

const currentSentiment = computed(() => sentimentStore.currentSentiment);

function addChatMessage() {
  const sentimentMessages = chatMessagesData.filter(
    (msg) => msg.sentiment === currentSentiment.value
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

let chatIntervalId: number;

// Start chat simulation
export function startChatSimulation() {
  if (!chatStore || !sentimentStore) {
    throw new Error('Chat logic not initialized. Call initializeChatLogic(pinia) first.');
  }
  chatIntervalId = window.setInterval(addChatMessage, messageInterval.value);
}

// Stop chat simulation
export function stopChatSimulation() {
  clearInterval(chatIntervalId);
}

// Update message interval
export function updateMessageInterval(newInterval: number) {
  messageInterval.value = newInterval;
  stopChatSimulation();
  startChatSimulation();
}
