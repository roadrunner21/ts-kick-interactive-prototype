<template>
  <div class="streamer-smiley">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="100"
        height="100"
    >
      <!-- Face Background -->
      <rect x="0" y="0" width="24" height="24" fill="#FFDD67" />

      <!-- Eyes -->
      <template v-if="emotion === 'ecstatic'">
        <!-- Dollar Sign Eyes -->
        <text x="5" y="11" font-size="8" fill="#000" font-weight="bold">$</text>
        <text x="13" y="11" font-size="8" fill="#000" font-weight="bold">$</text>
      </template>
      <template v-else>
        <!-- Consistent Eyes for Other Emotions -->
        <circle cx="8" cy="8" r="2" fill="#000" />
        <circle cx="16" cy="8" r="2" fill="#000" />
      </template>

      <!-- Mouth -->
      <!-- Money Eyes (Big Smile) -->
      <path
          v-if="emotion === 'ecstatic'"
          d="M4 12 Q12 24, 20 12"
          stroke="#000"
          stroke-width="1"
          fill="none"
      />
      <!-- Very Happy -->
      <path
          v-else-if="emotion === 'very-happy'"
          d="M6 14 Q12 22, 18 14"
          stroke="#000"
          stroke-width="1"
          fill="none"
      />
      <!-- Happy -->
      <path
          v-else-if="emotion === 'happy'"
          d="M8 16 Q12 20, 16 16"
          stroke="#000"
          stroke-width="1"
          fill="none"
      />
      <!-- Sad -->
      <path
          v-else-if="emotion === 'sad'"
          d="M8 18 Q12 14, 16 18"
          stroke="#000"
          stroke-width="1"
          fill="none"
      />
      <!-- Neutral -->
      <circle
          v-else
          cx="12"
          cy="16"
          r="1.5"
          fill="#000"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type EmotionType = 'happy' | 'very-happy' | 'ecstatic' | 'neutral' | 'sad';

export default defineComponent({
  name: 'StreamerSmiley',
  props: {
    emotion: {
      type: String as PropType<EmotionType>,
      default: 'neutral',
      validator: (value: string): boolean => {
        return ['happy', 'very-happy', 'ecstatic', 'neutral', 'sad'].includes(value);
      },
    },
  },
});
</script>

<style scoped>
.streamer-smiley {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
