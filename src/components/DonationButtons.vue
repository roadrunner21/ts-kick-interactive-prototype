<template>
  <div class="flex flex-wrap justify-center gap-4">
    <button
        class="bg-green-500 text-white py-2 px-4 rounded shadow hover:bg-green-600"
        @click="donate(5)"
    >
      Donate $5
    </button>
    <button
        class="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
        @click="donate(20)"
    >
      Donate $20
    </button>
    <button
        class="bg-purple-500 text-white py-2 px-4 rounded shadow hover:bg-purple-600"
        @click="donate(100)"
    >
      Donate $100
    </button>
    <button
        class="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
        @click="donate(500)"
    >
      Donate $500
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'DonationButtons',
  setup() {
    const donationStore = useDonationStore();

    function donate(amount: number) {
      donationStore.addDonation(amount);
    }

    return { donate };
  },
});
</script>

<style scoped>
/* Component-specific styles (if any) */
</style>
