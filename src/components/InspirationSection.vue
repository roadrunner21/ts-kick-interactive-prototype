<template>
  <section
      class="relative py-40 px-4 overflow-hidden bg-inspiration-bg bg-repeat-y bg-cover"
      :style="parallaxStyle"
      ref="parallaxSection"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    <!-- Content -->
    <div class="relative z-10 max-w-3xl mx-auto text-center text-white animate-fadeIn">
      <div class="kick-frame px-4">
        <blockquote class="text-2xl md:text-3xl font-semibold italic">
          "We're thinking only of the next 5-10 years when we're trying to plan things out here right."
        </blockquote>
        <p class="italic pt-2">— Eddie during his chat with WestCOL</p>
      </div>
      <p class="mt-4 text-lg">
        Listening to your conversation with WestCOL really struck a chord with me. It got me thinking about how I could contribute to Kick's exciting future. I've spent some time brewing up ideas that I believe can help us shape the next decade of streaming together.
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, onUnmounted, computed,
} from 'vue';

export default defineComponent({
  name: 'InspirationSection',
  setup() {
    const parallaxSection = ref<HTMLElement | null>(null);
    const scrollY = ref<number>(window.scrollY); // Add type to scrollY

    const handleScroll = (): void => {
      scrollY.value = window.scrollY;
    };

    onMounted((): void => {
      scrollY.value = window.scrollY;
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted((): void => {
      window.removeEventListener('scroll', handleScroll);
    });

    const parallaxStyle = computed<{
      backgroundPosition: string;
    }>(() => {
      const PARALLAX_SPEED = 0.08; // Define as a constant
      const backgroundPositionY = scrollY.value * PARALLAX_SPEED;
      return {
        backgroundPosition: `center ${-backgroundPositionY}px`,
      };
    });

    return {
      parallaxStyle,
      parallaxSection,
    };
  },
});
</script>

<style scoped>
/* Optional: Smooth transition for background movement */
section {
  transition: background-position 0.1s linear;
}
</style>
