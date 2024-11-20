<!-- src/components/ChallengesAndSolutions.vue -->
<template>
  <section class="py-16 px-4 relative bg-section-pattern bg-cover bg-center text-kick-text">
    <!-- Overlay to Darken the Background Pattern -->
    <div class="absolute inset-0 opacity-75"></div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Section Heading -->
      <h2 class="text-4xl md:text-5xl font-bold mb-12 text-center animate-fadeIn">
        Challenges and Solutions
      </h2>

      <!-- Challenge-Solution Pairs -->
      <div
          v-for="(pair, index) in challengeSolutionPairs"
          :key="index"
          class="mb-16 last:mb-0"
      >
        <!-- Pair Container -->
        <div class="flex flex-col md:flex-row items-stretch animate-fadeIn">
          <!-- Challenge Card -->
          <div class="md:w-1/2 p-4 md:p-6">
            <div
                class="bg-gradient-to-b from-darkRed via-darkRedHover to-darkRed rounded-lg shadow-lg p-6 h-full flex flex-col transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div class="flex items-center mb-3">
                <span
                    class="px-2 py-1 bg-red-600 text-white text-xs md:text-sm font-semibold rounded mr-2"
                >
                  Challenge
                </span>
                <component
                    :is="pair.challenge.icon"
                    class="h-6 w-6 text-red-500 mr-2"
                ></component>
                <h3 class="text-xl md:text-2xl font-semibold">
                  {{ pair.challenge.title }}
                </h3>
              </div>
              <p class="flex-grow text-gray-300 text-sm md:text-base">
                {{ pair.challenge.description }}
              </p>
              <p class="mt-3 text-gray-400 text-xs md:text-sm">
                <strong>Impact:</strong> {{ pair.challenge.impact }}
              </p>
            </div>
          </div>

          <!-- Solution Card -->
          <div class="md:w-1/2 p-4 md:p-6 mt-8 md:mt-0">
            <div
                class="bg-gradient-to-b from-darkKickGreen via-darkKickGreenHover to-darkKickGreen rounded-lg shadow-lg p-6 h-full flex flex-col transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div class="flex items-center mb-3">
                <span
                    class="px-2 py-1 bg-kick-highlight text-black text-xs md:text-sm font-semibold rounded mr-2"
                >
                  Solution
                </span>
                <component
                    :is="pair.solution.icon"
                    class="h-6 w-6 text-kick-highlight mr-2"
                ></component>
                <h3 class="text-xl md:text-2xl font-semibold">
                  {{ pair.solution.title }}
                </h3>
              </div>
              <p class="flex-grow text-gray-300 text-sm md:text-base">
                {{ pair.solution.description }}
              </p>
              <div
                  v-if="pair.solution.image"
                  class="mt-3 md:mt-4"
              >
                <img
                    :src="pair.solution.image"
                    alt="Illustration of {{ pair.solution.title }}"
                    class="w-full rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105"
                />
              </div>
              <p class="mt-3 text-gray-400 text-xs md:text-sm self-end">
                <strong>Benefits:</strong> {{ pair.solution.benefits }}
              </p>
            </div>
          </div>
        </div>
        <!-- Visual Separator -->
        <div class="mt-8 md:mt-12">
          <hr class="border-t border-kick-border"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  AcademicCapIcon,
  ChatBubbleLeftEllipsisIcon,
  FaceSmileIcon,
  UsersIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'ChallengesAndSolutions',
  components: {
    AcademicCapIcon,
    ChatBubbleLeftEllipsisIcon,
    FaceSmileIcon,
    UsersIcon,
    UserGroupIcon,
    VideoCameraIcon,
  },
  setup() {
    const challengeSolutionPairs = [
      {
        challenge: {
          title: 'Event Participation Difficulties',
          description:
              'Viewers rely on external platforms like Discord for event updates, fragmenting the user experience.',
          impact: 'Fragmented user experience and decreased platform engagement.',
          icon: 'UsersIcon',
        },
        solution: {
          title: 'Centralized Event Updates',
          description:
              'Develop tools for real-time event updates and interactions directly within Kick to keep viewers informed and engaged.',
          benefits:
              'Keeps viewers on the platform, eliminates the need for external tools, and improves event participation.',
          icon: 'UsersIcon',
          image: 'https://placehold.co/600x400?text=Solution+4',
        },
      },
      {
        challenge: {
          title: 'Developer Ecosystem Gaps',
          description:
              'Kick lacks a dedicated developer ecosystem for creating bots, overlays, and tools, limiting innovation and third-party contributions.',
          impact:
              'Limits innovation and third-party contributions, hindering platform growth.',
          icon: 'AcademicCapIcon',
        },
        solution: {
          title: 'Developer Tools and Bot Marketplace',
          description:
              'Introduce a Developer Marketplace where creators can build, share, and monetize bots and overlays. Developers can earn through subscriptions or revenue-sharing models tied to subs and donations.',
          benefits:
              'Fosters innovation, drives customization, and creates additional revenue streams.',
          icon: 'AcademicCapIcon',
        },
      },
      {
        challenge: {
          title: 'Community Engagement Gaps',
          description:
              'Missing interactive tools like hypetrains and channel points reduce viewer engagement and community vibrancy.',
          impact: 'Reduced viewer engagement and community vibrancy.',
          icon: 'ChatBubbleLeftEllipsisIcon',
        },
        solution: {
          title: 'Hypetrains and Channel Points',
          description:
              'Implement hypetrains, channel points and a ban appeal system to gamify viewer participation, boost engagement, and increase donation activity.',
          benefits:
              'Boosts engagement, increases donation activity, and enhances community experience.',
          icon: 'ChatBubbleLeftEllipsisIcon',
          image: 'https://placehold.co/600x400?text=Solution+2',
        },
      },
      {
        challenge: {
          title: 'Cultural Engagement Deficit',
          description:
              "Kick's emote culture lacks virality and depth, leading to less vibrant community interactions.",
          impact: 'Less vibrant community interactions and lower user retention.',
          icon: 'FaceSmileIcon',
        },
        solution: {
          title: 'Viral Emote Culture & Combo Messages',
          description:
              'Promote viral emote culture through community-driven initiatives and introduce combo messages that celebrate rapid emote usage, fostering stronger community bonds.',
          benefits:
              'Strengthens emote culture, fosters community bonds, and drives user retention.',
          icon: 'FaceSmileIcon',
          image: 'https://i.ibb.co/y6VBv3h/Screenshot-2024-11-20-at-17-18-24.png',
        },
      },
      {
        challenge: {
          title: 'Collaboration Limitations',
          description:
              'Streamers lack tools for multistreaming and shared chat, limiting collaborative content creation.',
          impact: 'Hindered streamer partnerships and reduced viewer engagement.',
          icon: 'UserGroupIcon',
        },
        solution: {
          title: 'Multistream Support & Shared Chat',
          description:
              'Enable multistreaming capabilities and provide a shared chat experience to support dynamic collaborations between streamers.',
          benefits:
              'Facilitates collaborations, enriches viewer experience, and attracts new partnerships.',
          icon: 'UserGroupIcon',
          image: 'https://contenthub-cdn.streamlabs.com/static/imgs/posts/collab%20cam%20pvp%20game2.png',
        },
      },
      {
        challenge: {
          title: 'User Retention Issues',
          description:
              'Lack of VOD continuation and timestamp syncing creates friction in resuming content.',
          impact: 'Frustrated users and increased likelihood of leaving the platform.',
          icon: 'VideoCameraIcon',
        },
        solution: {
          title: 'VOD Continuation & Timestamp Syncing',
          description:
              'Implement features that allow viewers to seamlessly continue watching VODs or jump to specific timestamps after watching a clip.',
          benefits:
              'Enhances user experience, reduces friction, and increases viewer retention.',
          icon: 'VideoCameraIcon',
          image: 'https://i.ibb.co/bFJw0n5/Screenshot-2024-11-19-at-13-40-40.jpg',
        },
      },
    ];

    return {
      challengeSolutionPairs,
    };
  },
});
</script>

<style scoped>
</style>
