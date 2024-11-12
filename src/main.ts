// src/main.ts

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './style.css';
import { showConsoleEasterEgg } from './consoleEasterEgg';
import { initializeChatLogic } from './chatLogic';

if (import.meta.env.PROD) {
  showConsoleEasterEgg();
}

const app = createApp(App);

// Create and use Pinia
const pinia = createPinia();
app.use(pinia);

// Initialize chat logic with pinia
initializeChatLogic(pinia);

app.mount('#app');
