<template>
  <b-navbar id="footer" variant="light" class="justify-content-md-center fixed-bottom">
    <b-button variant="link-dark" to="/about">About</b-button>
    <b-button variant="link-dark" to="/faq">FAQ</b-button>
    <b-button variant="link-dark" to="/privacy">Privacy</b-button>
    |
    <b-button variant="link-dark" href="https://github.com/holwech/batchifier" target="_blank">Github</b-button>
    <b-button variant="link-dark" href="https://holwech.github.io" target="_blank">Blog</b-button>
    <b-button variant="link-dark" href="https://www.pandemicstatus.today/" target="_blank">Pandemic status</b-button>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Footer extends Vue {}
</script>