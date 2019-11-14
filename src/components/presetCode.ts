export const presetCode = [
  {
    text: 'Fix WhatsApp image backup',
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
    if (!settings.re.test(entry.name)) {
      return;
    }
    const exif = load(content);
    let dateStr = relativePath.split('-')[1];
    let year = parseInt(dateStr.substring(0, 4));
    let month = parseInt(dateStr.substring(4, 6));
    let day = parseInt(dateStr.substring(6));
    if (exif.Exif) {
      exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = year + ":" + settings.pad(month, 2) + ":" + settings.pad(day, 2) + " 00:00:00";
    } else {
      exif.Exif = {
        [TagValues.ExifIFD.DateTimeOriginal]: year + ":" + settings.pad(month, 2) + ":" + settings.pad(day, 2) + " 00:00:00",
      };
    }
    const exifBytes = dump(exif);
    content = insert(exifBytes, content);
    const name = entry.name.split('.');
    newZip.file(name[0] + '.' + name[1], content, { binary: true });
  }
}
`
  },
]