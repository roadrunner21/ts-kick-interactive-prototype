<template>
  <div class="min-h-screen bg-kick-bg text-kick-text">
    <!-- Hero Section -->
    <HeroSection @scroll-down="scrollToAboutMe" />

    <!-- About Me Section -->
    <AboutMe />

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
 defineComponent, onMounted, onUnmounted, nextTick,
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
    let isAnimating = false; // Prevent multiple triggers

    // Smooth scroll to the AboutMe section
    const scrollToAboutMe = () => {
      if (isAnimating) return;
      isAnimating = true;

      const aboutMeElement = document.getElementById('about-me');
      if (aboutMeElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
 y: aboutMeElement, offsetY: 0,
},
          ease: 'power2.inOut',
          onComplete: () => {
            isAnimating = false; // Reset flag after animation
          },
        });
      } else {
        console.error('AboutMe section not found!');
        isAnimating = false; // Reset flag even if element not found
      }
    };

    onMounted(async () => {
      await nextTick(); // Ensure DOM is updated

      // Trigger smooth scroll when AboutMe enters the viewport
      ScrollTrigger.create({
        trigger: '#about-me',
        start: 'top bottom', // Trigger when AboutMe's top reaches the bottom of the viewport
        onEnter: () => {
          console.log('AboutMe section has entered the viewport. Triggering smooth scroll.');
          scrollToAboutMe();
        },
        markers: import.meta.env.DEV, // Enable markers in development
      });
    });

    onUnmounted(() => {
      // Clean up ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });

    return {
      scrollToAboutMe,
    };
  },
});
</script>

<style>
/* Global styles */
</style>
