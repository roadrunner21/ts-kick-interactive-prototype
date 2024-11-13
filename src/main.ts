// src/main.ts

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './style.css';
import { showConsoleEasterEgg } from './consoleEasterEgg';
import { createChatLogic } from './chatLogic';

if (import.meta.env.PROD) {
  showConsoleEasterEgg();
}

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

const chatLogic = createChatLogic(pinia);
app.provide('chatLogic', chatLogic);

app.mount('#app');
