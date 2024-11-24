<template>
  <section class="py-20 bg-kick-border text-kick-text">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold text-center mb-12">Key Highlights</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <HighlightItem
            icon="experience"
            title="10+ Years in the Game"
            description="From process optimization to full-stack web development."
            titleClass="text-kick-accent"
            descriptionClass="text-kick-label"
        />
        <HighlightItem
            icon="frontend"
            title="Frontend Fanatic"
            description="JavaScript, React, Vue—you name it, I've probably built something cool with it."
            titleClass="text-kick-accent"
            descriptionClass="text-kick-label"
        />
        <HighlightItem
            icon="backend"
            title="Jack of All Trades"
            description="Comfortable on the backend too, with Node.js and Symfony up my sleeve."
            titleClass="text-kick-accent"
            descriptionClass="text-kick-label"
        />
        <HighlightItem
            icon="contractor"
            title="Independent Contractor Superpowers"
            description="Quick to jump in, adaptable, and always focused on delivering results that matter."
            titleClass="text-kick-accent"
            descriptionClass="text-kick-label"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HighlightItem from './HighlightItem.vue';

export default defineComponent({
  name: 'HighlightsSection',
  components: {
    HighlightItem,
  },
});
</script>

<style scoped>
.bg-kick-border {
  background-color: #1a1a1a;
}

.text-kick-label {
  color: #929EA6;
}
</style>
