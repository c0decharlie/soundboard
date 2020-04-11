const express = require('express');
const router = express.Router();

const { readFile, writeFile, unlinkFile } = require('../utils/file');
const { audioFileStoragePath, audioFilePublicDirectory, audioFileUploadDirectory } = require('../configs/file');

const upload = require('../configs/upload');

async function saveFile(file) {
    const fileContent = await readFile(audioFileStoragePath);
    const isFileExisting = fileContent.some(readFile => readFile.originalname === file.originalname);

    if (isFileExisting) {
        const error = new Error('File already exists');
        error.statusCode = 409;
        return error;
    }

    file.publicPath = `${audioFilePublicDirectory}/${file.filename}`;

    const files = [...fileContent, file];
    
    try {
        await writeFile(audioFileStoragePath, files);
    } catch(error) {
        return error;
    }
}

async function deleteFile(fileName) {
    const fileContent = await readFile(audioFileStoragePath);
    const audioFileToDelete = fileContent.filter(file => file.originalname === fileName)[0];

    if (!audioFileToDelete) {
        const error = new Error('File does not exist.');
        error.statusCode = 404;
        return error;
    }

    const fileToDeletePath = `${audioFileUploadDirectory}/${audioFileToDelete.filename}`;
    const decreasedFile = fileContent.filter(file => file.originalname !== fileName);

    try {
        await unlinkFile(fileToDeletePath);
        await writeFile(audioFileStoragePath, decreasedFile);
    } catch(error) {
        return error;
    }
}

router.post('/upload-audio', upload.single('audio'), async (req, res, next) => {
    const file = req.file;
    const error = await saveFile(file);

    if (error && error.message) {
        return next(error);
    }

    res.status(200).send({ 
        message: `File ${file.originalname} successfully uploaded.`,
        file
    });
});

router.delete('/delete', async (req, res, next) => {
    const fileName = req.body.fileName;
    const error = await deleteFile(fileName);

    if (error && error.message) {
        return next(error);
    }

    res.sendStatus(204);
});

router.get('/all', async (req, res, next) => {
    const allAudioFiles = await readFile(audioFileStoragePath);
    res.status(200).send(JSON.stringify(allAudioFiles));
});

module.exports = router;
 