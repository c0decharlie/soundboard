const fs = require('fs');

const express = require('express');
const router = express.Router();

const { readFile } = require('../utils/file');
const { audioFileStoragePath, audioFilePublicDirectory} = require('../configs/file');

const upload = require('../configs/upload');

async function saveFile(file) {
    const fileContent = await readFile(audioFileStoragePath);
    const isFileExisting = fileContent.some(readFile => readFile.originalname === file.originalname);

    if (isFileExisting) {
        return console.log('File already exists');
    }

    file.publicPath = `${audioFilePublicDirectory}${file.filename}`;

    const files = [...fileContent, file];
    fs.writeFile(audioFileStoragePath, JSON.stringify(files), err => {
        console.log('Write file error: ', err);
    });
}

router.post('/upload-audio', upload.single('audio'), (req, res, next) => {
    saveFile(req.file);
    res.redirect('/');
});

router.post('/all', async (req, res, next) => {
    const allAudioFiles = await readFile(audioFileStoragePath);
    res.status(200).send(JSON.stringify(allAudioFiles));
});

module.exports = router;
 