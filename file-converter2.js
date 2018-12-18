const DEBUG = true;

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

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
  if (DEBUG) {
    console.log('New files contain:')
  }
  zip.createWriter(new zip.BlobWriter(), function(writer) {
    // use a TextReader to read the String to add
    writer.add(filename, new zip.TextReader(content), function() {
      // onsuccess callback

      // close the zip writer
      writer.close(function(blob) {
        readAndEditFiles(blob, undefined, false);
      });
    });
   }, handleInProgress, onerror);
}

function readAndEditBlob(el, reader, i, length, editFunc, showFileCounter = true) {
  let filename = getFilename(el);
  el.getData(new zip.TextWriter(), function(data) {
    if (DEBUG) {
      console.log('File content of zip file is:')
      console.log(data);
    }
    if (editFunc) {
      editFunc(filename, 'lool');
    }
    reader.close(function() {
      if (showFileCounter) { handleClose(i + 1, length); }
    });
  }, handleInProgress);
}

function readAndEditFiles(file, editFunc, showFileCounter = true) {
  zip.createReader(
    new zip.BlobReader(file), 
    function(reader) {
      reader.getEntries(function(entries) {
        let length = entries.length
        if (length) {
          entries.forEach(function(el, i) {
            readAndEditBlob(el, reader, i, length, editFunc, showFileCounter);
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