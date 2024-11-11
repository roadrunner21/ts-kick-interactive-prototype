// src/chatLogic.ts

import { ref, computed } from 'vue';
import { chatMessagesData } from './assets/data/chatMessages';
import { usernamesData } from './assets/data/usernames';
import { useDonationStore } from './stores/donationStore';
import { useChatStore } from './stores/chatStore';

const messageInterval = ref(2000); // Default interval in milliseconds

// Determine the sentiment based on hype train state
const currentSentiment = computed(() => {
  const donationStore = useDonationStore();
  if (donationStore.hypeTrainActive) {
    return 'positive';
  } else if (donationStore.hypeTrainEndedRecently) {
    return 'negative';
  } else {
    return 'neutral';
  }
});

// Add a new raw chat message to the chat store
function addChatMessage() {
  const chatStore = useChatStore();
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

// Start the simulation of chat messages
export function startChatSimulation() {
  chatIntervalId = window.setInterval(addChatMessage, messageInterval.value);
}

// Stop the chat message simulation
export function stopChatSimulation() {
  clearInterval(chatIntervalId);
}

// Update the message interval dynamically
export function updateMessageInterval(newInterval: number) {
  messageInterval.value = newInterval;
  stopChatSimulation();
  startChatSimulation();
}
