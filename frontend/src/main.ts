import 'vue-toast-notification/dist/theme-sugar.css';
import 'v-calendar/style.css';
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar';


import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(VCalendar, {});


app.mount('#app')
