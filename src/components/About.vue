<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>About</v-card-title>
          <v-card-text class="darken-2">
            This tool was inspired by an <a href="https://holwech.github.io/blog/Fixing-WhatsApp-Backup/">article I wrote</a> that explained how to fix lost EXIF data in images restored from backup for the messaging WhatsApp.
            I wanted to create a simple tool that anyone could use, but at the time I found it too complicated to implement without having to process the images on a backend server, requiring me to spend money on hosting a web server that could handle the processing.
            Furthermore, I did not want to make the users have to upload their personal images to some unknown and potentially malicous server.
            <br />
            <br />In my article I created a simple script in Python that solves this problem, but while it is fairly straight forward for any programmer to run the script, it was not that accessible for the average person.
            For most people installing Python and then running a script would be too challenging for them to even consider it.
            I always felt that the easiest and most accessible would be to run everything in the browser - not downloads need and no sharing of personal data.
            <br />
            <br />Thus, BATCHIFIER was born.
            Run fully in the browser, it is a powerful tool for anyone to run and share useful scripts for editing EXIF data.
            While making this application definitely was more challenging to create than my initial Python script, it was also a much more interesting problem to solve.
            Hope you find it useful!
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
export default class About extends Vue {}
</script>