<!-- src/components/TimelineItem.vue -->
<template>
  <div
      class="flex items-start space-x-4 opacity-0 transform translate-y-4 animate-fadeInUp group"
      :style="{ animationDelay: delay + 'ms' }"
  >
    <div class="flex-shrink-0">
      <div class="bg-kick-green text-white p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-105">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
    </div>
    <div>
      <h4 class="text-xl font-semibold mb-1">{{
          title
        }}</h4>
      <p class="text-md text-kick-text-muted">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed, 
} from 'vue';
import {
  CogIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  BriefcaseIcon,
} from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'TimelineItem',
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const iconComponent = computed(() => {
      switch (props.icon) {
        case 'gear':
          return CogIcon;
        case 'code':
          return CodeBracketIcon;
        case 'framework':
          return PuzzlePieceIcon;
        case 'contractor':
          return BriefcaseIcon;
        default:
          return CogIcon;
      }
    });

    return {
      iconComponent,
    };
  },
});
</script>

<style scoped>
/* Fade-in animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
