<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn text rounded small class="my-2" to="/about">About</v-btn>
      <v-btn text rounded small class="my-2" to="/faq">FAQ</v-btn>
      <v-btn text rounded small class="my-2" to="/privacy">Privacy</v-btn>
      <v-btn
        text
        rounded
        small
        class="my-2"
        href="https://github.com/holwech/batchifier"
        target="_blank"
      >GitHub</v-btn>
      <v-btn
        text
        rounded
        small
        class="my-2"
        href="https://github.com/holwech/batchifier"
        target="blank"
      >Contribute</v-btn>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Footer extends Vue {}
</script>