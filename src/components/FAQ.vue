<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>FAQ</v-card-title>
          <v-card outlined class="mb-5">
            <v-card-title>Will you steal my pictures?</v-card-title>
            <v-card-text>No I will not and cannot. All pictures are processed in your browser and that is where they will stay.</v-card-text>
          </v-card>
          <v-card outlined class="mb-5">
            <v-card-title>Are there any limitations in terms of the size of the zip file?</v-card-title>
            <v-card-text>
              Yes,
              <a href="https://github.com/eligrey/FileSaver.js/">there are</a>. I have not tested the limits so I do not know for sure, but probably max 800MB for Firefox and 2GB for Chrome. Feedback appreciated!
            </v-card-text>
          </v-card>
          <v-card outlined class="mb-5">
            <v-card-title>Which browsers does this application support?</v-card-title>
            <v-card-text>Yes</v-card-text>
          </v-card>
          <v-card outlined class="mb-5">
            <v-card-title>What is the tech stack used for this application?</v-card-title>
            <v-card-text>
              The frontend application is built using Vue + Typescript and Vuetify for components/styling.
              CodeFlask is used for the code editor.
              The application is hosted using Netlify.
            </v-card-text>
          </v-card>
          <v-card outlined class="mb-5">
            <v-card-title>Why does the code editor look like crap?</v-card-title>
            <v-card-text>CSS 🤷‍♂️ Sadly, I could not figure out a way to stop Vuetify from messing with the CSS of the code editor, so I had to brute force a solution.</v-card-text>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class FAQ extends Vue {}
</script>