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


function handleClose(current, total) {
  console.log(fileCounter(current, total));
  if (current == total) {
    console.log('Done!');
  }
}

function handleInProgress(current, total) {
  // in progress current = num bytes, total = total bytes (I think)
}

function fileCounter(current, total) {
  return `Processing file ${current}/${total}`;
}

function getFilename(entry) {
  return entry.filename.substring(entry.filename.lastIndexOf("/") + 1);
}

function addFile(filename, content) {
  zip.createWriter(new zip.BlobWriter(), function(writer) {
    // use a TextReader to read the String to add
    writer.add(filename, new zip.TextReader(content), function() {
      // onsuccess callback

      // close the zip writer
      writer.close(function(blob) {
        readFiles(blob);
      });
    });
   }, handleInProgress, onerror);
}

function readAndEditBlob(el, reader, i, length, editFunc) {
  let filename = getFilename(el);
  el.getData(new zip.TextWriter(), function(data) {
    console.log(data);
    if (editFunc) {
      editFunc(filename, 'lool');
    }
    reader.close(handleClose(i + 1, length));
  }, handleInProgress);
}

function readAndEditFiles(file, editFunc) {
  zip.createReader(
    new zip.BlobReader(file), 
    function(reader) {
      reader.getEntries(function(entries) {
        let length = entries.length
        if (length) {
          entries.forEach(function(el, i) {
            readAndEditBlob(el, reader, i, length, editFunc);
          });
        }
      });
    },
    onerror
  );
}

function handleZip(e) {
  let file = e.target.files[0];
  readAndEditFiles(file, addFile);
}

window.onload = function() {
  zip.workerScriptsPath = '/lib/';
  document.getElementById('file').addEventListener('change', handleZip, false);
}

// function handleEntries(reader) {
//   reader.getEntries(function(entries) {
//     let length = entries.length
//     if (length) {
//       entries.forEach(function(el, i) {
//         let filename = getFilename(el);
//         el.getData(new zip.TextWriter(), function(data) {
//           console.log(data);
//           // addFile(filename, 'lool', data);
//           reader.close(handleClose(i + 1, length));
//         }, handleInProgress)
//       });
//     }
//   });
// }