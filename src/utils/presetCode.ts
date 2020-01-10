export const presetCode = [
  {
    text: 'WhatsApp backup fix',
    description: 'This preset fixes the date taken field for images that are restored from backup for WhatsApp on Android. See the <a href="https://holwech.github.io/blog/Fixing-WhatsApp-Backup/" target="_blank">following article</a> for more information.',
    value: `{
  settings: {
    re: /(.jpg|.png|.gif|.jpeg)$/,
    pad: function pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
  },
  process: (relativePath, entry, content, newZip, settings) => {
    let dateStr = relativePath.split(/[_-]/)[1];
    let year = parseInt(dateStr.substring(0, 4));
    let month = parseInt(dateStr.substring(4, 6));
    let day = parseInt(dateStr.substring(6));
    if (settings.re.test(entry.name)) {
      const exif = load(content);
      if (exif.Exif) {
        if (!exif.Exif[TagValues.ExifIFD.DateTimeOriginal]) {
          exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = year + ":" + settings.pad(month, 2) + ":" + settings.pad(day, 2) + " 00:00:00";
        }
      } else {
        exif.Exif = {
          [TagValues.ExifIFD.DateTimeOriginal]: year + ":" + settings.pad(month, 2) + ":" + settings.pad(day, 2) + " 00:00:00",
        };
      }
      const exifBytes = dump(exif);
      content = insert(exifBytes, content);
    }
    newZip.file(entry.name, content, { binary: true, date: new Date(year, month - 1, day, 0 - new Date().getTimezoneOffset() / 60, 0, 0) });
  }
}
`
  },
  {
    text: 'Strip all EXIF',
    description: 'Removes all EXIF data from all images.',
    value: `{
  settings: {
    re: /(.jpg|.png|.gif|.jpeg)$/,
  },
  process: (relativePath, entry, content, newZip, settings) => {
    if (!settings.re.test(entry.name)) {
      return;
    }
    const exifBytes = dump({});
    content = insert(exifBytes, content);
    newZip.file(entry.name, content, { binary: true });
  }
}
`
  },
  {
    text: 'Strip date taken EXIF',
    description: 'Removes the date taken information from all images.',
    value: `{
  settings: {},
  process: (relativePath, entry, content, newZip, settings) => {
    const exif = load(content);
    if (exif.Exif && exif.Exif[TagValues.ExifIFD.DateTimeOriginal]) {
      delete exif.Exif[TagValues.ExifIFD.DateTimeOriginal];
    }
    const exifBytes = dump(exif);
    content = insert(exifBytes, content);
    newZip.file(entry.name, content, { binary: true });
  }
}
`
  },
]