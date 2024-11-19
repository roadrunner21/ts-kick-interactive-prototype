import {
 ref, Ref, onUnmounted, 
} from 'vue';

const ANIMATION_DURATION = 1000; // Duration of the scroll animation in milliseconds.

type ScrollToElementFunction = (element: HTMLElement | null, offsetY?: number) => void;
type ObserveAndScrollFunction = (element: HTMLElement | null, offsetY?: number) => void;

export function useSmoothScroll(): {
  scrollToElement: ScrollToElementFunction;
  observeAndScroll: ObserveAndScrollFunction;
  isAnimating: Ref<boolean>;
} {
  const isAnimating = ref(false); // Prevent multiple triggers.
  let observer: IntersectionObserver | null = null;

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

  /**
   * Observes an element and triggers smooth scroll when it enters the viewport.
   */
  const observeAndScroll: ObserveAndScrollFunction = (element, offsetY = 0): void => {
    if (!element) {
      console.error('Cannot observe a null element.');
      return;
    }

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const targetPosition = entry.target.getBoundingClientRect().top + window.scrollY - offsetY;
          const currentPosition = window.scrollY;

          // Avoid scrolling if already near the target.
          if (Math.abs(targetPosition - currentPosition) < 1) return;

          scrollToElement(entry.target, offsetY);

          if (observer) {
            observer.unobserve(entry.target);
            observer.disconnect();
            observer = null;
          }
        }
      });
    };

    observer = new IntersectionObserver(callback, {
      root: null, // Use the viewport as the root.
      threshold: 0,
    });

    observer.observe(element);
  };

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    scrollToElement,
    observeAndScroll,
    isAnimating,
  };
}
