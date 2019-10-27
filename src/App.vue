<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Batch image EXIF processor</span>
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-btn text
href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>-->
      <v-btn outlined @click="toggleShowScript">{{ showScript ? "Hide" : "Show"}} script view</v-btn>
    </v-app-bar>
    <v-content>
      <Main :show-script="showScript" />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Main from './components/main.vue';

import Component from 'vue-class-component';

@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {
  private showScript = true;

  private toggleShowScript() {
    this.showScript = !this.showScript;
  }
}
</script>
