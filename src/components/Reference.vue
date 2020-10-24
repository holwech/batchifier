<template>
  <div class="accordion" role="tablist" style="padding-bottom:20px;">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.accordion-1 variant="light">Documentation</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-title>
              <pre>template</pre>
          </b-card-title>
          <b-card-text>
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
          </b-card-text>
          <hr>
          <b-card-title>
            <pre>settings</pre>
          </b-card-title>
          <b-card-text>
            Is run once and allows you to set create initial values, objects or functions that can be used when iterating through the images.
          </b-card-text>
          <hr>
          <b-card-title>
            <pre>process</pre>
          </b-card-title>
          <b-card-text>
              Is the main function that is run for each image in the input zip file. This functions must have the following input/output definition:
              <pre>

(relativePath: string,
 entry: JSZipObject,
 content: string,
 newZip: JSZip,
 settings: any) => string

            </pre>
          </b-card-text>
          <b-card-sub-title>
            <pre>JSZipObject</pre>
          </b-card-sub-title>
          <b-card-text>
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
          </b-card-text>
          <b-card-sub-title>
            <pre>JSZip</pre>
          </b-card-sub-title>
          <b-card-text>
            <pre>
interface JSZip {
  file(name: string, content: string, type: object);
}
            </pre>
          </b-card-text>
          <hr>
          <b-card-title>
            <pre>global functions</pre>
          </b-card-title>
          <b-card-text>
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
          </b-card-text>
          <b-card-sub-title>
            <pre>load</pre>
          </b-card-sub-title>
          <b-card-text>
            Loads the EXIF data of some content (image) and returns it as an IExif object
            <pre>
load(content: string) => IExif
            </pre>
          </b-card-text>
          <b-card-sub-title>
            <pre>dump</pre>
          </b-card-sub-title>
          <b-card-text>
            Returns a byte dump of the EXIF input object as a byte string
            <pre>
dump(exif: IExif) => string
            </pre>
          </b-card-text>
          <b-card-sub-title>
            <pre>insert</pre>
          </b-card-sub-title>
          <b-card-text>
            Saves the new EXIF data to the input content (image) and returns a byte string
            <pre>
insert(exifBytes: string, content) => string
            </pre>
          </b-card-text>
          <b-card-sub-title>
            <pre>TagValues</pre>
          </b-card-sub-title>
          <b-card-text>
            Defined the EXIF key values. This object is defined here:
            <a
              href="https://github.com/holwech/piexif-ts/blob/master/src/constants.ts#L11611"
            >TagValues</a>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
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
