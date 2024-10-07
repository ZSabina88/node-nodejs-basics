const fs = require('fs');
const zlib = require('zlib');

const decompress = async () => {
    const gunzip = zlib.createGunzip();
    const source = fs.createReadStream('archive.gz');
    const destination = fs.createWriteStream('fileToCompress.txt');

    source.pipe(gunzip).pipe(destination);

    destination.on('finish', () => {
        console.log('File has been decompressed back to fileToCompress.txt');
    });
};

await decompress();