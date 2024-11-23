<template>
  <div class="absolute top-0 left-0 right-0 bg-kick-bg bg-opacity-95 p-4 border-b border-kick-border z-20">
    <div class="relative">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-2">
        <p class="text-kick-text font-bold text-lg">
          🚂 Hype Train Level {{ donationStore.hypeTrainLevel }}
        </p>
        <p class="text-kick-text text-sm">
          Time Remaining: {{ formattedTime }}
        </p>
      </div>

      <!-- Progress Bar with Milestones -->
      <div class="w-full bg-kick-border rounded-full h-4 relative overflow-hidden">
        <!-- Progress Indicator -->
        <div
            class="h-4 rounded-full transition-all duration-500 ease-in-out"
            :class="currentTheme.progressBarClass"
            :style="{ width: progressPercentage + '%' }"
        ></div>

        <!-- Level-Up Glow Effect -->
        <div
            v-if="levelUpAnimation"
            class="absolute inset-0 rounded-full bg-gradient-to-r from-kick-highlight via-transparent to-transparent animate-glow"
        ></div>

        <!-- Milestone Pointers -->
        <div
            v-for="milestone in activeMilestones"
            :key="milestone.percentage"
            class="absolute top-0 h-4 w-1 bg-kick-highlight cursor-pointer group"
            :style="{ left: milestone.percentage + '%' }"
        >
          <!-- Tooltip -->
          <div
              class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {{ milestone.label }}
          </div>
        </div>
      </div>

      <!-- Interactive Animations -->
      <div v-if="showAnimation" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="text-kick-highlight text-4xl animate-pulse">{{ currentEmoji }}</div>
      </div>
    </div>

    <!-- Confetti Canvas -->
    <canvas ref="confettiCanvas" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
} from 'vue';
import { useDonationStore } from '@/stores/donationStore';
import { useConfetti } from '@/composables/useConfetti';
import { useLevelUpAnimation } from '@/composables/useLevelUpAnimation';

interface Milestone {
  label: string;
  percentage: number;
  reached: boolean;
  emoji: string;
}

export default defineComponent({
  name: 'HypeTrain',
  setup() {
    const donationStore = useDonationStore();
    const {confettiCanvas, launchConfetti} = useConfetti();
    const {levelUpAnimation, triggerLevelUpAnimation} = useLevelUpAnimation();

    const SECOND = 1000;
    const PERCENT_MAX = 100;
    const MINUTES_DIVISOR = 60;
    const DECIMAL_PLACES = 2;

    const themes = [
      {
        level: 1,
        progressBarClass: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
      },
      {
        level: 2,
        progressBarClass: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
      },
      {
        level: 3,
        progressBarClass: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
      },
    ];

    const milestoneTemplates: Milestone[] = [
      {
        label: 'Milestone 1', percentage: 25, reached: false, emoji: '🎉',
      },
      {
        label: 'Milestone 2', percentage: 50, reached: false, emoji: '🎊',
      },
      {
        label: 'Milestone 3', percentage: 75, reached: false, emoji: '🔥',
      },
      {
        label: 'Milestone 4', percentage: PERCENT_MAX, reached: false, emoji: '🚀',
      },
    ];

    const milestones = ref([...milestoneTemplates]);
    const showAnimation = ref(false);
    const currentEmoji = ref('🎉');

    const progressPercentage = computed(() =>
        parseFloat(donationStore.hypeTrainProgressPercentage.toFixed(DECIMAL_PLACES)),
    );

    const currentTheme = computed(() =>
        themes.find((theme) => theme.level === donationStore.hypeTrainLevel) || themes[0],
    );

    const formattedTime = computed(() => {
      const minutes = Math.floor(donationStore.hypeTrainTimeRemaining / MINUTES_DIVISOR);
      const seconds = donationStore.hypeTrainTimeRemaining % MINUTES_DIVISOR;
      return `${minutes}:${seconds.toString().padStart(DECIMAL_PLACES, '0')}`;
    });

    const activeMilestones = computed(() =>
        milestones.value.filter((milestone) => !milestone.reached),
    );

    const resetMilestones = (): void => {
      milestones.value = milestoneTemplates.map((milestone) => ({
        ...milestone,
        reached: false,
      }));
    };

    const triggerMilestone = (milestone: Milestone): void => {
      if (!milestone.reached) {
        milestone.reached = true;
        currentEmoji.value = milestone.emoji;
        launchConfetti();
        showAnimation.value = true;
        setTimeout(() => (showAnimation.value = false), SECOND);
      }
    };

    watch(progressPercentage, (newProgress) => {
      milestones.value.forEach((milestone) => {
        if (newProgress >= milestone.percentage && !milestone.reached) {
          triggerMilestone(milestone);
        }
      });
    });

    watch(
        () => donationStore.hypeTrainLevel,
        (newLevel, oldLevel) => {
          if (newLevel > oldLevel) {
            triggerLevelUpAnimation(SECOND);
            launchConfetti();
            resetMilestones();
          }
        },
    );

    return {
      donationStore,
      progressPercentage,
      currentTheme,
      formattedTime,
      activeMilestones,
      showAnimation,
      confettiCanvas,
      levelUpAnimation,
      currentEmoji,
      triggerMilestone,
    };
  },
});
</script>
