<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="mt-5 pa-10">
          <v-card-title>Privacy</v-card-title>
          <v-card-text class="darken-2">
            BATCHIFIER runs purely in your browser and thus your images are not at any point uploaded to some backend server or in any way stored externally.
            In case you do not trust me - disconnect your computer from the internet and you will see that the application runs perfectly without the connection :)
            <br />
            <br />Backend analytics from Netlify is used to track page views and traffic. No other tracking tools or cookies are used.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Privacy extends Vue {}
</script>