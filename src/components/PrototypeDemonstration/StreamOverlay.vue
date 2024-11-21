<!-- src/components/PrototypeDemonstration/StreamOverlay.vue -->
<template>
  <div
      ref="overlay"
      class="absolute bg-kick-bg bg-opacity-90 text-kick-text rounded-lg shadow-lg cursor-move select-none"
      :class="[
        isExpanded
          ? 'w-80 p-4 max-h-96 overflow-y-auto'
          : 'w-64 p-2 h-12 flex items-center justify-between',
        'transform',
      ]"
      @mousedown="startDrag"
      @touchstart="startDrag"
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
        <ul>
          <li
              v-for="(clue, index) in clues"
              :key="index"
              class="flex items-center mb-1 last:mb-0"
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

export default defineComponent({
  name: 'StreamOverlay',
  setup() {
    const isExpanded = ref<boolean>(false);
    const overlay = ref<HTMLElement | null>(null);

    const pos = {
 x: 10, y: 10, 
}; // Initial position set to 10px from top and left
    let isDragging = false;
    const dragOffset = {
 x: 0, y: 0, 
};
    let animationFrame: number | null = null;

    // Clue Progression
    const currentClue = ref<string>('Find the landmark where music fills the air.');
    const clues = ref<Array<{ text: string; solved: boolean }>>([
      {
 text: 'Clue 1: Locate the tallest building.', solved: true, 
},
      {
 text: 'Clue 2: Discover the oldest bookstore.', solved: false, 
},
      {
 text: 'Clue 3: Where art meets the streets.', solved: false, 
},
    ]);

    // Timeout IDs to manage cleanup
    let clueTimeout1: number | null = null;
    let clueTimeout2: number | null = null;

    // Toggle expand/minimize
    const toggleExpand = (): void => {
      isExpanded.value = !isExpanded.value;
      if (isExpanded.value) {
        startClueProcess();
      } else {
        clearClueProcess();
      }
    };

    const UPDATE_DELAY_CLUE_1 = 5000
    const UPDATE_DELAY_CLUE_2 = 10000

    // Start Clue Process
    const startClueProcess = (): void => {
      clueTimeout1 = window.setTimeout(() => {
        clues.value[1].solved = true;
        currentClue.value = 'Where art meets the streets.';
      }, UPDATE_DELAY_CLUE_1);

      clueTimeout2 = window.setTimeout(() => {
        clues.value[2].solved = true;
        currentClue.value = 'All clues solved!';
      }, UPDATE_DELAY_CLUE_2);
    };

    // Clear Clue Process
    const clearClueProcess = (): void => {
      if (clueTimeout1) {
        clearTimeout(clueTimeout1);
        clueTimeout1 = null;
      }
      if (clueTimeout2) {
        clearTimeout(clueTimeout2);
        clueTimeout2 = null;
      }
    };

    // Update position using CSS transform
    const updatePosition = (): void => {
      if (overlay.value) {
        overlay.value.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
    };

    // Start dragging with mouse or touch
    const startDrag = (event: MouseEvent | TouchEvent): void => {
      isDragging = true;

      let clientX: number;
      let clientY: number;

      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
        event.preventDefault(); // Prevent scrolling
      } else {
        return;
      }

      const transform = overlay.value?.style.transform;
      const match = /translate\((.*)px,\s*(.*)px\)/.exec(transform || '');
      if (match) {
        pos.x = parseFloat(match[1]);
        pos.y = parseFloat(match[2]);
      }

      dragOffset.x = clientX - pos.x;
      dragOffset.y = clientY - pos.y;

      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', onDrag, {
 passive: false, 
});
      window.addEventListener('touchend', stopDrag);
    };

    // Drag handler for mouse and touch
    const onDrag = (event: MouseEvent | TouchEvent): void => {
      if (!isDragging) return;

      let clientX: number;
      let clientY: number;

      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        if (event.touches.length > 0) {
          clientX = event.touches[0].clientX;
          clientY = event.touches[0].clientY;
          event.preventDefault(); // Prevent scrolling
        } else {
          return;
        }
      } else {
        return;
      }

      pos.x = clientX - dragOffset.x;
      pos.y = clientY - dragOffset.y;

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
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDrag);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    // Initialize component
    onMounted((): void => {
      nextTick(() => {
        updatePosition();
      });
    });

    // Cleanup before unmounting
    onBeforeUnmount((): void => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDrag);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      clearClueProcess();
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
/* Removed space-y-1; handled spacing via mb-1 in li elements */
</style>
