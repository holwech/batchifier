<template>
  <b-card title="About">
    <b-card-text>
      Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
      content.
    </b-card-text>

    <b-card-text>A second paragraph of text in the card.</b-card-text>

    <a href="#" class="card-link">Card link</a>
    <b-link href="#" class="card-link">Another link</b-link>
  </b-card>
  <!-- <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>About</v-card-title>
          <v-card-text class="darken-2">
            This tool was inspired by an
            <a
              href="https://holwech.github.io/blog/Fixing-WhatsApp-Backup/"
            >article I wrote</a> explaining how to fix lost EXIF data in images restored from backup for the messaging app WhatsApp.
            I wanted to create a simple tool that anyone could use, but at the time I found it too complicated to implement without having to process the images on a backend and therefore requiring me to spend money on hosting a server.
            Furthermore, I did not want to make the users have to upload their personal images to some unknown and potentially malicous server.
            <br />
            <br />In my article I created a simple script in Python that fixes the restored images.
            While it is fairly straight forward for most programmers to run this script, it is not that accessible for the average person.
            For most people, installing Python and then running a script would be too challenging for them to even consider trying it.
            The easiest and most accessible way to make this fix available, would be to run everything in the browser - no installations needed and no sharing of personal data.
            <br />
            <br />Thus, BATCHIFIER was born.
            Run fully in the browser, it is a powerful tool for anyone to run and share useful scripts for editing EXIF data.
            While this application definitely was more challenging to create than my initial Python script, I believe this tool can be of value not just for those who need to fix their restored images from WhatsApp, but also other to-be-discovered use-cases.
            Hope you find it useful!
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class About extends Vue {}
</script>