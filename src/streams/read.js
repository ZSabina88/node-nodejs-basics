const fs = require('fs');

const read = async () => {
    const readableStream = fs.createReadStream('fileToRead.txt', { encoding: 'utf-8' });

    readableStream.pipe(process.stdout);

    return new Promise((resolve, reject) => {
        readableStream.on('end', resolve);
        readableStream.on('error', reject);
    }); 
};

await read();