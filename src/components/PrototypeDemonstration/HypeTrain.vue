<template>
  <div class="absolute top-0 left-0 right-0 bg-kick-bg bg-opacity-95 p-2.5 border-b border-kick-border z-20">
    <div class="relative">
      <div class="flex items-center justify-between mb-1">
        <p class="text-kick-text font-bold">
          🚂 Hype Train Level {{ donationStore.hypeTrainLevel }}
        </p>
        <p class="text-kick-text text-sm">
          Time Remaining: {{ formattedTime }}
        </p>
      </div>
      <div class="w-full bg-kick-border rounded-full h-4 relative overflow-hidden">
        <div
            class="h-4 rounded-full transition-[width] duration-500 ease-in-out bg-gradient-to-r from-[#53FC18] via-[#42c514] to-[#389d10]"
            :style="{ width: progressPercentage + '%' }"
        ></div>
        <!-- Level-Up Glow Effect -->
        <div
            v-if="levelUpAnimation"
            class="absolute inset-0 rounded-full bg-gradient-radial from-[rgba(83,252,24,0.7)] to-transparent animate-glowAnimation"
        ></div>
      </div>
    </div>
    <!-- Confetti Canvas -->
    <canvas ref="confettiCanvas" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed, watch,
} from 'vue';
import { useDonationStore } from '@/stores/donationStore';
import { useFormattedTime } from '@/composables/useFormattedTime';
import { useConfetti } from '@/composables/useConfetti';
import { useLevelUpAnimation } from '@/composables/useLevelUpAnimation';

// Constants for magic numbers
const GLOW_EFFECT_DURATION = 1000;
const FIXED_DECIMAL_PLACES = 2;

export default defineComponent({
  name: 'HypeTrain',
  setup() {
    const donationStore = useDonationStore();
    const { formattedTime } = useFormattedTime(donationStore.hypeTrainTimeRemaining);
    const { confettiCanvas, launchConfetti } = useConfetti();
    const { levelUpAnimation, triggerLevelUpAnimation } = useLevelUpAnimation();

    const progressPercentage = computed(() => donationStore.hypeTrainProgressPercentage.toFixed(FIXED_DECIMAL_PLACES));

    // Watch for level changes to trigger animations
    watch(
        () => donationStore.hypeTrainLevel,
        (newLevel, oldLevel) => {
          if (newLevel > oldLevel) {
            triggerLevelUpAnimation(GLOW_EFFECT_DURATION);
            launchConfetti();
          }
        },
    );

    return {
      donationStore,
      progressPercentage,
      formattedTime,
      levelUpAnimation,
      confettiCanvas,
    };
  },
});
</script>
