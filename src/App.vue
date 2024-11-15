<template>
  <div class="min-h-screen bg-kick-bg text-kick-text">
    <!-- Hero Section -->
    <HeroSection @scroll-down="scrollToAboutMe" />

    <!-- About Me Section with ref -->
    <AboutMe ref="aboutMeRef" />

    <!-- Other Sections -->
    <InspirationSection />
    <IdentifiedChallenges />
    <ProposedSolutions />
    <PrototypeDemonstration />
    <AdditionalIdeas />
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
import IdentifiedChallenges from '@/components/IdentifiedChallenges.vue';
import ProposedSolutions from '@/components/ProposedSolutions.vue';
import PrototypeDemonstration from '@/components/PrototypeDemonstration.vue';
import AdditionalIdeas from '@/components/AdditionalIdeas.vue';
import CallToAction from '@/components/CallToAction.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeroSection,
    AboutMe,
    InspirationSection,
    IdentifiedChallenges,
    ProposedSolutions,
    PrototypeDemonstration,
    AdditionalIdeas,
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
      await nextTick(); // Ensure DOM is updated

      if (aboutMeRef.value) {
        const element = aboutMeRef.value.$el; // Access the root DOM element of the AboutMe component

        // Trigger smooth scroll when AboutMe enters the viewport
        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom', // Trigger when AboutMe's top reaches the bottom of the viewport
          onEnter: () => {
            console.log(
                'AboutMe section has entered the viewport. Triggering smooth scroll.',
            );
            scrollToAboutMe();
          },
          markers: import.meta.env.DEV, // Enable markers in development
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
