<template>
  <section class="py-20 px-4 bg-kick-bg text-kick-text">
    <div class="container mx-auto">
      <!-- Top Row: Profile Image and About Me -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <!-- Left: Profile Image -->
        <div class="flex justify-center">
          <img
              src="https://i.ibb.co/RS8LT7f/headshotframe-me.png"
              alt="Marco"
              class="w-64 h-64 object-cover shadow-lg"
          />
        </div>

        <!-- Right: About Me -->
        <div class="flex flex-col justify-center">
          <h2 class="text-4xl font-bold text-kick-text mb-4">About Me</h2>
          <h3 class="text-2xl mb-6">Innovative Frontend Developer Driving Community Engagement</h3>
          <p class="text-lg leading-relaxed mb-4">
            Hey there! I'm <span class="font-semibold">Marco</span>, and I've been crafting software solutions for
            over a decade, specializing in <span class="text-kick-highlight font-semibold">JavaScript magic both front and back</span>.
            My journey started with building
            production planning software in C#, but I quickly found my calling in creating engaging, user-focused web
            applications.
          </p>
          <p class="text-lg leading-relaxed mb-6">
            Lately, I've been diving deep into frontend development with React and Vue, partnering with <b>awesome agencies</b>
            and <b>individual clients</b> to build high-performance <span class="text-kick-highlight font-semibold">web apps and PWAs</span>. I'm all about delivering seamless experiences that
            users love.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutMe',
});
</script>

<style scoped>
</style>
