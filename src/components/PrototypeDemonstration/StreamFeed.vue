<template>
  <div class="aspect-w-16 aspect-h-9 rounded-lg vhs-effect bg-inspiration-bg">
    <div class="flex flex-col items-center justify-center ">
    <!-- Streamer's Emotive Reaction -->
    <StreamerSmiley :emotion="smileyEmotion" />

    </div>
    <div>
    <!-- Stream Overlay -->
    <StreamOverlay />
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed,
} from 'vue';
import { useSentimentStore } from '@/stores/sentimentStore';
import StreamOverlay from "@/components/PrototypeDemonstration/StreamOverlay.vue";
import StreamerSmiley from "@/components/PrototypeDemonstration/StreamerSmiley.vue";

export default defineComponent({
  name: 'StreamFeed',
  components: {
    StreamerSmiley,
    StreamOverlay,
  },
  setup() {
    const sentimentStore = useSentimentStore();
    const smileyEmotion = computed(() => sentimentStore.currentSmileyEmotion);

    return {
      smileyEmotion,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed as Tailwind is used for styling */
</style>
