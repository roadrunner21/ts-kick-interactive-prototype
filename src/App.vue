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
    <OpenSourceSection />
    <CallToAction />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref, onMounted, onUnmounted,
} from 'vue';
import { useSmoothScroll } from '@/composables/useSmoothScroll';
import HeroSection from '@/components/HeroSection.vue';
import AboutMe from '@/components/AboutMe.vue';
import InspirationSection from '@/components/InspirationSection.vue';
import PrototypeDemonstration from '@/components/PrototypeDemonstration.vue';
import CallToAction from '@/components/CallToAction.vue';
import HighlightsSection from '@/components/HighlightsSection.vue';
import ChallengesAndSolutions from '@/components/ChallengesAndSolutions.vue';
import OpenSourceSection from "@/components/OpenSourceSection.vue";

export default defineComponent({
  name: 'App',
  components: {
    OpenSourceSection,
    HighlightsSection,
    HeroSection,
    AboutMe,
    InspirationSection,
    ChallengesAndSolutions,
    PrototypeDemonstration,
    CallToAction,
  },
  setup() {
    const aboutMeRef: Ref<InstanceType<typeof AboutMe> | null> = ref(null);
    const { scrollToElement } = useSmoothScroll();

    const onScroll = (): void => {
      if (window.scrollY > 0 && aboutMeRef.value?.$el) {
        scrollToElement(aboutMeRef.value.$el);
        window.removeEventListener('scroll', onScroll);
      }
    };

    onMounted(() => {
      if (window.scrollY === 0 && aboutMeRef.value) {
        window.addEventListener('scroll', onScroll);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll);
    });

    /**
     * Handles the manual scroll triggered by the HeroSection's "scroll-down" event.
     */
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

