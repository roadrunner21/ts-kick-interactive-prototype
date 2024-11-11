// src/stores/donationStore.ts

import { defineStore } from 'pinia';

export const useDonationStore = defineStore('donation', {
  state: () => ({
    totalDonation: 0,
    hypeTrainActive: false,
    hypeTrainLevel: 0,
    hypeTrainProgress: 0,
    hypeTrainGoal: 100,
    hypeTrainTimeRemaining: 0,
    hypeTrainIntervalId: null as null | number,
    chatMessages: [] as string[],
    hypeTrainEndedRecently: false,
    hypeTrainEndTimeoutId: null as null | number
  }),

  actions: {
    addDonation(amount: number) {
      this.totalDonation += amount;
      this.chatMessages.push(`User123 donated $${amount}!`);

      if (!this.hypeTrainActive) {
        this.startHypeTrain();
      }
      this.updateHypeTrainProgress(amount);
    },

    startHypeTrain() {
      this.hypeTrainActive = true;
      this.hypeTrainLevel = 1;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = 100;
      this.hypeTrainTimeRemaining = 300;

      this.hypeTrainIntervalId = setInterval(() => {
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
      this.hypeTrainTimeRemaining = 300;
      this.chatMessages.push(`Hype Train reached Level ${this.hypeTrainLevel}!`);
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
      this.chatMessages.push('Hype Train has ended.');
      this.hypeTrainEndedRecently = true;

      this.hypeTrainEndTimeoutId = setTimeout(() => {
        this.hypeTrainEndedRecently = false;
        this.hypeTrainEndTimeoutId = null;
      }, 60000);
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
