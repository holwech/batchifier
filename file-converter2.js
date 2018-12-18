function zipBlob(filename, blob, callback) {
  // use a zip.BlobWriter object to write zipped data into a Blob object
  zip.createWriter(new zip.BlobWriter("application/zip"), function(zipWriter) {
    // use a BlobReader object to read the data stored into blob variable
    zipWriter.add(filename, new zip.BlobReader(blob), function() {
      // close the writer and calls callback function
      zipWriter.close(callback);
    });
  }, onerror);
}

function unzipBlob(blob, callback) {
  // use a zip.BlobReader object to read zipped data stored into blob variable
y
}

// --------------------------------------
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

// function handleFile(e) {
//   let file = e.target.files[0]
//   zipBlob("lorem.txt", file, function(zippedBlob) {
//     // unzip the first file from zipped data stored in zippedBlob
//     unzipBlob(zippedBlob, function(unzippedBlob) {
//       // logs the uncompressed Blob

//       let reader = new FileReader();
//       reader.addEventListener('loadend', (e) => {
//         const text = e.srcElement.result;
//         console.log(text);
//       });
//       reader.readAsText(unzippedBlob);
//     });
//   });
// }

function onerror(message) {
  console.error(message);
}

function handleEntry() {
  console.log(text);
  reader.close(function() { });
}

function handleInProgress(current, total) {
  // inprogress
}

function handleEntries(reader) {
  reader.getEntries(function(entries) {
    if (entries.length) {
      entries.forEach(function(el) {
        el.getData(new zip.TextWriter(), handleEntry(text), handleInProgress(current, total))
      });
    }
  });
}

function handleFile(e) {
  let file = e.target.files[0]
  zip.createReader(new zip.BlobReader(blob), handleEntries(reader), onerror(error));
}

window.onload = function() {
  zip.workerScriptsPath = '/lib/';
  document.getElementById('file').addEventListener('change', handleFile, false);
}