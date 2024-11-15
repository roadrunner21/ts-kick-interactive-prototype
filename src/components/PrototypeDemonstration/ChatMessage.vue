<template>
  <div class="flex items-center">
    <span class="font-semibold mr-1">{{ username }}:</span>
    <span>
      <span v-for="(word, index) in words" :key="index">
        <img
            v-if="emotesData[word.toLowerCase()]"
            :src="emotesData[word.toLowerCase()]"
            :alt="word"
            class="h-8 w-8 inline align-middle"
            @load="notifyContentChanged"
        />
        <span v-else>{{ word }}</span>
        <span v-if="index < words.length - 1"> </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed, 
} from 'vue';
import { emotesData } from '@/data/emotes'; // Updated import using alias

export default defineComponent({
  name: 'ChatMessage',
  props: {
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const words = computed(() => props.text.split(/(\s+)/));

    /**
     * Emits an event to notify that the content has changed.
     */
    function notifyContentChanged(): void {
      emit('contentChanged');
    }

    return {
      words,
      emotesData,
      notifyContentChanged,
    };
  },
});
</script>

<style scoped>
/* No additional styles needed */
</style>
