const fs = require('fs').promises;
const path = require('path');

const rename = async () => {
    const oldFilePath = path.join(__dirname, 'wrongFilename.txt');
    const newFilePath = path.join(__dirname, 'properFilename.md');

    try {
        await fs.access(oldFilePath);

        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.rename(oldFilePath, newFilePath);
        console.log('File renamed successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await rename();