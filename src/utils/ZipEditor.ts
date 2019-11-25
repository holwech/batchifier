// const JSZip = require('jszip');
import JSZip, { JSZipObject, OutputType } from 'jszip';
import { dump, load, insert, TagValues } from 'piexif-ts';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface FileContent {
  name: string;
  relativePath: string;
  content: any;
  outputType: OutputType;
}

export interface Code {
  settings: any;
  process: (
    relativePath: string,
    entry: JSZipObject,
    content: string,
    newZip: JSZip,
    settings: any,
  ) => Promise<void>;
}

export interface Payload {
  code: string;
  progress: {
    total: number;
    count: number;
    done: boolean;
    preparingDownload: boolean;
  }
}

export default class ZipEditor {
  public async openFile(file: File, payload: Payload): Promise<Blob> {
    const zip = new JSZip();
    const decoded = await zip.loadAsync(file);
    const code = this.evaluateCode(payload.code);

    const newZip = new JSZip();
    let count = 0;
    decoded.forEach(async () => count++);
    payload.progress.total = count;

    const promises = Array<Promise<void>>();
    decoded.forEach((relativePath: string, file: JSZipObject): void => {
      promises.push(new Promise(async (resolve, reject) => {
        try {
          var content = await file.async('binarystring');
          code.process(relativePath, file, content, newZip, code.settings);
          payload.progress.count++;
          resolve();
        } catch (e) {
          reject(e);
        }
      }));
    });
    await Promise.all(promises);
    payload.progress.done = true;
    payload.progress.preparingDownload = true;
    const blob = await newZip.generateAsync({ type: 'blob' });
    payload.progress.preparingDownload = false;
    return blob;
  }

  private evaluateCode(code: string): Code {
    return Function(
      'load', 'dump', 'insert', 'TagValues',
      ` "use strict";
      return (${code});
    `)(load, dump, insert, TagValues) as Code;
  }
}
