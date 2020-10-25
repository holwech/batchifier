<template>
  <b-row class="justify-content-md-center">
    <b-col cols=6>
      <b-card title="FAQ">
        <hr>
        <b-card-title>Will you steal my pictures?</b-card-title>
        <b-card-text>No I will not and cannot. All pictures are processed in your browser and that is where they will stay.</b-card-text>
        <hr>
        <b-card-title>Are there any limitations in terms of the size of the zip file?</b-card-title>
        <b-card-text>
          Yes,
          <a href="https://github.com/eligrey/FileSaver.js/">there are</a>. I have not tested the limits so I do not know for sure, but probably max 800MB for Firefox and 2GB for Chrome. Feedback appreciated!
        </b-card-text>
        <hr>
        <b-card-title>Which browsers does this application support?</b-card-title>
        <b-card-text>Yes</b-card-text>
        <hr>
        <b-card-title>What is the tech stack used for this application?</b-card-title>
        <b-card-text>
          The frontend application is built using Vue + Typescript and Vuetify for components/styling.
          CodeFlask is used for the code editor.
          The application is hosted using Netlify.
        </b-card-text>
        <hr>
        <b-card-title>Why does the code editor look like crap?</b-card-title>
        <b-card-text>CSS 🤷‍♂️ Sadly, I could not figure out a way to stop Vuetify from messing with the CSS of the code editor, so I had to brute force a solution.</b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class FAQ extends Vue {}
</script>