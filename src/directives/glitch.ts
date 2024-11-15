import { Directive } from 'vue';

interface GlitchHTMLElement extends HTMLElement {
  _glitchHandleAnimationEnd?: () => void;
}

const GLITCH_ACTIVE_CLASS = 'glitch-active';
const GLITCH_DELAY_MS = 2000; // Delay before restarting the glitch animation (in milliseconds)

const glitchDirective: Directive = {
  mounted(el: GlitchHTMLElement): void {
    // Ensure the `data-text` attribute matches the element's content for the glitch effect
    if (!el.hasAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent || '');
    }

    const triggerGlitch = (): void => {
      el.classList.add(GLITCH_ACTIVE_CLASS);
    };

    const handleAnimationEnd = (): void => {
      el.classList.remove(GLITCH_ACTIVE_CLASS);
      setTimeout(triggerGlitch, GLITCH_DELAY_MS); // Restart animation after the delay
    };

    // Attach the animation end listener to manage the glitch cycle
    el.addEventListener('animationend', handleAnimationEnd);

    // Start the initial glitch animation
    triggerGlitch();

    // Store the event handler for cleanup on unmount
    el._glitchHandleAnimationEnd = handleAnimationEnd;
  },

  beforeUnmount(el: GlitchHTMLElement): void {
    // Cleanup: Remove the animation event listener to avoid memory leaks
    if (el._glitchHandleAnimationEnd) {
      el.removeEventListener('animationend', el._glitchHandleAnimationEnd);
      delete el._glitchHandleAnimationEnd;
    }
  },
};

export default glitchDirective;
