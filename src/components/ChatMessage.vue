<template>
  <div class="flex items-center">
    <span class="font-semibold mr-1">{{ username }}:</span>
    <span>
      <template v-for="(word, index) in words" :key="index">
        <img
            v-if="emotesData[word.toLowerCase()]"
            :src="emotesData[word.toLowerCase()]"
            :alt="word"
            class="h-8 w-8 inline align-middle"
            @load="notifyContentChanged"
        />
        <span v-else>{{ word }}</span>
        <span v-if="index < words.length - 1"> </span>
      </template>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { emotesData } from '../assets/data/emotes';

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

    function notifyContentChanged() {
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
