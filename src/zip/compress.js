const fs = require('fs');
const zlib = require('zlib');

const compress = async () => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream('fileToCompress.txt');
    const destination = fs.createWriteStream('archive.gz');

    source.pipe(gzip).pipe(destination);

    destination.on('finish', () => {
        console.log('File has been compressed to archive.gz');
    });
};

await compress();