<!-- ChannelPoints.vue -->

<template>
  <div class="flex flex-col items-center mt-4">
    <p>Your Channel Points: {{ donationStore.channelPoints }}</p>
    <div class="flex flex-wrap justify-center gap-4 mt-2">
      <button
          class="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-500"
          @click="redeem(50)"
          :disabled="donationStore.channelPoints < 50"
      >
        Redeem 50 Points - Happy
      </button>
      <button
          class="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-500"
          @click="redeem(100)"
          :disabled="donationStore.channelPoints < 100"
      >
        Redeem 100 Points - Very Happy
      </button>
      <button
          class="bg-gray-600 text-white py-1 px-3 rounded hover:bg-gray-500"
          @click="redeem(200)"
          :disabled="donationStore.channelPoints < 200"
      >
        Redeem 200 Points - Ecstatic
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'ChannelPoints',
  setup() {
    const donationStore = useDonationStore();

    function redeem(points: number) {
      if (donationStore.redeemChannelPoints(points)) {
        // Simulate changing the smiley's emotion temporarily
        donationStore.hypeTrainActive = true;
        if (points === 50) {
          donationStore.hypeTrainLevel = 1;
        } else if (points === 100) {
          donationStore.hypeTrainLevel = 2;
        } else if (points === 200) {
          donationStore.hypeTrainLevel = 3;
        }
        // Reset back to neutral after 10 seconds
        setTimeout(() => {
          donationStore.hypeTrainActive = false;
          donationStore.hypeTrainLevel = 0;
        }, 10000);
      } else {
        alert('Not enough channel points!');
      }
    }

    return { donationStore, redeem };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
