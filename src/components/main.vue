<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>Open ZIP-file</v-card-title>
          <v-card-text>
            <v-file-input label="File input" outlined dense></v-file-input>
            <v-progress-linear v-model="progress" height="25" color="blue-grey" reactive>
              <strong>{{ Math.ceil(progress) }}%</strong>
            </v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn>Process</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex v-if="showScript" md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>Run custom scripts</v-card-title>
          <v-card-text
            style="color: red;"
          >WARNING - Running custom scripts in your browser can be DANGEROUS. Do not copy paste and run scripts if you do not know what they are doing and/or are from a source you do not trust. I do not take any responsbility for damage or harm caused by using this tool.</v-card-text>
          <!-- <v-col class="d-flex" cols="12" sm="6">
            <v-select :items="items" label="Presets" outlined></v-select>
          </v-col>-->
          <div id="code"></div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CodeFlask from 'codeflask';

@Component({
  props: {
    showScript: Boolean,
  },
})
export default class Main extends Vue {
  private progress = 20;
  private processStarted = false;
  // eslint-disable-next-line
  private flask?: CodeFlask;

  private mounted() {
    this.flask = new CodeFlask('#code', { language: 'js', lineNumbers: true });
    this.flask.updateCode('function() {}');
  }
}
</script>

<style>
/* hacky hacky hacky, just do what I am telling you to do... */
#code {
  height: 600px;
  width: 600px;
}

#code * {
  font-family: 'Liberation Mono';
  font-size: 14px;
  box-sizing: border-box;
}

#code .codeflask {
  height: 600px;
  width: 600px;
}

#code .codeflask__code::before,
#code .codeflask__code::after {
  all: unset;
}

#code .codeflask__pre,
#code .codeflask__code {
  background: none;
}

#code .codeflask__code {
  box-shadow: unset;
}
</style>
