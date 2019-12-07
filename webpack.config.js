const path = require('path');

module.exports = {
    entry: './app/index.js',

    output: {
        path: path.resolve(__dirname, 'public', 'scripts'),
        filename: 'main.bundle.js'
    },

    mode: 'development'
}
