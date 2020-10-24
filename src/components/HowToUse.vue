<template>
  <b-col cols=8>
    <b-card title="How to use">
      <b-card-text>
        BATCHIFIER is a web app that runs purely in your browser and allows you to edit the EXIF data of your images.
        Regardless of the script you choose to run, the images have to be compressed into a zip-file.
        <br />
        <br />To zip your images simply select the images you want to edit and right click on them.
        On the menu select "send to" -> "Compressed (zipped) folder" (Windows). Mac/linux are similar, I am sure you will figure it out.
        Now, when the images are zipped, simply click on the "File input" box and select the zip file.
        Click process and hopefully everything will run fine and a download button will appear when done.
        <br />
        <br />If you are using Firefox, there is a file size limit of 800MB. For Chrome the limit is 2GB.
        For other browsers, the limit is unknown at the moment, so if you are having issues your best bet is to try to run it in either Firefox or Chrome.
        And for mobile browser, just... no.
        If you have issues running the application, try splitting the zip file into multiple smaller zip files that are under this limit.
      </b-card-text>
    </b-card>
  </b-col>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class HowToUse extends Vue {}
</script>