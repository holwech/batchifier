export const whatsappFix = `
{
  settings: {
    re: /(.jpg|.png|.gif|.ps|.jpeg)$/,
  },
  process: (relativePath, entry, content, newZip, settings) => {
    if (settings.re.test(entry.name)) {
      return;
    }
    const exif = load(content);
    if (exif.Exif) {
      exif.Exif[TagValues.ExifIFD.DateTimeOriginal] = '2010:10:10 10:10:10';
    } else {
      exif.Exif = {
        [TagValues.ExifIFD.DateTimeOriginal]: '2010:10:10 10:10:10',
      };
    }
    const exifBytes = dump(exif);
    content = insert(exifBytes, content);
    const name = entry.name.split('.');
    newZip.file(name[0] + '_modified.' + name[1], content, { binary: true });
  }
}
`