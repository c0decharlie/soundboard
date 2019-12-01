const fs = require('fs');

const express = require('express');
const router = express.Router();

const { readFile } = require('../utils/file');
const { audioFileStoragePath, audioFilePublicDirectory, audioFileUploadDirectory } = require('../configs/file');

const upload = require('../configs/upload');

async function saveFile(file) {
    const fileContent = await readFile(audioFileStoragePath);
    const isFileExisting = fileContent.some(readFile => readFile.originalname === file.originalname);

    if (isFileExisting) {
        return console.log('File already exists');
    }

    file.publicPath = `${audioFilePublicDirectory}/${file.filename}`;

    const files = [...fileContent, file];
    fs.writeFile(audioFileStoragePath, JSON.stringify(files), err => {
        console.log('Write file error: ', err);
    });
}

async function deleteFile(fileName) {
    const fileContent = await readFile(audioFileStoragePath);
    const audioFileToDelete = fileContent.filter(file => file.originalname === fileName)[0];

    if (!audioFileToDelete) {
        return new Error('File does not exist.');
    }

    fs.unlink(`${audioFileUploadDirectory}/${audioFileToDelete.filename}`, err => {
        if (err) {
            return console.log('Unlink file error: ', err);
        }
        
        console.log(`File ${audioFileToDelete.originalname} successfully deleted.`);
    });

    const decreasedFile = fileContent.filter(file => file.originalname !== fileName);
    fs.writeFile(audioFileStoragePath, JSON.stringify(decreasedFile), err => {
        if (err) {
            return console.log('Write file error: ', err);
        }

        console.log(`File was successfully written.`);
    });
}

router.post('/upload-audio', upload.single('audio'), (req, res, next) => {
    saveFile(req.file);
    res.redirect('/');
});

router.post('/delete', (req, res, next) => {
    const fileName = req.body.fileName;
    deleteFile(fileName);
});

router.post('/all', async (req, res, next) => {
    const allAudioFiles = await readFile(audioFileStoragePath);
    res.status(200).send(JSON.stringify(allAudioFiles));
});

module.exports = router;
 