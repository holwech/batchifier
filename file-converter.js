function handleFile(e, new_path) {
    var zip = new JSZip();
    let file = e.target.files[0];
    let reader = new FileReader();

    zip.folder(new_path);
    zip.loadAsync(file)
    .then(function(zipFolder) {
        return zipFolder.forEach((relativePath, zipEntry) => {
            console.log(zipEntry.name);
            zipEntry.async('string').then((text) => {
                let newContent = text + ' YO!';
                zip.file(zipEntry.name, newContent);
            });
        });
        // zip_folder.file("test 1.txt").async("binary").then((text) => console.log(text)); // a promise of "Hello World\n"
    }).then(() => {
        console.log('foreach done')
    });
}

window.onload = function() {
    document.getElementById('file').addEventListener('change', handleFile, false);
}