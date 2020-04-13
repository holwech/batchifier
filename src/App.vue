<template>
  <v-app>
    <v-app-bar app>
      <router-link class="toolbar-title" to="/">
        <v-toolbar-title class="headline text-uppercase">
          <span class="font-weight-light">BATCHIFIER</span>
        </v-toolbar-title>
      </router-link>
      <div
        class="subheading pl-5 font-weight-light"
      >batch edit EXIF data safe and securely in the browser</div>
      <v-spacer />
      <v-btn text to="/howtouse" class="mr-3">How to use</v-btn>
      <v-btn outlined @click="toggleShowScript">{{ showScript ? "Hide" : "Show"}} script view</v-btn>
    </v-app-bar>
    <v-content>
      <router-view :show-script="showScript"></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';

import Component from 'vue-class-component';

@Component({
  components: {
    Main,
    Footer,
  },
})
export default class App extends Vue {
  private showScript = false;

  private toggleShowScript() {
    this.showScript = !this.showScript;
  }
}
</script>

<style>
.toolbar-title {
  color: inherit !important;
  text-decoration: inherit;
}
</style>
