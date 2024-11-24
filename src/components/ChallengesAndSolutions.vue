<!-- src/components/ChallengesAndSolutions.vue -->
<template>
  <section class="py-16 px-4 relative bg-cover bg-center text-kick-text bg-gradient-to-b from-section-bg-pattern to-black">
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
                class="bg-gradient-to-b from-dark-red via-dark-red-hover to-dark-red rounded-lg shadow-lg p-6 h-full flex flex-col transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div class="flex mb-3">
                <span
                    class="px-2 py-1 bg-red-600 text-white text-xs md:text-sm font-semibold rounded mr-2 self-start mt-0.5"
                >
                  Challenge
                </span>
                <component
                    :is="pair.challenge.icon"
                    class="min-h-6 min-w-6 max-h-6 max-w-6 text-red-500 mr-2 mt-0.5"
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
                class="bg-gradient-to-b from-dark-kick-green via-dark-kick-green-hover to-dark-kick-green rounded-lg shadow-lg p-6 h-full flex flex-col transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div class="flex mb-3">
                <span
                    class="px-2 py-1 bg-kick-highlight text-black text-xs md:text-sm font-semibold rounded mr-2 self-start mt-0.5"
                >
                  Solution
                </span>
                <component
                    :is="pair.solution.icon"
                    class="min-h-6 min-w-6 max-h-6 max-w-6 text-kick-highlight mr-2 mt-0.5"
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
        <div v-if="index < challengeSolutionPairs.length - 1" class="mt-8 md:mt-12">
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
          title: 'Keeping up with Events',
          description:
              'Ever noticed how viewers have to hop over to Discord just to keep up with events? It\'s like making them change channels mid-show—not ideal!',
          impact: 'Viewers drift away, and Kick misses out on keeping them engaged right here.',
          icon: 'UsersIcon',
        },
        solution: {
          title: 'Let\'s Bring It All Home',
          description:
              'How about we build real-time event updates right into Kick? That way, everyone stays in the loop without leaving the party.',
          benefits:
              'Keeps viewers glued to Kick, boosts engagement during events, and makes the whole experience smoother and more fun.',
          icon: 'UsersIcon',
          image: 'https://i.ibb.co/Cs1ZJ7t/Screenshot-2024-11-21-at-11-40-44.png',
        },
      },
      {
        challenge: {
          title: 'Missing Developer Magic',
          description:
              'Kick doesn\'t yet have a space for creative devs to build bots, overlays, and other cool tools—and that\'s a bummer.',
          impact:
              'We\'re missing out on innovation and awesome third-party contributions that could supercharge the platform.',
          icon: 'AcademicCapIcon',
        },
        solution: {
          title: 'Developer Tools & Bot Marketplace',
          description:
              'Let\'s open the doors to developers! By creating a marketplace where they can craft, share, and even monetize their creations, we invite a wave of innovation. Think bots that jazz up chats and overlays that make streams pop.',
          benefits:
              'Sparks innovation, gives streamers more tools to engage their audience, and builds a thriving ecosystem around Kick.',
          icon: 'AcademicCapIcon',
          image: 'https://i.imgur.com/b0Tid17.jpeg',
        },
      },
      {
        challenge: {
          title: 'Sparking the Community Flame',
          description:
              'Without interactive goodies like hypetrains and channel points, we\'re missing chances to pump up the crowd.',
          impact: 'Streams feel less lively, and viewers might not stick around as long.',
          icon: 'ChatBubbleLeftEllipsisIcon',
        },
        solution: {
          title: 'Hypetrains & Channel Points',
          description:
              'Let\'s crank up the excitement by adding hypetrains and channel points! These features turn passive watching into active participation.',
          benefits:
              'Gets viewers more involved, boosts donation activity, and makes streams way more fun.',
          icon: 'ChatBubbleLeftEllipsisIcon',
          image: 'https://i.ibb.co/yVP02Wp/Screenshot-2024-11-23-at-04-59-31.png',
        },
      },
      {
        challenge: {
          title: 'Building Kicks Own Culture',
          description:
              "Right now, Kicks emote game isn't as strong as it could be. We don't have that viral vibe that makes communities stick together.",
          impact: 'Chats feel less lively, and we miss out on creating those inside jokes and shared moments.',
          icon: 'FaceSmileIcon',
        },
        solution: {
          title: 'Let\'s Go Viral with Emotes & Combos',
          description:
              'By promoting emote usage and adding fun features like combo messages (imagine a "25x HYPE COMBO" lighting up the chat), we can create that sense of community and belonging.',
          benefits:
              'Strengthens community bonds, keeps users coming back, and makes Kick the place to be for live streaming fun.',
          icon: 'FaceSmileIcon',
          image: 'https://i.ibb.co/y6VBv3h/Screenshot-2024-11-20-at-17-18-24.png',
        },
      },
      {
        challenge: {
          title: 'Streamer Team-Ups Need a Boost',
          description:
              'Streamers want to collaborate, but without multistreaming and shared chats, it\'s tougher than it should be.',
          impact: 'Fewer epic collabs and a less engaging experience for viewers.',
          icon: 'UserGroupIcon',
        },
        solution: {
          title: 'Multistream Magic',
          description:
              'Let\'s give streamers the tools to team up seamlessly! With multistream support and fusioned chats, viewers can enjoy all the action in one place.',
          benefits:
              'Encourages collaborations, gives viewers more content to love, and helps grow the Kick community.',
          icon: 'UserGroupIcon',
          image: 'https://contenthub-cdn.streamlabs.com/static/imgs/posts/collab%20cam%20pvp%20game2.png',
        },
      },
      {
        challenge: {
          title: 'Keeping Viewers in the Loop',
          description:
              'Ever had to leave a stream and struggled to find your spot when you came back? Frustrating, right? Or found a clip, wanted to get more context but quickly clicked off because you couldn\'t easily find it in a 8 hour vod?',
          impact: 'Viewers might give up and move on, which isn\'t great for retention.',
          icon: 'VideoCameraIcon',
        },
        solution: {
          title: 'Seamless Viewing Experience',
          description:
              'Let\'s make it easy for viewers to pick up right where they left off with VOD continuation and timestamp syncing.',
          benefits:
              'Happier viewers who stick around longer, leading to a stronger, more engaged community.',
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
