<!-- src/components/Stream.vue -->

<template>
  <div class="aspect-w-16 aspect-h-9 rounded-lg flex flex-col items-center justify-center relative">
    <StreamerSmiley :emotion="smileyEmotion" />
    <Hypetrain v-if="donationStore.hypeTrainActive" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import StreamerSmiley from './StreamerSmiley.vue';
import Hypetrain from './Hypetrain.vue';
import { useDonationStore } from '../stores/donationStore';
import { useSentimentStore } from '../stores/sentimentStore';

export default defineComponent({
  name: 'Stream',
  components: {
    StreamerSmiley,
    Hypetrain,
  },
  setup() {
    const donationStore = useDonationStore();
    const sentimentStore = useSentimentStore();
    const smileyEmotion = computed(() => sentimentStore.currentSmileyEmotion);

    return { smileyEmotion, donationStore };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
