// const JSZip = require('jszip');
import JSZip, { JSZipObject, OutputType } from 'jszip';

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
    console.log(this.zip)
    const zipFile = (event as HTMLInputEvent).target.files![0]
    const reader = new FileReader();
    const decoded = await this.zip.loadAsync(zipFile);
    const fileList = decoded.forEach(async (relativePath, zipEntry) => {
      console.log(await this.decodeEntry(relativePath, zipEntry, 'text'))
    });
      // zip.loadAsync(file)
      // .then(function(zipFolder) {
      //     return zipFolder.forEach((relativePath, zipEntry) => {
      //         console.log(zipEntry.name);
      //         zipEntry.async('string').then((text) => {
      //             let newContent = text + ' YO!';
      //             zip.file(zipEntry.name, newContent);
      //         });
      //     });
      //     // zip_folder.file("test 1.txt").async("binary").then((text) => console.log(text)); // a promise of "Hello World\n"
      // }).then(() => {
      //     console.log('foreach done')
      // });
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
