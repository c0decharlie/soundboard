const path = require('path');

const { projectDir } = require('../utils/path');

exports.audioFileUploadDirectory = path.join(projectDir, 'files', 'audio');
exports.audioFileStoragePath = path.join(projectDir, 'files', 'data', 'files.json');
