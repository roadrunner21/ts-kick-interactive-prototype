// src/main.ts

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';
import GlitchDirective from './directives/glitch';
import { showConsoleEasterEgg } from './consoleEasterEgg';
import { createChatLogic } from './chatLogic';

// Import GSAP and its plugins
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

if (import.meta.env.PROD) {
  showConsoleEasterEgg();
}

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const chatLogic = createChatLogic(pinia);
app.provide('chatLogic', chatLogic);

app.directive('glitch', GlitchDirective);

app.mount('#app');
