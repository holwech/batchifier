// const JSZip = require('jszip');
import JSZip, { JSZipObject, OutputType } from 'jszip';
import { dump, load, insert, TagValues } from 'piexif-ts';
import fileSaver from 'file-saver';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface File {
  name: string,
  relativePath: string,
  content: any,
  outputType: OutputType,
}

export default class ZipEditor {

  // public async openFileTest(event: Event): Promise<void> {
  //   const zipFile = (event as HTMLInputEvent).target.files![0]
  //   const file = await this.loadFile(zipFile);
  //   console.log(zipFile.name);
  //   console.log(file);
  //   const exif = load(file as string);
  //   console.log(exif);
  //   //const decoded = await this.zip.loadAsync(zipFile);
  // }

  public async openFile(event: Event): Promise<void> {

    const zip = new JSZip();
    const zipFile = (event as HTMLInputEvent).target.files![0]
    const decoded = await zip.loadAsync(zipFile);
    const re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
    //  decoded.forEach(async (relativePath: string, entry: JSZipObject) => {
    //   console.log(await this.decodeEntry(relativePath, entry, 'text'));
    //  });
    
    const promises = Array<Promise<void>>();
    const newZip = new JSZip();
    decoded.forEach((relativePath: string, entry: JSZipObject) => {
      if (re.test(entry.name)) {
        console.log(entry.date);
        
        promises.push(this.processFile(relativePath, entry, newZip));
      }
    });
    await Promise.all(promises);
    const blob = await newZip.generateAsync({ type: 'blob' });
    fileSaver.saveAs(blob, 'generated.zip');
  }

  public async processFile(relativePath: string, zipEntry: JSZipObject, newZip: JSZip): Promise<void> {
    
    const file = await this.decodeEntry(relativePath, zipEntry, 'binarystring');
    const exif = load(file.content);
    
    if (exif.Exif) {
      exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = '2010:10:10 10:10:10';
    } else {
      exif.Exif = {
        [TagValues.ExifIFD.DateTimeOriginal]: '2010:10:10 10:10:10',
      }
    }
    const exifBytes = dump(exif);
    file.content = insert(exifBytes, file.content);
    const name = file.name.split('.');
    newZip.file(name[0] + '_modified.' + name[1], file.content, { binary: true });
  }

  public async decodeEntry(relativePath: string, zipEntry: JSZipObject, outputType: OutputType): Promise<File> {
    const content = await zipEntry.async(outputType);
    return {
      name: zipEntry.name,
      relativePath,
      content,
      outputType
    }
  }

  private loadFile(file: File): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event: Event) => {
        const decoder = new TextDecoder('utf-8');
        resolve(decoder.decode(reader.result as ArrayBuffer));
      };
      reader.readAsArrayBuffer(file as any as Blob);
    });
  }
}
