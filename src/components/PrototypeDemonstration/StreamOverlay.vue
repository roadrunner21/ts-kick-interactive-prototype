<template>
  <div
      ref="overlay"
      class="absolute bg-kick-bg bg-opacity-90 text-kick-text p-4 rounded-lg shadow-lg cursor-move"
  :class="[
  isExpanded ? 'w-80' : 'w-64 h-12 flex items-center justify-between',
  'transform',
  ]"
  @mousedown="startDrag"
  role="button"
  tabindex="0"
  aria-label="Draggable Overlay"
  >
  <!-- Header Section -->
  <div class="flex items-center justify-between w-full">
    <h2 class="text-lg font-semibold text-kick-highlight">Event Overlay</h2>
    <button
        @click.stop="toggleExpand"
        class="text-sm text-kick-highlight hover:text-kick-highlight-hover focus:outline-none"
    >
      {{ isExpanded ? 'Minimize' : 'Expand' }}
    </button>
  </div>

  <!-- Expanded Content -->
  <div v-if="isExpanded" class="mt-4">
    <!-- Current Clue Section -->
    <div class="mb-4">
      <h3 class="text-md font-semibold text-kick-highlight">Current Clue</h3>
      <p class="text-sm">{{ currentClue }}</p>
    </div>

    <!-- Progress Section -->
    <div>
      <h3 class="text-md font-semibold text-kick-highlight">Progress</h3>
      <ul class="space-y-1">
        <li
            v-for="(clue, index) in clues"
            :key="index"
            class="flex items-center"
        >
            <span
                class="h-2 w-2 rounded-full mr-2"
                :class="clue.solved ? 'bg-kick-highlight' : 'bg-kick-label'"
            ></span>
          <span
              :class="clue.solved ? 'line-through text-kick-label' : 'text-kick-text'"
          >
              {{ clue.text }}
            </span>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeUnmount,
  onMounted,
  nextTick,
} from 'vue';

// Define constants for magic numbers
const UPDATE_DELAY_CLUE_1 = 5000;
const UPDATE_DELAY_CLUE_2 = 10000;

export default defineComponent({
  name: 'StreamOverlay',
  setup() {
    // Reactive state variables
    const isExpanded = ref<boolean>(false);
    const overlay = ref<HTMLElement | null>(null);

    // Position variables
    const pos = {
 x: 10, y: 10, 
}; // Initial position set to 10px from top and left
    let isDragging = false;
    const dragOffset = {
 x: 0, y: 0, 
};
    let animationFrame: number | null = null;

    // Current Clue and Progress
    const currentClue = ref<string>('Find the landmark where music fills the air.');
    const clues = ref<Array<{ text: string; solved: boolean }>>([
      {
        text: 'Clue 1: Locate the tallest building.',
        solved: true,
      },
      {
        text: 'Clue 2: Discover the oldest bookstore.',
        solved: false,
      },
      {
        text: 'Clue 3: Where art meets the streets.',
        solved: false,
      },
    ]);

    // Toggle expand/minimize
    const toggleExpand = (): void => {
      isExpanded.value = !isExpanded.value;
    };

    // Update position using CSS transform
    const updatePosition = (): void => {
      if (overlay.value) {
        overlay.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };

    // Start dragging with mouse
    const startDrag = (event: MouseEvent): void => {
      isDragging = true;

      const transform = overlay.value?.style.transform;
      const match = /translate\((.*)px,\s*(.*)px\)/.exec(transform || '');
      if (match) {
        pos.x = parseFloat(match[1]);
        pos.y = parseFloat(match[2]);
      }

      dragOffset.x = event.clientX - pos.x;
      dragOffset.y = event.clientY - pos.y;

      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
    };

    // Drag handler
    const onDrag = (event: MouseEvent): void => {
      if (!isDragging) return;

      pos.x = event.clientX - dragOffset.x;
      pos.y = event.clientY - dragOffset.y;

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        updatePosition();
      });
    };

    // Stop dragging
    const stopDrag = (): void => {
      isDragging = false;
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    // Initialize component
    onMounted((): void => {
      nextTick(() => {
        updatePosition();
      });

      // Simulate dynamic updates for prototype
      setTimeout((): void => {
        clues.value[1].solved = true;
        currentClue.value = 'Where art meets the streets.';
      }, UPDATE_DELAY_CLUE_1);

      setTimeout((): void => {
        clues.value[2].solved = true;
        currentClue.value = 'All clues solved!';
      }, UPDATE_DELAY_CLUE_2);
    });

    // Cleanup before unmounting
    onBeforeUnmount((): void => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    });

    return {
      isExpanded,
      toggleExpand,
      currentClue,
      clues,
      startDrag,
      overlay,
    };
  },
});
</script>

<style scoped>
/* No custom CSS; all styling is handled by Tailwind */
</style>
