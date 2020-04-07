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

exports.writeFile = (path, file) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(file), err => {
            if (err) {
                return reject(err);
            }
            resolve('File was successfully written.');
        });
    });
};

exports.unlinkFile = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) {
                return reject(err);
            }
            resolve('File was successfully deleted.');
        });
    });
};
