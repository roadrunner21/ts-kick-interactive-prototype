import { defineStore } from 'pinia';

export interface ChatMessage {
  username: string;
  text: string;
}

// Maximum number of messages to store in the chat history
const MAX_MESSAGES = 100;
// Number of recent messages to display in the chat view
const RECENT_MESSAGES_COUNT = 50;

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as ChatMessage[],
  }),

  actions: {
    addMessage(message: ChatMessage) {
      this.messages.push(message);
      // Limit the message history length to avoid memory issues
      if (this.messages.length > MAX_MESSAGES) {
        this.messages.shift();
      }
    },
    addSystemMessage(text: string) {
      // Adds a system-generated message with 'System' as the username
      this.addMessage({
        username: 'System',
        text,
      });
    },
    clearMessages() {
      this.messages = [];
    },
  },

  getters: {
    // Returns the last RECENT_MESSAGES_COUNT messages
    recentMessages: (state) => state.messages.slice(-RECENT_MESSAGES_COUNT),
  },
});
