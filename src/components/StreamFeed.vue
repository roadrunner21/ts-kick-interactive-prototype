<template>
  <div class="aspect-w-16 aspect-h-9 rounded-lg flex flex-col items-center justify-center relative vhs-effect">
    <StreamerSmiley :emotion="smileyEmotion" />
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed, 
} from 'vue';
import StreamerSmiley from './StreamerSmiley.vue';
import { useSentimentStore } from '@/stores/sentimentStore';

export default defineComponent({
  name: 'StreamFeed',
  components: {
    StreamerSmiley,
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
/* No additional styles needed */
</style>
