import { defineStore } from 'pinia';
import { useChatStore } from './chatStore';

// Constants for magic numbers
const HYPE_TRAIN_GOAL_INITIAL = 100;
const HYPE_TRAIN_TIME_INITIAL = 20; // 20 seconds countdown
const HYPE_TRAIN_LEVEL_UP_FACTOR = 1.5;
const HYPE_TRAIN_COOLDOWN_TIME = 60000; // 1 minute cooldown
const INTERVAL_DELAY = 1000; // 1000 ms (1 second)
const PERCENTAGE_MULTIPLIER = 100; // For percentage calculations

export const useDonationStore = defineStore('donation', {
  state: () => ({
    totalDonation: 0,
    hypeTrainActive: false,
    hypeTrainLevel: 0,
    hypeTrainProgress: 0,
    hypeTrainGoal: HYPE_TRAIN_GOAL_INITIAL,
    hypeTrainTimeRemaining: HYPE_TRAIN_TIME_INITIAL,
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
      this.hypeTrainGoal = HYPE_TRAIN_GOAL_INITIAL;
      this.hypeTrainTimeRemaining = HYPE_TRAIN_TIME_INITIAL; // 20 seconds countdown

      this.hypeTrainIntervalId = window.setInterval(() => {
        if (this.hypeTrainTimeRemaining > 0) {
          this.hypeTrainTimeRemaining--;
        } else {
          this.endHypeTrain();
        }
      }, INTERVAL_DELAY);

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
      this.hypeTrainGoal = Math.round(this.hypeTrainGoal * HYPE_TRAIN_LEVEL_UP_FACTOR); // Multiply by 1.5
      this.hypeTrainTimeRemaining = HYPE_TRAIN_TIME_INITIAL; // Reset to 20 seconds

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
      }, HYPE_TRAIN_COOLDOWN_TIME); // 1 minute cooldown
    },

    resetHypeTrain() {
      // Optional: If you need to reset Hype Train manually
      this.hypeTrainActive = false;
      this.hypeTrainLevel = 0;
      this.hypeTrainProgress = 0;
      this.hypeTrainGoal = HYPE_TRAIN_GOAL_INITIAL;
      this.hypeTrainTimeRemaining = HYPE_TRAIN_TIME_INITIAL;
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
      return (state.hypeTrainProgress / state.hypeTrainGoal) * PERCENTAGE_MULTIPLIER; // Use the constant for percentage
    },
  },
});
