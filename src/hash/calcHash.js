const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const calculateHash = async () => {
    const filePath = path.join(__dirname, 'fileToCalculateHashFor.txt');

    const fileStream = fs.createReadStream(filePath);

    const hash = crypto.createHash('sha256');

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        console.log(hash.digest('hex'));
    });

    fileStream.on('error', (err) => {
        console.error('Error reading file:', err);
    });
};

await calculateHash();