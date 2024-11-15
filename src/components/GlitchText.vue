<template>
  <span
      class="glitch-text glitch-active"
      :data-text="text"
      @animationend="restartAnimation">
    {{ text }}
  </span>
</template>

<script lang="ts">
import {
 defineComponent, ref, 
} from 'vue';

export default defineComponent({
  name: 'GlitchText',
  props: {
    text: {
      type: String,
      required: true,
    },
    delay: {
      type: Number,
      default: 2000, // Default delay of 2 seconds
    },
  },
  setup(props) {
    const isAnimating = ref(true);

    const restartAnimation = () => {
      isAnimating.value = false; // Remove active class to reset animation
      setTimeout(() => {
        isAnimating.value = true; // Reapply active class after delay
      }, props.delay);
    };

    return {
      isAnimating,
      restartAnimation,
    };
  },
});
</script>

<style scoped>
.glitch-text {
  position: relative;
  color: #53FC18; /* Kick Highlight Color */
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  pointer-events: none;
}

.glitch-text::before {
  left: 0;
  text-shadow: -1px -2px red;
  clip: rect(0, 900px, 0, 0);
  animation: glitch-anim-before 3s linear alternate-reverse 1, jump-render 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 blue;
  clip: rect(0, 900px, 0, 0);
  animation: glitch-anim-after 2s linear alternate-reverse 1, jump-render 0.5s ease-in-out 1;
  animation-fill-mode: forwards;
}

@keyframes glitch-anim-before {
  0% {
    clip: rect(0, 900px, 0, 0);
    transform: translate(0, 0);
  }
  /* Add your keyframes logic here */
}

@keyframes glitch-anim-after {
  0% {
    clip: rect(0, 900px, 0, 0);
    transform: translate(0, 0);
  }
  /* Add your keyframes logic here */
}

@keyframes jump-render {
  0% {
    clip: rect(0, 900px, 10px, 0);
  }
  /* Add your keyframes logic here */
}
</style>
