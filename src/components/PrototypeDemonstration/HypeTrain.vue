<template>
  <transition
      enter-active-class="transition-transform duration-500 ease-in-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-transform duration-500 ease-in-out"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
  >
    <div
        v-if="isVisible"
        class="absolute top-0 left-0 right-0 bg-kick-bg bg-opacity-95 p-2 border-b border-kick-border z-20 text-xs"
    >
      <div class="relative overflow-hidden">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-1">
          <p class="text-kick-text font-bold">
            🚂 Hype Train Level {{ donationStore.hypeTrainLevel }}
          </p>
          <p class="text-kick-text">
            Time Remaining: {{ formattedTime }}
          </p>
        </div>

        <!-- Progress Bar with Milestones -->
        <div class="w-full bg-kick-border rounded-full h-2 relative overflow-hidden">
          <!-- Progress Indicator -->
          <div
              class="h-2 rounded-full transition-all duration-500 ease-in-out transform"
              :class="currentTheme?.progressBarClass"
              :style="{ width: progressPercentage + '%' }"
          ></div>

          <!-- Level-Up Glow Effect -->
          <div
              v-if="levelUpAnimation"
              class="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse"
          ></div>

          <!-- Milestone Pointers -->
          <div
              v-for="milestone in activeMilestones"
              :key="milestone.percentage"
              class="absolute top-0 h-2 w-px cursor-pointer group opacity-50"
              :class="currentTheme?.milestoneClass"
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

        <!-- Top Donators Section -->
        <div class="mt-2 flex flex-wrap text-kick-text">
          <div class="font-semibold w-full mr-2">Top Contributors:</div>
          <div class="flex flex-wrap flex-1 justify-between ">
            <div
                v-for="donator in topDonators"
                :key="donator.username"
                class="flex mr-2 mb-1 text-xs"
            >
              <span class="font-bold mr-1">{{ donator.username }}</span>
              <span>{{ donator.amount }}</span>
            </div>
          </div>
        </div>
        <!-- Emoji Animation -->
        <div v-if="showAnimation" class="absolute inset-0 flex items-center justify-center">
          <div class="text-3xl animate-bounce">
            {{ currentEmoji }}
          </div>
        </div>

        <!-- Confetti Canvas -->
        <canvas ref="confettiCanvas" class="absolute inset-0 pointer-events-none"></canvas>
      </div>
    </div>

  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
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
    const { confettiCanvas, launchConfetti } = useConfetti();
    const { levelUpAnimation, triggerLevelUpAnimation } = useLevelUpAnimation();

    // Constants
    const SECOND = 1000;
    const PERCENT_MAX = 100;
    const MINUTES_DIVISOR = 60;
    const DECIMAL_PLACES = 2;

    // Themes
    const themes = [
      {
        level: 1,
        progressBarClass: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
        milestoneClass: 'bg-blue-500',
      },
      {
        level: 2,
        progressBarClass: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
        milestoneClass: 'bg-green-500',
      },
      {
        level: 3,
        progressBarClass: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
        milestoneClass: 'bg-purple-500',
      },
    ];

    // Milestones
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

    // Reactive States
    const showAnimation = ref(false);
    const currentEmoji = ref('🎉');
    const topDonators = ref([
      {
        username: 'Eddie', amount: '$100',
      },
      {
        username: 'DankMemer', amount: '$30',
      },
      {
        username: 'GamerGuy', amount: '$20',
      },
    ]);

    const isVisible = ref(donationStore.hypeTrainActive);

    // Reactive Computed Properties
    const progressPercentage = computed(() =>
        parseFloat(donationStore.hypeTrainProgressPercentage.toFixed(DECIMAL_PLACES)),
    );

    const currentTheme = computed(() => {
      const themeIndex = (donationStore.hypeTrainLevel - 1) % themes.length;
      return themes[themeIndex];
    });

    const formattedTime = computed(() => {
      const minutes = Math.floor(donationStore.hypeTrainTimeRemaining / MINUTES_DIVISOR);
      const seconds = donationStore.hypeTrainTimeRemaining % MINUTES_DIVISOR;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    const activeMilestones = computed(() =>
        milestones.value.filter((milestone) => !milestone.reached),
    );

    // Functions
    const resetMilestones = (): void => {
      milestones.value = milestoneTemplates.map((milestone) => ({
        ...milestone,
        reached: false,
      }));
    };

    const triggerMilestone = (milestone: Milestone): void => {
      const EMOJI_VISIBLE_SECONDS = 3000;

      if (!milestone.reached) {
        milestone.reached = true;
        currentEmoji.value = milestone.emoji;
        launchConfetti();
        showAnimation.value = true;
        setTimeout(() => {
          showAnimation.value = false;
        }, EMOJI_VISIBLE_SECONDS); // Hide emoji after 3 seconds
      }
    };

    // Watchers
    watch(
        () => donationStore.hypeTrainActive,
        (newVal) => {
          isVisible.value = newVal;
        },
        {
          immediate: true,
        },
    );

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
      isVisible,
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
      topDonators,
    };
  },
});
</script>
