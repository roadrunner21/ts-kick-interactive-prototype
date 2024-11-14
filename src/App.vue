<!-- src/App.vue -->

<template>
  <div class="min-h-screen bg-kick-bg text-kick-text">
    <!-- Hero Section -->
    <HeroSection />

    <!-- About Me Section -->
    <AboutMe />

    <!-- Identified Challenges Section -->
    <IdentifiedChallenges />

    <!-- Proposed Solutions Section -->
    <ProposedSolutions />

    <!-- Prototype Demonstration Section -->
    <PrototypeDemonstration />

    <!-- Additional Ideas Section -->
    <AdditionalIdeas />

    <!-- Call to Action Section -->
    <CallToAction />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeroSection from './components/HeroSection.vue';
import AboutMe from './components/AboutMe.vue';
import IdentifiedChallenges from './components/IdentifiedChallenges.vue';
import ProposedSolutions from './components/ProposedSolutions.vue';
import PrototypeDemonstration from './components/PrototypeDemonstration.vue';
import AdditionalIdeas from './components/AdditionalIdeas.vue';
import CallToAction from './components/CallToAction.vue';

export default defineComponent({
  name: 'App',
  components: {
    HeroSection,
    AboutMe,
    IdentifiedChallenges,
    ProposedSolutions,
    PrototypeDemonstration,
    AdditionalIdeas,
    CallToAction,
  },
});
</script>

<style>
/* Global styles can go here */
</style>
