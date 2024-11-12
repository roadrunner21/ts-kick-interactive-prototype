// src/stores/sentimentStore.ts

import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useDonationStore } from './donationStore';
import { Sentiment, Emotion } from '../types/sentimentTypes';

export const useSentimentStore = defineStore('sentiment', () => {
  const donationStore = useDonationStore();

  const currentSentiment = computed<Sentiment>(() => {
    if (donationStore.hypeTrainActive) {
      return Sentiment.POSITIVE;
    } else if (donationStore.hypeTrainEndedRecently) {
      return Sentiment.NEGATIVE;
    } else {
      return Sentiment.NEUTRAL;
    }
  });

  const currentSmileyEmotion = computed<Emotion>(() => {
    if (currentSentiment.value === Sentiment.POSITIVE) {
      if (donationStore.hypeTrainLevel >= 3) {
        return Emotion.ECSTATIC;
      } else if (donationStore.hypeTrainLevel === 2) {
        return Emotion.VERY_HAPPY;
      } else if (donationStore.hypeTrainLevel === 1) {
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
