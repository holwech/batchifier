// const JSZip = require('jszip');
import JSZip, { JSZipObject, OutputType } from 'jszip';
import { IExif, TagValues, IExifElement, dump, load, insert } from 'piexif-ts';
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
  private zip = new JSZip();

  public async openFile(event: Event): Promise<void> {
    const zipFile = (event as HTMLInputEvent).target.files![0]
    const reader = new FileReader();
    const decoded = await this.zip.loadAsync(zipFile);
    const re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
    const files: File[] = [];
    decoded.forEach(async (relativePath: string, entry: JSZipObject) => {
      if (re.test(entry.name)) {
        console.log(entry.name)
        files.push(await this.processFile(relativePath, entry));
      }
    });
    
    for (const file of files) {
      this.zip.folder('modified').file(file.name, file.content, {binary: true});
    }
    const blob = await this.zip.generateAsync({ type: 'blob' });
    //fileSaver.saveAs(blob, 'generated.zip');
  }

  public async processFile(relativePath: string, zipEntry: JSZipObject): Promise<File> {
    const file = await this.decodeEntry(relativePath, zipEntry, 'binarystring');
    const exif = load(file.content);
    console.log(exif);
    if (exif.Exif) {
      exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = '2010:10:10 10:10:10';
    } else {
      exif.Exif = {
        [TagValues.ExifIFD.DateTimeOriginal]: '2010:10:10 10:10:10',
      } 
    }
    const exifBytes = dump(exif);
    insert(exifBytes, file.content);
    return file;
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
}
