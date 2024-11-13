// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './style.css';
import { showConsoleEasterEgg } from './consoleEasterEgg';
import { createChatLogic } from './chatLogic'; // Use the new createChatLogic function

if (import.meta.env.PROD) {
  showConsoleEasterEgg();
}

const app = createApp(App);

// Create and use Pinia
const pinia = createPinia();
app.use(pinia);

// Initialize chat logic
const chatLogic = createChatLogic(pinia); // Initialize chat logic here

app.provide('chatLogic', chatLogic); // Provide chatLogic to components

app.mount('#app');
