const fs = require('fs').promises;
const path = require('path');

const list = async () => {
    const folderPath = path.join(__dirname, 'files');

    try {
        await fs.access(folderPath);

        const files = await fs.readdir(folderPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

await list();