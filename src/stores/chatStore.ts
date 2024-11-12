// src/stores/chatStore.ts

import { defineStore } from 'pinia';

// Define and export the ChatMessage type for use in other files
export interface ChatMessage {
  username: string;
  text: string;
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
  }),

  actions: {
    addMessage(message: ChatMessage) {
      this.messages.push(message);
      if (this.messages.length > 100) {
        this.messages.shift();
      }
    },
    addSystemMessage(text: string) {
      this.addMessage({ username: 'System', text });
    },
    clearMessages() {
      this.messages = [];
    },
  },

  getters: {
    recentMessages: (state) => state.messages.slice(-50),
  },
});
