import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import Main from './components/Main.vue';
import About from './components/About.vue';
import Privacy from './components/Privacy.vue';
import HowToUse from './components/HowToUse.vue';
import FAQ from './components/FAQ.vue';

Vue.use(VueRouter)

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
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');
