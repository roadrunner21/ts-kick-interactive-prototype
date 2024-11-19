<template>
  <div class="min-h-screen bg-kick-bg text-kick-text">
    <!-- Hero Section -->
    <HeroSection @scroll-down="handleScrollToAboutMe" />

    <!-- About Me Section with ref -->
    <AboutMe ref="aboutMeRef" />

    <!-- Highlights Section -->
    <HighlightsSection />

    <!-- Other Sections -->
    <InspirationSection />
    <ChallengesAndSolutions />
    <PrototypeDemonstration />
    <CallToAction />
  </div>
</template>

<script lang="ts">
import {
 defineComponent, ref, 
} from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutMe from '@/components/AboutMe.vue';
import InspirationSection from '@/components/InspirationSection.vue';
import PrototypeDemonstration from '@/components/PrototypeDemonstration.vue';
import CallToAction from '@/components/CallToAction.vue';
import HighlightsSection from '@/components/HighlightsSection.vue';
import ChallengesAndSolutions from '@/components/ChallengesAndSolutions.vue';
import { useSmoothScroll } from '@/composables/useSmoothScroll';

export default defineComponent({
  name: 'App',
  components: {
    HighlightsSection,
    HeroSection,
    AboutMe,
    InspirationSection,
    ChallengesAndSolutions,
    PrototypeDemonstration,
    CallToAction,
  },
  setup() {
    const aboutMeRef = ref<InstanceType<typeof AboutMe> | null>(null);
    const { scrollToElement } = useSmoothScroll();

    const handleScrollToAboutMe = (): void => {
      scrollToElement(aboutMeRef.value?.$el || null);
    };

    return {
      aboutMeRef,
      handleScrollToAboutMe,
    };
  },
});
</script>

<style>
/* Global styles */
</style>
