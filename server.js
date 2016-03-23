'use strict';
const http = require('http');
const url = require('url');
const fileUtils = require('./utils/file');

const filePath = __dirname + '/files';

http.createServer((request, response) => {
    let body = '';
    let pathname = decodeURI(url.parse(request.url).pathname);


    switch (request.method) {
        case 'GET':
            if (pathname === '/') {
                fileUtils.sendFileSafe("./public/index.html", response);
            }
            if (pathname === '/file.txt') {
                fileUtils.sendFileSafe(`${filePath}${pathname}`, response);
            }

            break;
        case 'DELETE':
            if (pathname === '/file.txt') {
                fileUtils.removeFile(`${filePath}${pathname}`, response);
                return;
            }
            response.end('what are you doing!?');
            break;
    }


    request.on('data', function (chunk) {
        body += chunk;
        fileUtils.saveFile(`${filePath}${pathname}`, body, response);
    });

}).listen(3333);

