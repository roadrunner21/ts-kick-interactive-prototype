// src/composables/useSmoothScroll.ts

import {
 ref, Ref, onUnmounted, 
} from 'vue';

/**
 * Duration of the scroll animation in milliseconds.
 */
const ANIMATION_DURATION = 1000;

/**
 * Type definition for the scrollToElement function.
 */
type ScrollToElementFunction = (element: HTMLElement | null, offsetY?: number) => void;

/**
 * Type definition for the observeAndScroll function.
 */
type ObserveAndScrollFunction = (element: HTMLElement | null, offsetY?: number) => void;

/**
 * Provides smooth scrolling functionality and observes elements entering the viewport.
 * @returns An object containing smooth scroll functions and animation state.
 */
export function useSmoothScroll(): {
  scrollToElement: ScrollToElementFunction;
  observeAndScroll: ObserveAndScrollFunction;
  isAnimating: Ref<boolean>;
} {
  const isAnimating = ref(false); // Prevent multiple triggers
  let observer: IntersectionObserver | null = null;

  /**
   * Smoothly scrolls to a specified element.
   */
  const scrollToElement: ScrollToElementFunction = (element, offsetY = 0): void => {
    if (isAnimating.value || !element) return;

    isAnimating.value = true;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offsetY;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isAnimating.value = false; // Reset after animation
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
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    observer.observe(element);
  };

  // Cleanup on unmount
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
