<!-- Stream.vue -->

<template>
  <div class="aspect-w-16 aspect-h-9 rounded-lg flex flex-col items-center justify-center relative">
    <!-- Use the StreamerSmiley component with the current emotion -->
    <StreamerSmiley :emotion="smileyEmotion" />

    <!-- Hypetrain Component -->
    <Hypetrain v-if="donationStore.hypeTrainActive" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import StreamerSmiley from './StreamerSmiley.vue';
import Hypetrain from './Hypetrain.vue';
import { useDonationStore } from '../stores/donationStore';

export default defineComponent({
  name: 'Stream',
  components: {
    StreamerSmiley,
    Hypetrain,
  },
  setup() {
    const donationStore = useDonationStore();
    const smileyEmotion = computed(() => donationStore.currentSmileyEmotion);
    return { smileyEmotion, donationStore };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
