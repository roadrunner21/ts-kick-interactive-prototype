// src/stores/donationStore.ts

import { defineStore } from 'pinia';
import { useChatStore } from './chatStore';

export const useDonationStore = defineStore('donation', {
  state: () => ({
    totalDonation: 0,
    hypeTrainActive: false,
    hypeTrainLevel: 0,
    hypeTrainProgress: 0,
    hypeTrainGoal: 100,
    hypeTrainTimeRemaining: 20, // Start with 20 seconds
    hypeTrainIntervalId: null as null | number,
    hypeTrainCooldownId: null as null | number,
    hypeTrainEndedRecently: false,
  }),

  actions: {
    addDonation(amount: number) {
      this.totalDonation += amount;
      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'User123',
        text: `donated $${amount}!`,
      });

      if (!this.hypeTrainActive && !this.hypeTrainEndedRecently) {
        this.startHypeTrain();
      }
      if (this.hypeTrainActive) {
        this.updateHypeTrainProgress(amount);
      }
    },

    startHypeTrain() {
      this.hypeTrainActive = true;
      this.hypeTrainLevel = 1;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = 100;
      this.hypeTrainTimeRemaining = 20; // 20 seconds countdown

      this.hypeTrainIntervalId = window.setInterval(() => {
        if (this.hypeTrainTimeRemaining > 0) {
          this.hypeTrainTimeRemaining--;
        } else {
          this.endHypeTrain();
        }
      }, 1000);

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: `🚂 Hype Train has started!`,
      });
    },

    updateHypeTrainProgress(amount: number) {
      this.hypeTrainProgress += amount;
      if (this.hypeTrainProgress >= this.hypeTrainGoal) {
        this.levelUpHypeTrain();
      }
    },

    levelUpHypeTrain() {
      this.hypeTrainLevel++;
      this.hypeTrainProgress -= this.hypeTrainGoal;
      this.hypeTrainGoal = Math.round(this.hypeTrainGoal * 1.5);
      this.hypeTrainTimeRemaining = 20; // Reset to 20 seconds

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: `🎉 Hype Train reached Level ${this.hypeTrainLevel}!`,
      });
    },

    endHypeTrain() {
      this.hypeTrainActive = false;
      if (this.hypeTrainIntervalId !== null) {
        clearInterval(this.hypeTrainIntervalId);
        this.hypeTrainIntervalId = null;
      }

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: '🚂 Hype Train has ended.',
      });

      this.hypeTrainEndedRecently = true;
      this.hypeTrainCooldownId = window.setTimeout(() => {
        this.hypeTrainEndedRecently = false;
        this.hypeTrainCooldownId = null;
      }, 60000); // 1 minute cooldown
    },

    resetHypeTrain() {
      // Optional: If you need to reset Hype Train manually
      this.hypeTrainActive = false;
      this.hypeTrainLevel = 0;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = 100;
      this.hypeTrainTimeRemaining = 20;
      if (this.hypeTrainIntervalId !== null) {
        clearInterval(this.hypeTrainIntervalId);
        this.hypeTrainIntervalId = null;
      }
      if (this.hypeTrainCooldownId !== null) {
        clearTimeout(this.hypeTrainCooldownId);
        this.hypeTrainCooldownId = null;
      }
      this.hypeTrainEndedRecently = false;
    },
  },

  getters: {
    hypeTrainProgressPercentage(state) {
      return (state.hypeTrainProgress / state.hypeTrainGoal) * 100;
    },
  },
});
