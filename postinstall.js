#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE_PATH = path.join(__dirname, 'data', 'files.json');
const FILES_PUBLIC_DIR = path.join(__dirname, 'public', 'files');
const AUDIO_FILES_PUBLIC_DIR = path.join(__dirname, 'public', 'files', 'audio');

// Create data file directory
ensureExists(DATA_DIR, err => {
    if (err) {
        console.log('Directory for data not created due to error.', err);
        return;
    }
    console.log('Directory for data successfully created.');

    // Create file data storage
    fs.openSync(DATA_FILE_PATH, 'w', err => {
        if (err) {
            console.log('Filed to create files storage.');
            return;
        }
        console.log('Files storage successfully created.');
    });

    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]));
        console.log('File storage value initiated successfully.')
    } catch(err) {
        console.log('File storage value not initiated due to error.', err);
    }
});

// Create public directory for files
ensureExists(FILES_PUBLIC_DIR, err => {
    if (err) {
        console.log('Directory for files not created due to error.', err);
        return;
    }
    console.log('Directory for files successfully created.');

    ensureExists(AUDIO_FILES_PUBLIC_DIR, err => {
        if (err) {
            console.log('Directory for audio files not created due to error.', err);
            return;
        }
        console.log('Directory for audio files successfully created.');
    });
});

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') {
        cb = mask;
        mask = 0777;
    }

    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(null); 
            else cb(err);
        } else cb(null);
    });
}
