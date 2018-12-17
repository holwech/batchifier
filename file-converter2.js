// create the blob object storing the data to compress
var blob = new Blob([ "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..." ], {
  type : "text/plain"
});
// creates a zip storing the file "lorem.txt" with blob as data
// the zip will be stored into a Blob object (zippedBlob)
zipBlob("lorem.txt", blob, function(zippedBlob) {
  // unzip the first file from zipped data stored in zippedBlob
  unzipBlob(zippedBlob, function(unzippedBlob) {
    // logs the uncompressed Blob
    console.log(unzippedBlob);
  });
});

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
  zip.createReader(new zip.BlobReader(blob), function(zipReader) {
    // get entries from the zip file
    zipReader.getEntries(function(entries) {
      // get data from the first file
      entries[0].getData(new zip.BlobWriter("text/plain"), function(data) {
        // close the reader and calls callback function with uncompressed data as parameter
        zipReader.close();
        callback(data);
      });
    });
  }, onerror);
}

function onerror(message) {
  console.error(message);
}
// --------------------------------------
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function handleFile(file) {
  let reader = new FileReader();
  reader.onload = function() {
    let blob = reader.result;
    zipBlob("lorem.txt", blob, function(zippedBlob) {
      // unzip the first file from zipped data stored in zippedBlob
      unzipBlob(zippedBlob, function(unzippedBlob) {
        // logs the uncompressed Blob
        console.log(unzippedBlob);
      });
    });
  };
  reader.readAsArrayBuffer(file)
}

function handleFiles(e) {
  let files = new e.target.files;
  for (let i = 0; i < files.length; i++) {
    handleFile(files[i]);
  }
}

window.onload = function() {
  zip.workerScriptsPath = 'lib/';
  document.getElementById('file').addEventListener('change', handleFile);
}