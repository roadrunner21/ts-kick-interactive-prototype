<!-- src/components/PrototypeDemonstration.vue -->

<template>
  <section class="py-20 px-4 bg-kick-bg">
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-center">Prototype Demonstration</h2>
    <!-- Main Prototype Component (with Donation Buttons, Stream, and Chat) -->
    <div class="max-w-4xl mx-auto">
      <PrototypeComponent />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PrototypeComponent from './PrototypeDemonstration/PrototypeComponent.vue';

export default defineComponent({
  name: 'PrototypeDemonstration',
  components: {
    PrototypeComponent,
  },
});
</script>

<style scoped>
/* Scoped styles for PrototypeDemonstration */
</style>
