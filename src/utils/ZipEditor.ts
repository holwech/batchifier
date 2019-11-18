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
      promises.push(new Promise(async (resolve) => {
        var content = await file.async('binarystring');
        code.process(relativePath, file, content, newZip, code.settings);
        payload.progress.count++;
        resolve();
      }));
    });
    await Promise.all(promises);
    const blob = await newZip.generateAsync({ type: 'blob' });
    return blob;
  }

  private evaluateCode(code: string): Code {
    return Function(
      'load', 'dump', 'insert', 'TagValues',
      ` "use strict";
      return (${code});
    `)(load, dump, insert, TagValues) as Code;
  }

  public processFile(
    relativePath: string,
    entry: JSZipObject,
    content: string,
    newZip: JSZip,
    settings: any,
  ): void {
    if (!settings.re.test(entry.name)) {
      return;
    }
    const exif = load(content);
    if (exif.Exif) {
      exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = '2010:10:10 10:10:10';
    } else {
      exif.Exif = {
        [TagValues.ExifIFD.DateTimeOriginal]: '2010:10:10 10:10:10',
      };
    }
    const exifBytes = dump(exif);
    content = insert(exifBytes, content);
    const name = entry.name.split('.');
    newZip.file(name[0] + '_modified.' + name[1], content, { binary: true });
  }

  public async decodeEntry(relativePath: string, zipEntry: JSZipObject, outputType: OutputType): Promise<FileContent> {
    const content = await zipEntry.async(outputType);
    return {
      name: zipEntry.name,
      relativePath,
      content,
      outputType,
    };
  }

  private setup(): { [key: string]: any } {
    return {
      re: /(.jpg|.png|.gif|.ps|.jpeg)$/,
    };
  }

  private loadFile(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event: Event) => {
        const decoder = new TextDecoder('utf-8');
        resolve(decoder.decode(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer((file as any) as Blob);
    });
  }
}
