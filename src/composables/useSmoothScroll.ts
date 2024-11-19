import {
 ref, Ref, 
} from 'vue';

type ScrollToElementFunction = (element: HTMLElement | null, offsetY?: number) => void;

/**
 * Provides smooth scrolling functionality.
 * @returns {object} An object containing the smooth scroll function and animation state.
 */
export function useSmoothScroll(): {
  scrollToElement: ScrollToElementFunction;
  isAnimating: Ref<boolean>;
} {
  const isAnimating = ref(false); // Prevent multiple triggers

  const scrollToElement: ScrollToElementFunction = (element, offsetY = 0) => {
    if (isAnimating.value || !element) return;

    isAnimating.value = true;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offsetY;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    const animationDuration = 1000; // Match smooth scroll duration
    setTimeout(() => {
      isAnimating.value = false; // Reset after animation
    }, animationDuration);
  };

  return {
    scrollToElement,
    isAnimating,
  };
}
