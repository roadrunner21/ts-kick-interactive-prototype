<template>
  <div class="min-h-screen bg-kick-bg text-kick-text">
    <!-- Hero Section -->
    <HeroSection @scroll-down="scrollToAboutMe" />

    <!-- About Me Section with ref -->
    <AboutMe ref="aboutMeRef" />

    <!-- Highlights Section -->
    <HighlightsSection />

    <!-- Other Sections -->
    <InspirationSection />
    <ChallengesAndSolutions/>
    <PrototypeDemonstration />
    <CallToAction />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  nextTick,
  ref,
  Ref,
} from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection.vue';
import AboutMe from '@/components/AboutMe.vue';
import InspirationSection from '@/components/InspirationSection.vue';
import PrototypeDemonstration from '@/components/PrototypeDemonstration.vue';
import CallToAction from '@/components/CallToAction.vue';
import HighlightsSection from "@/components/HighlightsSection.vue";
import ChallengesAndSolutions from "@/components/ChallengesAndSolutions.vue";

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
    const aboutMeRef: Ref<InstanceType<typeof AboutMe> | null> = ref(null);
    let isAnimating = false; // Prevent multiple triggers

    // Smooth scroll to the AboutMe section
    const scrollToAboutMe = () => {
      if (isAnimating || !aboutMeRef.value) return;
      isAnimating = true;

      const element = aboutMeRef.value.$el; // Access the root DOM element of the AboutMe component

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: element,
          offsetY: 0,
        },
        ease: 'power2.inOut',
        onComplete: () => {
          isAnimating = false; // Reset flag after animation
        },
      });
    };

    onMounted(async () => {
      await nextTick();

      if (aboutMeRef.value) {
        const element = aboutMeRef.value.$el;

        // Trigger smooth scroll when AboutMe enters the viewport
        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom',
          onEnter: (self) => {
            console.log('AboutMe section has entered the viewport. Triggering smooth scroll.');
            scrollToAboutMe();

            // Kill the trigger after use
            self.kill();
          },
          markers: import.meta.env.DEV,
        });
      } else {
        console.error('aboutMeRef is not assigned!');
      }
    });


    onUnmounted(() => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });

    return {
      scrollToAboutMe,
      aboutMeRef,
    };
  },
});
</script>

<style>
/* Global styles */
</style>
