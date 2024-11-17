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
            I’m <span class="font-semibold">Marco</span>, a software developer with over a decade of experience specializing in
            <span class="text-kick-highlight font-semibold">JavaScript</span> across the stack.
          </p>
          <p class="text-lg leading-relaxed mb-4">
            From developing production planning software in C#,
            to delivering robust full-stack solutions with React and Vue,
            my career has been driven by a passion for building scalable, user-focused applications.
          </p>
          <p class="text-lg leading-relaxed mb-6">
            In recent years, I’ve specialized in frontend development, collaborating with <span class="font-semibold">agencies</span>
            and <span class="font-semibold">end-customers</span> to create high-performance <span class="text-kick-highlight font-semibold">web applications</span>
            and <span class="text-kick-highlight font-semibold">PWAs</span> that deliver seamless user experiences.
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
