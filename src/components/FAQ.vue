<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>FAQ</v-card-title>
          <v-card outlined>
            <v-card-title>Will you steal my pictures?</v-card-title>
            <v-card-text>No I will not and cannot. All pictures are processed in your browser and that is where they will stay.</v-card-text>
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