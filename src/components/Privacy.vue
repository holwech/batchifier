<template>
  <b-row class="justify-content-md-center">
    <b-col cols=6>
      <b-card title="Privacy">
        <b-card-text>
            BATCHIFIER runs purely in your browser and thus your images are not at any point uploaded to some backend server or in any way stored externally.
            In case you do not trust me - disconnect your computer from the internet and you will see that the application runs perfectly without the connection :)
            <br />
            <br />Backend analytics from Netlify is used to track page views and traffic. No other tracking tools or cookies are used.
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Privacy extends Vue {}
</script>