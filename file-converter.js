function handleFile(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function() {
        let blob = reader.result;
        console.log(blob)
    };
    reader.readAsArrayBuffer(file)
}

window.onload = function() {
    document.getElementById('file').addEventListener('change', handleFile, false);
}