import { defineStore } from 'pinia';
import { computed } from 'vue';
import {
  Sentiment, Emotion,
} from '@/types/sentimentTypes';

import { useDonationStore } from './donationStore';
// Constants for magic numbers
const HYPE_TRAIN_LEVEL_1 = 1;
const HYPE_TRAIN_LEVEL_2 = 2;
const HYPE_TRAIN_LEVEL_3 = 3;

export const useSentimentStore = defineStore('sentiment', () => {
  const donationStore = useDonationStore();

  // Determine the current sentiment based on the hype train status
  const currentSentiment = computed<Sentiment>(() => {
    if (donationStore.hypeTrainActive) {
      return Sentiment.POSITIVE;
    } else if (donationStore.hypeTrainEndedRecently) {
      return Sentiment.NEGATIVE;
    } else {
      return Sentiment.NEUTRAL;
    }
  });

  // Determine the current emotion based on sentiment and hype train level
  const currentSmileyEmotion = computed<Emotion>(() => {
    if (currentSentiment.value === Sentiment.POSITIVE) {
      if (donationStore.hypeTrainLevel >= HYPE_TRAIN_LEVEL_3) {
        return Emotion.ECSTATIC;
      } else if (donationStore.hypeTrainLevel === HYPE_TRAIN_LEVEL_2) {
        return Emotion.VERY_HAPPY;
      } else if (donationStore.hypeTrainLevel === HYPE_TRAIN_LEVEL_1) {
        return Emotion.HAPPY;
      } else {
        return Emotion.NEUTRAL;
      }
    } else if (currentSentiment.value === Sentiment.NEGATIVE) {
      return Emotion.SAD;
    } else {
      return Emotion.NEUTRAL;
    }
  });

  return {
    currentSentiment,
    currentSmileyEmotion,
  };
});
