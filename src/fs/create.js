const fs = require('fs').promises;
const path = require('path');

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await fs.access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(filePath, content);
            console.log('File created successfully');
        } else {
            throw error;
        }
    }
};

await create();