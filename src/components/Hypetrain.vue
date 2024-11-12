<!-- src/components/Hypetrain.vue -->
<template>
  <div class="hype-train-container">
    <div class="hype-train-content">
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
            class="hype-train-progress h-4 rounded-full transition-width duration-500"
            :style="{ width: progressPercentage + '%' }"
        ></div>
        <!-- Level-Up Glow Effect -->
        <div
            v-if="levelUpAnimation"
            class="absolute top-0 left-0 w-full h-full rounded-full level-up-glow"
        ></div>
      </div>
    </div>
    <!-- Confetti Canvas -->
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
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

<style scoped>
.hype-train-container {
  position: absolute; /* Ensure it floats above the chat */
  top: 0; /* Align with chat header */
  left: 0;
  right: 0;
  background-color: rgba(20, 21, 23, 0.95); /* kick-bg with opacity */
  padding: 10px;
  border-bottom: 1px solid #E5E7EB; /* kick-border */
  z-index: 20; /* Higher than chat to float above */
}

.hype-train-content {
  position: relative;
}

.hype-train-progress {
  background: linear-gradient(
      to right,
      #53FC18, /* Kick green */
      #42c514 50%, /* Darker Kick green in the middle */
      #389d10 /* Slightly darker green toward the end */
  );
  transition: width 0.5s ease-in-out; /* Smooth width transition */
}

.level-up-glow {
  background: radial-gradient(circle, rgba(83, 252, 24, 0.7), transparent);
  animation: glowAnimation 1s ease-out;
}

@keyframes glowAnimation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
