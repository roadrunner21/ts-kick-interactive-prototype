// src/chatLogic.ts

import { ref, computed } from 'vue';
import chatMessagesData from './assets/data/chatMessages.json';
import usernamesData from './assets/data/usernames.json';
import emotesData from './assets/data/emotes.json';
import { useDonationStore } from './stores/donationStore';
import { useChatStore } from './stores/chatStore';

const messageInterval = ref(2000); // Default interval in milliseconds

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

function replaceEmotes(text: string): string {
  return text.replace(/\b\w+\b/g, (word) => {
    if (emotesData[word as keyof typeof emotesData]) {
      return `<img src="${emotesData[word as keyof typeof emotesData]}" alt="${word}" class="emote">`;
    }
    return word;
  });
}

function addChatMessage() {
  const chatStore = useChatStore();
  const sentimentMessages = chatMessagesData.filter(
    (msg) => msg.sentiment === currentSentiment.value
  );

  if (sentimentMessages.length === 0) return; // Prevent errors if no messages match

  const randomMessage =
    sentimentMessages[Math.floor(Math.random() * sentimentMessages.length)];
  const randomUsername =
    usernamesData[Math.floor(Math.random() * usernamesData.length)];

  const processedMessage = replaceEmotes(randomMessage.text);

  chatStore.addMessage({
    username: randomUsername,
    text: processedMessage,
  });
}

let chatIntervalId: number;

export function startChatSimulation() {
  chatIntervalId = window.setInterval(addChatMessage, messageInterval.value);
}

export function stopChatSimulation() {
  clearInterval(chatIntervalId);
}

export function updateMessageInterval(newInterval: number) {
  messageInterval.value = newInterval;
  stopChatSimulation();
  startChatSimulation();
}
