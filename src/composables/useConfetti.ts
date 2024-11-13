import {
 ref, Ref, 
} from 'vue';
import confetti from 'canvas-confetti';

/**
 * A composable to handle confetti animation.
 * @returns {object} An object containing:
 * - `confettiCanvas`: A ref to the confetti canvas element.
 * - `launchConfetti`: A function to launch the confetti animation.
 */
export function useConfetti(): { confettiCanvas: Ref<HTMLCanvasElement | null>; launchConfetti: () => void } {
  const confettiCanvas = ref<HTMLCanvasElement | null>(null);

  /**
   * Launches the confetti animation.
   * @returns {void} Nothing is returned from this function.
   */
  const launchConfetti = (): void => {
    if (confettiCanvas.value) {
      const myConfetti = confetti.create(confettiCanvas.value, {
        resize: true,
        useWorker: true,
      });
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
        colors: [
'#53FC18', '#42c514',
], // Kick colors
      });
    }
  };

  return {
 confettiCanvas, launchConfetti, 
};
}
