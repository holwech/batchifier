function handleFile(file) {
    let reader = new FileReader();
    reader.onload = function() {
        let blob = reader.result;
        console.log(blob)
    };
    reader.readAsArrayBuffer(file)
}

function handleFiles(e) {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        handleFile(files[i]);
    }
}

window.onload = function() {
    // zip.workerScriptsPath = '/lib/';
    document.getElementById('file').addEventListener('change', handleFiles);
}