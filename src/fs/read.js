const fs = require('fs').promises;
const path = require('path');

const read = async () => {
    const filePath = path.join(__dirname, 'fileToRead.txt');

    try {
        await fs.access(filePath);

        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await read();