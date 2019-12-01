const path = require('path');

const { projectDir } = require('../utils/path');

exports.audioFilePublicDirectory = '/files/audio';
exports.audioFileUploadDirectory = path.join(projectDir, 'public', 'files', 'audio');
exports.audioFileStoragePath = path.join(projectDir, 'data', 'files.json');
