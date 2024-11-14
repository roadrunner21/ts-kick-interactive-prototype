<!-- DonationButtons.vue -->

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <button
        class="bg-kick-highlight text-kick-bg py-2 px-4 rounded hover:bg-kick-highlight-hover"
        @click="donate(5)"
    >
      Donate $5
    </button>
    <button
        class="bg-kick-highlight text-kick-bg py-2 px-4 rounded hover:bg-kick-highlight-hover"
        @click="donate(20)"
    >
      Donate $20
    </button>
    <button
        class="bg-kick-highlight text-kick-bg py-2 px-4 rounded hover:bg-kick-highlight-hover"
        @click="donate(100)"
    >
      Donate $100
    </button>
    <button
        class="bg-kick-highlight text-kick-bg py-2 px-4 rounded hover:bg-kick-highlight-hover"
        @click="donate(500)"
    >
      Donate $500
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDonationStore } from '@/stores/donationStore';

export default defineComponent({
  name: 'DonationButtons',
  setup() {
    const donationStore = useDonationStore();

    /**
     * Triggers a donation of the specified amount.
     * @param {number} amount - The donation amount in dollars.
     * @returns {void}
     */
    function donate(amount: number): void {
      donationStore.addDonation(amount);
    }

    return {
      donate,
    };
  },
});
</script>