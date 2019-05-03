import ZipEditor from './ZipEditor';

window.onload = () => {
  const editor = new ZipEditor();
  document.getElementById('file')!.addEventListener('change', editor.openFile.bind(editor), false);
}