const fs = require('fs');

exports.readFile = path => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, fileContent) => {
            if (err) {
                return resolve([]);
            }
    
            resolve(JSON.parse(fileContent));
        });
    });
};
