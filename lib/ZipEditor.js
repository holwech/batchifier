// import * as zip from 'jszip';
var JSZip = require('jszip');
var ZipEditor = /** @class */ (function () {
    function ZipEditor() {
        this.zip = new JSZip();
    }
    ZipEditor.prototype.print = function () {
        console.log('hi');
    };
    ZipEditor.prototype.test = function () {
        console.log(this.zip);
        this.zip.file('hello.txt', 'Hello[p my)6cxsw2q');
    };
    return ZipEditor;
}());
export default ZipEditor;
//# sourceMappingURL=ZipEditor.js.map