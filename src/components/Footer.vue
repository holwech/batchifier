<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn text rounded small class="my-2">About</v-btn>
      <v-btn text rounded small class="my-2">FAQ</v-btn>
      <v-btn text rounded small class="my-2">GitHub</v-btn>
      <v-btn text rounded small class="my-2">Contribute</v-btn>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Footer extends Vue {}
</script>
