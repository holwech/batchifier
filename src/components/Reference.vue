<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Documentation</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <pre>template</pre>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              The top level structure must be of the following form:
              <pre>
{
  settings: {
    // content here
  },
  process: (relativePath, entry, content, newZip, settings) => {
    // function here
    // remember to save file to the new zip with the following line
    newZip.file(entry.name, content, { binary: true });
  }
}
              </pre>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <pre>settings</pre>
            </v-expansion-panel-header>
            <v-expansion-panel-content>Is run once and allows you to set create initial values, objects or functions that can be used when iterating through the images.</v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <pre>process</pre>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Is the main function that is run for each image in the input zip file. This functions must have the following input/output definition:
              <pre>

(relativePath: string,
 entry: JSZipObject,
 content: string,
 newZip: JSZip,
 settings: any) => string

 </pre>
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>JSZipObject</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <pre>


interface JSZipObject {
    name: string;
    dir: boolean;
    date: Date;
    comment: string;
    /** The UNIX permissions of the file, if any. */
    unixPermissions: number | string | null;
    /** The UNIX permissions of the file, if any. */
    dosPermissions: number | null;
}

                    </pre>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>JSZip</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <pre>

interface JSZip {
  file(name: string, content: string, type: object);
}

                    </pre>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <pre>global functions</pre>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              This site uses a
              <a
                href="https://github.com/holwech/piexif-ts"
              >modified Typescript version</a> of the original
              <a href="https://github.com/hMatoba/piexifjs">piexifjs</a> library
              to modify the EXIF data. They are very similar and work in the same way, but does have some slight differences. There are 3 functions available in the loop function that can be used to modify the EXIF values.
              Read the
              <a
                href="https://piexifjs.readthedocs.io/en/latest/index.html"
              >documentation</a> for the original code to understand how to use this library, but just be aware of this difference between the two.
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>load</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Loads the EXIF data of some content (image) and returns it as an IExif object
                    <pre>

load(content: string) => IExif

                    </pre>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>dump</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Returns a byte dump of the EXIF input object as a byte string
                    <pre>

dump(exif: IExif) => string

                    </pre>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>insert</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Saves the new EXIF data to the input content (image) and returns a byte string
                    <pre>

insert(exifBytes: string, content) => string

                    </pre>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <pre>TagValues</pre>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Defined the EXIF key values. This object is defined here:
                    <a
                      href="https://github.com/holwech/piexif-ts/blob/master/src/constants.ts#L11611"
                    >TagValues</a>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Reference extends Vue {}
</script>

<style>
.v-expansion-panel:before {
  box-shadow: none !important;
}
</style>
