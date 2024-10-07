const fs = require('fs').promises;
const path = require('path');

const copy = async () => {
    const sourceFolder = path.join(__dirname, 'files');
    const destinationFolder = path.join(__dirname, 'files_copy');

    try {
        await fs.access(sourceFolder);

        try {
            await fs.access(destinationFolder);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.mkdir(destinationFolder);
        const files = await fs.readdir(sourceFolder);

        for (const file of files) {
            const sourceFilePath = path.join(sourceFolder, file);
            const destinationFilePath = path.join(destinationFolder, file);

            const stat = await fs.lstat(sourceFilePath);
            if (stat.isDirectory()) {
                await copyFolderRecursive(sourceFilePath, destinationFilePath);
            } else {
                await fs.copyFile(sourceFilePath, destinationFilePath);
            }
        }

        console.log('Folder copied successfully');
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw error;
        }
    }
};

const copyFolderRecursive = async (source, destination) => {
    await fs.mkdir(destination);
    const files = await fs.readdir(source);

    for (const file of files) {
        const sourceFilePath = path.join(source, file);
        const destinationFilePath = path.join(destination, file);

        const stat = await fs.lstat(sourceFilePath);
        if (stat.isDirectory()) {
            await copyFolderRecursive(sourceFilePath, destinationFilePath);
        } else {
            await fs.copyFile(sourceFilePath, destinationFilePath);
        }
    }
};

await copy();
