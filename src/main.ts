import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './style.css';

const app = createApp(App);

// Create and use Pinia
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
