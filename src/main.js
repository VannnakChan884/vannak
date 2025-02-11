import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './registerServiceWorker'

const app = createApp(App)

app.use(router)

app.mount('#app')

AOS.init({})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then((registration) => {
        console.log('Service Worker registered with scope: ', registration.scope);
      }).catch((error) => {
        console.log('Service Worker registration failed: ', error);
      });
    });
  }
  