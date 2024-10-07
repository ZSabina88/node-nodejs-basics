const fs = require('fs').promises;
const path = require('path');

const remove = async () => {
    const filePath = path.join(__dirname, 'fileToRemove.txt');

    try {
        await fs.access(filePath);

        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await remove();