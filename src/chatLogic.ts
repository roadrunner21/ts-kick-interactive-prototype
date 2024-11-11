// src/chatLogic.ts

import { ref, computed } from 'vue';
import chatMessagesData from './assets/data/chatMessages.json';
import usernamesData from './assets/data/usernames.json';
import emotesData from './assets/data/emotes.json'; // TypeScript infers the type from JSON
import { useDonationStore } from './stores/donationStore';

const chatMessages = ref<any[]>([]);
const messageInterval = ref(2000); // Default interval

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
    // No need for casting; TypeScript infers emotesData as a dictionary of strings
    if (emotesData[word as keyof typeof emotesData]) {
      return `<img src="${emotesData[word as keyof typeof emotesData]}" alt="${word}" class="emote">`;
    }
    return word;
  });
}

function addChatMessage() {
  const sentimentMessages = chatMessagesData.filter(
    (msg) => msg.sentiment === currentSentiment.value
  );
  const randomMessage =
    sentimentMessages[Math.floor(Math.random() * sentimentMessages.length)];
  const randomUsername =
    usernamesData[Math.floor(Math.random() * usernamesData.length)];

  const processedMessage = replaceEmotes(randomMessage.text);

  chatMessages.value.push({
    username: randomUsername,
    text: processedMessage,
  });

  if (chatMessages.value.length > 100) {
    chatMessages.value.shift();
  }
}

let chatIntervalId: number;

function startChatSimulation() {
  chatIntervalId = setInterval(addChatMessage, messageInterval.value);
}

function stopChatSimulation() {
  clearInterval(chatIntervalId);
}

export function updateMessageInterval(newInterval: number) {
  messageInterval.value = newInterval;
  stopChatSimulation();
  startChatSimulation();
}

