import ZipEditor from './ZipEditor';
window.onload = function () {
    var editor = new ZipEditor();
    document.getElementById('file').addEventListener('change', editor.print, false);
};
//# sourceMappingURL=main.js.map