const path = require('path');

const projectDir = process.cwd();

exports.audioFilePublicDirectory = '/files/audio';
exports.audioFileUploadDirectory = path.join(projectDir, 'public', 'files', 'audio');
exports.audioFileStoragePath = path.join(projectDir, 'data', 'files.json');
