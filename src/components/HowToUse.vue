<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>How to use</v-card-title>
          <v-card-text class="darken-2">
            BATCHIFIER is a web app that runs purely in your browser and allows you to edit the EXIF data of your images.
            Regardless of the script you choose to run, the images have to be compressed into a zip-file.
            <br />
            <br />To zip your images simply select the images you want to edit and right click on them.
            On the menu select "send to" -> "Compressed (zipped) folder" (Windows). Mac/linux are similar, I am sure you will figure it out.
            Now, when the images are zipped, simply click on the "File input" box and select the zip file.
            Click process and hopefully everything will run fine and a download button will appear when done.
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
export default class HowToUse extends Vue {}
</script>