import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './style.css';
import { showConsoleEasterEgg } from "./consoleEasterEgg.ts";

if (import.meta.env.PROD) {
  showConsoleEasterEgg();
}

const app = createApp(App);

// Create and use Pinia
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
