import {
 ref, Ref, 
} from 'vue';

/**
 * A composable to handle level-up animation
 * @returns {object} An object containing the `levelUpAnimation` ref and `triggerLevelUpAnimation` function
 */
export function useLevelUpAnimation(): {
  levelUpAnimation: Ref<boolean>;
  triggerLevelUpAnimation: (duration: number) => void;
} {
  const levelUpAnimation: Ref<boolean> = ref(false);

  /**
   * Triggers the level-up animation for a specified duration
   * @param {number} duration The duration of the animation in milliseconds
   */
  function triggerLevelUpAnimation(duration: number): void {
    levelUpAnimation.value = true;
    setTimeout(() => {
      levelUpAnimation.value = false;
    }, duration);
  }

  return {
    levelUpAnimation,
    triggerLevelUpAnimation,
  };
}
