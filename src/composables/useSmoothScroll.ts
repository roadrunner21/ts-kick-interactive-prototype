import {
 ref, Ref, 
} from 'vue';

const ANIMATION_DURATION = 1000; // Duration of the scroll animation in milliseconds.

type ScrollToElementFunction = (element: HTMLElement | null, offsetY?: number) => void;

export function useSmoothScroll(): {
  scrollToElement: ScrollToElementFunction;
  isAnimating: Ref<boolean>;
} {
  const isAnimating = ref(false); // Prevent multiple triggers.

  /**
   * Smoothly scrolls to a specified element.
   */
  const scrollToElement: ScrollToElementFunction = (element, offsetY = 0): void => {
    if (isAnimating.value || !element) return;

    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offsetY;
    const currentPosition = window.scrollY;

    // Skip if already at the target position (allow a small margin of error).
    if (Math.abs(targetPosition - currentPosition) < 1) return;

    isAnimating.value = true;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isAnimating.value = false; // Reset after animation.
    }, ANIMATION_DURATION);
  };

  return {
    scrollToElement,
    isAnimating,
  };
}
