<!-- src/components/HighlightItem.vue -->
<template>
  <div class="flex items-start space-x-4 p-4 bg-kick-bg-secondary rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
    <div class="flex-shrink-0">
      <div class="bg-kick-green text-white p-3 rounded-full shadow">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>
    </div>
    <div>
      <h5 class="text-xl font-semibold">{{ title }}</h5>
      <p class="text-md text-kick-text-muted">{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, computed, 
} from 'vue';
import {
  ClockIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'HighlightItem',
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
  },
  setup(props) {
    const iconComponent = computed(() => {
      switch (props.icon) {
        case 'experience':
          return ClockIcon;
        case 'frontend':
          return ComputerDesktopIcon;
        case 'backend':
          return CircleStackIcon;
        case 'contractor':
          return UserGroupIcon;
        default:
          return ClockIcon;
      }
    });

    return {
 iconComponent, 
};
  },
});
</script>

<style scoped>
/* Optional hover effects can be added here */
</style>
