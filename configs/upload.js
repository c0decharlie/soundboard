const crypto = require('crypto');
const mime = require('mime');
const multer = require('multer');

const { audioFileUploadDirectory, audioFileStoragePath } = require('../configs/file');
const { readFile } = require('../utils/file');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, audioFileUploadDirectory);
    },

    filename(req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now());
        });
    }
});

const upload = multer({ 
    storage,

    async fileFilter(req, file, cb) {
        // check if file extension is valid
        const allowedExtensions = ['mp3', 'wma'];
        const fileExtension = mime.getExtension(file.mimetype);

        if (!allowedExtensions.includes(fileExtension)) {
            return cb(new Error('File extension not allowed'));
        }

        // check if file already exist
        const audioFiles = await readFile(audioFileStoragePath);
        const isFileExisting = audioFiles.some(readFile => readFile.originalname === file.originalname);

        if (isFileExisting) {
            const error = new Error('File with that name already exists');
            error.statusCode = 409;
            return cb(error);
        }

        cb(null, true);
    }
});

module.exports = upload;
