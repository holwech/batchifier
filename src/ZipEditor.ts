// import * as zip from 'jszip';
const JSZip = require('jszip');

export default class ZipEditor {
  private zip = new JSZip();
  public print(): void {
    console.log('hi');
  }

  public test(): void {
    console.log(this.zip);
    this.zip.file('hello.txt', 'Hello[p my)6cxsw2q');
  }
}