const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');

const mime = require('mime');
const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const audioFileStoragePath = path.join(__dirname, 'files', 'audio');
        cb(null, audioFileStoragePath);
    },

    fileFilter(req, file, cb) {
        const allowedExtensions = ['mp3', 'wma'];
        const fileExtension = mime.getExtension(file.mimetype);

        if (!allowedExtensions.includes(fileExtension)) {
            cb(new Error('File extension not allowed'), false);
        }

        cb(null, true);
    },

    filename(req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const upload = multer({ storage });

// const upload = multer({ dest: path.join(__dirname, 'files', 'audio')})
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload-audio', upload.single('audio'), (req, res, next) => {
    console.log('file', req.file);
    res.redirect('/');
});

app.post('/download-file', (req, res, next) => {

});

app.listen(port, () => console.log(`App listening on port ${port}!`));

