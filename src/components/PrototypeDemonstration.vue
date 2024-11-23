<!-- src/components/PrototypeDemonstration.vue -->

<template>
  <section class="py-20 px-4 text-kick-text bg-kick-bg">
    <h2 class="section-heading">Check Out the Prototype!</h2>
    <p class="max-w-2xl mx-auto mb-6 text-center">
      I've developed an interactive prototype that brings some of these ideas to life. While it currently focuses on
      specific features, it demonstrates my development approach and what we can achieve together.
    </p>
    <div class="max-w-6xl mx-auto">
      <PrototypeComponent/>
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
