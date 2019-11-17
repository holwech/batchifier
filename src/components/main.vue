<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-center grid-list-xl>
      <v-flex md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>Open ZIP-file</v-card-title>
          <v-card-subtitle>Create your own scripts by clicking "Show script view" in the top right corner or select one of the preset script from below.</v-card-subtitle>
          <v-flex>
            <v-select
              v-model="selectedPreset"
              :items="presetCode"
              outlined
              label="Presets"
              @change="setPresetCode"
            ></v-select>
          </v-flex>
          <v-divider></v-divider>
          <v-card-text class="pt-5">
            <v-file-input outlined dense label="File input" accept=".zip" @change="openFile"></v-file-input>
            <v-progress-linear
              v-if="progress.started"
              v-model="getProgress"
              height="25"
              :color="getProgress == 100 ? 'green' : 'blue-grey'"
              reactive
            >
              <strong>{{ getProgress }}%</strong>
            </v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!appState.fileAdded" @click="process">{{ processBtnText }}</v-btn>
            <v-btn v-if="progress.done" class="success" @click="download">Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex :class="{ hide: !showScript }" md6>
        <v-card class="pa-5 mt-5">
          <v-card-title>Run custom scripts</v-card-title>
          <v-card-text
            style="color: red;"
          >WARNING - Running custom scripts in your browser can be DANGEROUS. Do not copy paste and run scripts if you do not know what they are doing and/or are from a source you do not trust. I do not take any responsbility for damage or harm caused by using this tool.</v-card-text>
          <v-row class="pb-5">
            <v-col md-12>
              <Reference></Reference>
            </v-col>
          </v-row>
          <v-row class="pt-5">
            <v-col md-9>
              <v-select
                v-model="selectedPreset"
                :items="presetCode"
                outlined
                label="Presets"
                @change="setPresetCode"
              ></v-select>
            </v-col>
            <v-col md-3>
              <v-btn
                :class="{ error: appState.invalidCode, success: !appState.invalidCode }"
                class="mb-2"
                text
              >{{ appState.invalidCode ? 'Invalid' : 'Valid' }}</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <div id="code"></div>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CodeFlask from 'codeflask';
import ZipEditor, { Payload, Code } from './ZipEditor';
import { presetCode } from './presetCode';
import fileSaver from 'file-saver';
import Reference from './Reference.vue';

@Component({
  props: {
    showScript: Boolean,
  },
  components: {
    Reference,
  },
})
export default class Main extends Vue {
  private processStarted = false;
  private flask?: CodeFlask;
  private zipEditor: ZipEditor = new ZipEditor();
  private file?: File;
  private processBtnText = 'Process';
  private appState = {
    invalidCode: false,
    fileAdded: false,
    showScriptWindow: false,
  };
  private progress = {
    total: 0,
    count: 0,
    done: false,
    started: false,
  };
  private blob?: Blob;
  private presetCode = presetCode.map(element => element.text);
  private selectedPreset = presetCode[0].text;

  private mounted() {
    this.flask = new CodeFlask('#code', { language: 'js', lineNumbers: true });
    this.flask.updateCode(presetCode[0].value);
    this.flask.onUpdate(() => this.evaluateCode());
  }

  private setPresetCode(selected: string) {
    console.log(selected);
    var code = presetCode.find(el => el.text === selected);
    if (code) {
      this.flask!.updateCode(code.value);
    }
  }

  private process() {
    this.progress = {
      total: 0,
      count: 0,
      done: false,
      started: true,
    };
    const payload: Payload = {
      code: this.flask!.getCode(),
      progress: this.progress,
    };
    this.zipEditor.openFile(this.file!, payload).then(blob => {
      this.blob = blob;
      this.progress.done = true;
    });
  }

  private download() {
    if (this.blob) {
      fileSaver.saveAs(this.blob, 'generated.zip');
    } else {
      throw new Error('Blob not defined');
    }
  }

  private evaluateCode(): Code | undefined {
    try {
      this.appState.invalidCode = false;
      return Function(`"use strict";return (${this.flask!.getCode()});`)() as Code;
    } catch (error) {
      this.appState.invalidCode = true;
      this.appState.fileAdded = false;
      console.log(error);
      return;
    }
  }

  private openFile(event: File) {
    this.file = event;
    this.appState.fileAdded = true;
    this.evaluateCode();
    this.progress = {
      total: 0,
      count: 0,
      done: false,
      started: false,
    };
  }

  get getProgress() {
    if (this.progress.total == 0) {
      return 0;
    } else {
      return Math.ceil((this.progress.count / this.progress.total) * 100);
    }
  }
}
</script>

<style>
/* just do what I am telling you to do... */
#code {
  height: 600px;
  width: 600px;
}

.hide {
  display: none;
}

#code * {
  font-family: 'Liberation Mono';
  font-size: 14px;
  box-sizing: border-box;
}

#code .codeflask {
  height: 600px;
  width: 800px;
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

.v-expansion-panel:before {
  box-shadow: none !important;
}
</style>
