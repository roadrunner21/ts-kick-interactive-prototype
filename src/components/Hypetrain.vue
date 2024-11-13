<!-- src/components/Hypetrain.vue -->
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
import { defineComponent, computed, watch, ref } from 'vue';
import { useDonationStore } from '../stores/donationStore';
import * as confetti from 'canvas-confetti'; // Import as namespace

export default defineComponent({
  name: 'Hypetrain',
  setup() {
    const donationStore = useDonationStore();
    const progressPercentage = computed(() =>
        donationStore.hypeTrainProgressPercentage.toFixed(2)
    );
    const formattedTime = computed(() => {
      const minutes = Math.floor(donationStore.hypeTrainTimeRemaining / 60);
      const seconds = donationStore.hypeTrainTimeRemaining % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    const levelUpAnimation = ref(false);
    const confettiCanvas = ref<HTMLCanvasElement | null>(null);

    // Watch for level changes to trigger animations
    watch(
        () => donationStore.hypeTrainLevel,
        (newLevel, oldLevel) => {
          if (newLevel > oldLevel) {
            triggerLevelUpAnimation();
            launchConfetti();
          }
        }
    );

    function triggerLevelUpAnimation() {
      levelUpAnimation.value = true;
      setTimeout(() => {
        levelUpAnimation.value = false;
      }, 1000); // Duration of the glow effect
    }

    function launchConfetti() {
      if (confettiCanvas.value) {
        const myConfetti = confetti.create(confettiCanvas.value, {
          resize: true,
          useWorker: true,
        });
        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#53FC18', '#42c514'], // Kick colors
        });
      }
    }

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
