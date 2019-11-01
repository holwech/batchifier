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
          <v-card-text>
            <v-textarea
              ref="myTextArea"
              outlined
              name="input-7-4"
              label="Outlined textarea"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
            <v-card-text>
              <div id="code"></div>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CodeFlask from 'codeflask';
import JSZip, { JSZipObject } from 'jszip';

interface Code {
  settings: any;
  process: (
    relativePath: string,
    entry: JSZipObject,
    content: string,
    newZip: JSZip,
    settings: any,
  ) => Promise<void>;
}

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
    this.flask.onUpdate((el: string) => this.runCode(el));
  }

  private runCode(code: string) {
    const evaluated = (Function(`return (${code});`)() as Code);
    evaluated.settings();
  }
}
</script>

<style>
#code {
  min-height: 200px;
  overflow: hidden;
}

.codeflask {
  width: 400px;
  height: 200px;
}

.codeflask__pre,
.codeflask__code {
  height: 100%;
}

.codeflask__code {
  width: 100%;
}
</style>>
