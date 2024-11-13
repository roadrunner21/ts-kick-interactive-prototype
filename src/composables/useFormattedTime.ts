import {
 computed, Ref, 
} from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// Use the duration plugin
dayjs.extend(duration);

/**
 * A composable that formats time in seconds to 'mm:ss' format
 * @param {number} timeRemaining - The remaining time in seconds
 * @returns {object} An object containing a computed property `formattedTime`
 */
export function useFormattedTime(timeRemaining: number): { formattedTime: Ref<string> } {
  const formattedTime = computed(() => {
    return dayjs
      .duration(timeRemaining, 'seconds')
      .format('m:ss');
  });

  return {
    formattedTime,
  };
}
