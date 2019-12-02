const fs = require('fs');

const express = require('express');
const router = express.Router();

const { readFile, writeFile, unlinkFile } = require('../utils/file');
const { audioFileStoragePath, audioFilePublicDirectory, audioFileUploadDirectory } = require('../configs/file');

const upload = require('../configs/upload');

async function saveFile(file) {
    const fileContent = await readFile(audioFileStoragePath);
    const isFileExisting = fileContent.some(readFile => readFile.originalname === file.originalname);

    if (isFileExisting) {
        const error = 'File already exists';
        console.log(error);
        return { status: 409, error };
    }

    file.publicPath = `${audioFilePublicDirectory}/${file.filename}`;

    const files = [...fileContent, file];
    
    try {
        await writeFile(audioFileStoragePath, files);
    } catch(error) {
        console.log(`File save error: ${error}`);
        return { error };
    }
}

async function deleteFile(fileName) {
    const fileContent = await readFile(audioFileStoragePath);
    const audioFileToDelete = fileContent.filter(file => file.originalname === fileName)[0];

    if (!audioFileToDelete) {
        const error = 'File does not exist.';
        console.log(error);
        return { status: 404, error };
    }

    const fileToDeletePath = `${audioFileUploadDirectory}/${audioFileToDelete.filename}`;
    const decreasedFile = fileContent.filter(file => file.originalname !== fileName);

    try {
        await unlinkFile(fileToDeletePath);
        await writeFile(audioFileStoragePath, decreasedFile);
    } catch(error) {
        console.log(`File ${audioFileToDelete} deletion error: ${error}`);
        return { error };
    }
}

router.post('/upload-audio', upload.single('audio'), (req, res, next) => {
    const { error } = saveFile(req.file);

    // Uncomment after frontend can handle it
    // if (error) {
    //     return res.status(500).json(error);
    // }

    res.redirect('/');
});

router.post('/delete', (req, res, next) => {
    const fileName = req.body.fileName;
    const { status, error } = deleteFile(fileName);
    
    if (error) {
        const errorCode = status || 500;
        return res.status(errorCode).json({error});
    }

    return res.status(204).redirect('/');
});

router.post('/all', async (req, res, next) => {
    const allAudioFiles = await readFile(audioFileStoragePath);
    res.status(200).send(JSON.stringify(allAudioFiles));
});

module.exports = router;
 