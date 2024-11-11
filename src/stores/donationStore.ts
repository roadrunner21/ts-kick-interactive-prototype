import { defineStore } from 'pinia';

export const useDonationStore = defineStore('donation', {
  // Define the state
  state: () => ({
    totalDonation: 0,
  }),

  // Define actions to modify the state
  actions: {
    addDonation(amount: number) {
      this.totalDonation += amount;
    },
  },
});
