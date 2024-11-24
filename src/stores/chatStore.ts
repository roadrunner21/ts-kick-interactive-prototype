import { v4 as uuidv4 } from 'uuid';
import { defineStore } from 'pinia';

export interface ChatMessage {
  id: string;
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
    addMessage(message: Omit<ChatMessage, 'id'>) {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        ...message,
      };
      this.messages.push(newMessage);
      if (this.messages.length > MAX_MESSAGES) {
        this.messages.shift();
      }
    },
    addSystemMessage(text: string) {
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
    recentMessages: (state) => state.messages.slice(-RECENT_MESSAGES_COUNT),
  },
});
