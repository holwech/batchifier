import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'
import Main from './components/Main.vue';
import About from './components/About.vue';
import Privacy from './components/Privacy.vue';
import HowToUse from './components/HowToUse.vue';
import FAQ from './components/FAQ.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/assets/style/main.scss';

Vue.use(VueRouter)

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

const routes = [
  { path: '', component: Main },
  { path: '/about', component: About },
  { path: '/privacy', component: Privacy },
  { path: '/howtouse', component: HowToUse },
  { path: '/faq', component: FAQ },
]

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
