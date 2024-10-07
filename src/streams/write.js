const fs = require('fs');

const write = async () => {
    const writableStream = fs.createWriteStream('fileToWrite.txt');
    process.stdin.pipe(writableStream);

    writableStream.on('finish', () => {
        console.log('Data has been written to fileToWrite.txt');
    });
};

await write();