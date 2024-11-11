<!-- Hypetrain.vue -->

<template>
  <div class="absolute top-0 w-full p-4">
    <div class="bg-gray-800 bg-opacity-75 rounded-lg p-2">
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold">Hype Train Level {{ donationStore.hypeTrainLevel }}</p>
        <p class="text-sm">Time Remaining: {{ formattedTime }}</p>
      </div>
      <div class="w-full bg-gray-600 rounded-full h-4 mt-2">
        <div
            class="bg-kick-highlight h-4 rounded-full transition-all duration-500"
            :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'Hypetrain',
  setup() {
    const donationStore = useDonationStore();
    const progressPercentage = computed(() => donationStore.hypeTrainProgressPercentage.toFixed(2));
    const formattedTime = computed(() => {
      const minutes = Math.floor(donationStore.hypeTrainTimeRemaining / 60);
      const seconds = donationStore.hypeTrainTimeRemaining % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });
    return { donationStore, progressPercentage, formattedTime };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
