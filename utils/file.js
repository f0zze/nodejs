'use strict';

const fs = require('fs');

const File = {
    sendFileSafe: sendFileSafe,
    sendFile: sendFile,
    removeFile: removeFile,
    saveFile: saveFile
};

function sendFileSafe(filePath, resp) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        resp.statusCode = 400;
        resp.end("Bad request");
    }

    fs.stat(filePath, (err, stats)=> {
        if (err || !stats.isFile()) {
            resp.statusCode = 404;
            resp.end('No such file');
        }
        sendFile(filePath, resp);
    });

}

function saveFile(filePath, data, resp) {
    fs.stat(filePath, (err, stats)=> {
        if (err || !stats.isFile()) {
            fs.writeFile(filePath, data, (err) => {
                if (err) resp.end(filePath);
                resp.statusCode = 200;
                resp.end('It\'s saved!');
            });
        } else {
            resp.statusCode = 409;
            resp.end('file exists');
        }
    });
}

function removeFile(filePath, resp) {
    fs.unlink(filePath, (err)=> {
        if (err) {
            resp.statusCode = 404;
            resp.end("Sorry no such file to delete");
        }
        resp.statusCode = 200;
        resp.end('deleted');
    })
}

function sendFile(filePath, resp) {
    fs.readFile(filePath, (err, file) => {
        if (err) {
            resp.statusCode = 404;
            resp.end('something wrong will reading file');
            return;
        }
        resp.statusCode = 200;
        resp.end(file);
    });
}

module.exports = File;



