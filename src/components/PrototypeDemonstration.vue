<!-- src/components/PrototypeDemonstration.vue -->

<template>
  <section class="py-20 px-4 bg-black text-kick-text">
    <h2 class="section-heading">Prototype Demonstration</h2>
    <p class="max-w-2xl mx-auto mb-6 text-center">
      Explore the interactive prototype below to see how these solutions come to life.
    </p>
    <div class="max-w-5xl mx-auto">
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
/* No additional styles needed */
</style>
