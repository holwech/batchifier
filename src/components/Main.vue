<template>
  <b-row class="justify-content-md-center">
    <b-col cols=6>
      <b-card title="Open ZIP file" sub-title="Create your own scripts by clicking 'Show script view' in the top right corner or select one of the preset scripts from below.">
        <b-form-group
          id="input-code-select"
          label="Presets"
          label-for="code-select"
        >
          <b-form-select
            v-model="selectedPreset"
            :options="presetCode"
            outlined
            label="Presets"
            class="mb-1"
            id="code-select"
            @change="setPresetCode"
          ></b-form-select>
        </b-form-group>
        <b-card-body>
          <b-card-title>
            Description
          </b-card-title> 
          <b-card-text
            v-html="selectedPresetDescription"
          >
          </b-card-text>
        </b-card-body>
        <hr>
        <b-form-file
          @input="openFile"
          placeholder="Choose a ZIP file or drop it here..."
          drop-placeholder="Drop ZIP here..."
          accept=".zip"
        ></b-form-file>
        <b-card-text>
          <b-alert :show="appState.showAlert" variant="danger" style="margin-top: 10px;">{{alertMessage}}</b-alert>
          <b-progress
            v-if="progress.started && !appState.showAlert"
            :value="getProgress"
            show-value
            :variant="getProgress == 100 ? 'success' : 'dark'"
            style="margin-top: 10px;"
          ></b-progress>
        </b-card-text>
        <b-button :disabled="!appState.fileAdded" @click="process">{{ processBtnText }}</b-button>
        <b-button
          v-if="progress.done"
          :disabled="progress.preparingDownload"
          variant="success"
          @click="download"
          style="margin-left: 10px;"
        >
          <b-spinner small v-if="progress.preparingDownload" label="Spinning"></b-spinner>
          {{ progress.preparingDownload ? "Preparing download..." : "Download" }}
        </b-button>
      </b-card>
    </b-col>
    <b-col cols=6 :class="{ hide: !showScript }">
      <b-card title="Run custom scripts">
        <b-card-text
          style="color: red !important;"
        >WARNING - Running custom scripts in your browser can be DANGEROUS. Do not copy paste and run scripts if you do not know what they are doing and/or are from a source you do not trust. I do not take any responsbility for damage or harm caused by using this tool.</b-card-text>
        <Reference></Reference>
        <hr>
        <b-row align-v="center">
          <b-col>
            <b-form-group
              id="input-code-select"
              label="Presets"
              label-for="code-select"
            >
              <b-form-select
                v-model="selectedPreset"
                :options="presetCode"
                outlined
                label="Presets"
                @change="setPresetCode"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-btn
              :class="{ error: appState.invalidCode, success: !appState.invalidCode }"
              :variant="appState.invalidCode ? 'danger' : 'success'"
              class="mb-2"
              text
            >{{ appState.invalidCode ? 'Invalid' : 'Valid' }}</b-btn>
          </b-col>
        </b-row>
        <b-row>
          <b-alert :show="appState.showCodeError" variant="danger">{{codeErrorMessage}}</b-alert>
        </b-row>
        <b-row>
          <div id="code"></div>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CodeFlask from 'codeflask';
import ZipEditor, { Payload, Code } from '../utils/ZipEditor';
import { presetCode } from '../utils/presetCode';
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
  private alertMessage = '';
  private codeErrorMessage = '';
  private appState = {
    invalidCode: false,
    fileAdded: false,
    showScriptWindow: false,
    showAlert: false,
    showCodeError: false,
  };
  private progress = {
    total: 0,
    count: 0,
    done: false,
    preparingDownload: false,
    started: false,
  };
  private blob?: Blob;
  private presetCode = presetCode.map(element => element.text);
  private selectedPreset = presetCode[0].text;
  private selectedPresetDescription = presetCode[0].description;
  private showReference: boolean = false;

  private mounted() {
    this.flask = new CodeFlask('#code', { language: 'js', lineNumbers: true });
    this.flask.updateCode(presetCode[0].value);
    this.flask.onUpdate(() => this.evaluateCode());
  }

  private setPresetCode(selected: string) {
    console.log(selected);
    var code = presetCode.find(el => el.text === selected);
    this.selectedPresetDescription = presetCode.find(el => el.text === selected)!.description;
    if (code) {
      this.flask!.updateCode(code.value);
    }
  }

  private process() {
    this.progress = {
      total: 0,
      count: 0,
      done: false,
      preparingDownload: false,
      started: true,
    };
    const payload: Payload = {
      code: this.flask!.getCode(),
      progress: this.progress,
    };
    this.zipEditor
      .openFile(this.file!, payload)
      .then(blob => {
        this.blob = blob;
      })
      .catch(reason => {
        console.error(reason);
        this.alertMessage = reason;
        this.appState.showAlert = true;
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
      this.appState.showCodeError = false;
      return Function(`"use strict";return (${this.flask!.getCode()});`)() as Code;
    } catch (error) {
      this.appState.invalidCode = true;
      this.codeErrorMessage = error;
      this.appState.showCodeError = true;
      this.appState.fileAdded = false;
      console.log(error);
      return;
    }
  }

  private openFile(event: File) {
    console.log(event)
    this.file = event;
    this.appState.fileAdded = true;
    this.appState.showAlert = false;
    this.evaluateCode();
    this.progress = {
      total: 0,
      count: 0,
      done: false,
      preparingDownload: false,
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
  font-size: 14px;
  box-sizing: border-box;
}

#code .codeflask {
  height: 600px;
  width: 98%;
}


.hide {
  visibility: hidden;
}
</style>

