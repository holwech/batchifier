<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">BATCHIFIER</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <span>batch edit EXIF data safe and securely in the browser</span>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button variant="link-dark" to="/howtouse">HOW TO USE</b-button>
          <b-button variant="outline-dark" @click="toggleShowScript">{{ showScript ? "HIDE" : "SHOW"}} SCRIPT VIEW</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>  
    <b-container id="main-container">
      <router-view :show-script="showScript"></router-view>
    </b-container>
  </div>
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
