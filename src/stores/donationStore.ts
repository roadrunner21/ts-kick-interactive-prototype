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
    hypeTrainTimeRemaining: 0,
    hypeTrainIntervalId: null as null | number,
    // Removed chatMessages and channelPoints
    hypeTrainEndedRecently: false,
    hypeTrainEndTimeoutId: null as null | number,
  }),

  actions: {
    addDonation(amount: number) {
      this.totalDonation += amount;

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: `User123 donated $${amount}!`,
      });

      // If you decide to keep channel points, manage them here
      // this.channelPoints += amount; // Example: 1 point per dollar donated

      if (!this.hypeTrainActive) {
        this.startHypeTrain();
      }
      this.updateHypeTrainProgress(amount);
    },

    redeemChannelPoints(): boolean {
      // If channel points are removed, you can delete this method
      // Otherwise, implement logic here
      // if (this.channelPoints >= points) {
      //   this.channelPoints -= points;
      //   return true;
      // }
      return false;
    },

    startHypeTrain() {
      this.hypeTrainActive = true;
      this.hypeTrainLevel = 1;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = 100;
      this.hypeTrainTimeRemaining = 300; // 5 minutes in seconds

      this.hypeTrainIntervalId = window.setInterval(() => {
        if (this.hypeTrainTimeRemaining > 0) {
          this.hypeTrainTimeRemaining--;
        } else {
          this.endHypeTrain();
        }
      }, 1000);
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
      this.hypeTrainTimeRemaining = 300; // Reset to 5 minutes

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: `Hype Train reached Level ${this.hypeTrainLevel}!`,
      });
    },

    endHypeTrain() {
      this.hypeTrainActive = false;
      this.hypeTrainLevel = 0;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = 100;
      if (this.hypeTrainIntervalId !== null) {
        clearInterval(this.hypeTrainIntervalId);
        this.hypeTrainIntervalId = null;
      }

      const chatStore = useChatStore();
      chatStore.addMessage({
        username: 'System',
        text: 'Hype Train has ended.',
      });

      this.hypeTrainEndedRecently = true;

      this.hypeTrainEndTimeoutId = window.setTimeout(() => {
        this.hypeTrainEndedRecently = false;
        this.hypeTrainEndTimeoutId = null;
      }, 60000); // 1 minute cooldown
    },
  },

  getters: {
    hypeTrainProgressPercentage(state) {
      return (state.hypeTrainProgress / state.hypeTrainGoal) * 100;
    },

    currentSmileyEmotion(state) {
      if (!state.hypeTrainActive) {
        return 'neutral';
      } else if (state.hypeTrainLevel >= 3) {
        return 'ecstatic';
      } else if (state.hypeTrainLevel === 2) {
        return 'very-happy';
      } else if (state.hypeTrainLevel === 1) {
        return 'happy';
      } else {
        return 'neutral';
      }
    },
  },
});
