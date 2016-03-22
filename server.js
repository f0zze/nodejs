'use strict';
const http = require('http');
const fs = require('fs');
const url = require('url');

var server = http.createServer((request, response) => {

    //let pathname = decodeURI(url.parse(request.url).pathname);
    let pathname = request.url;
    switch (request.method) {
        case 'GET':
            if (pathname === '/') {
                fs.readFile(__dirname + '/public/index.html', (err, data)=> {
                    if (err) throw err;

                    response.writeHead(200, {
                        'Content-Type': 'text/html; charset=UTF-8'
                    });
                    response.end(data);
                });
                return;
            }
            console.log(pathname);
            fs.readFile(__dirname + `/files${pathname}`, (err, data)=> {
                if (err) {
                    console.log('end');
                    response.end(404);
                }

                response.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                response.end(data);
            });
            break;
        case 'POST':
            if (pathname === '/file') {
                response.end('post');
            }
            break;
        case 'DELETE':
            if (pathname === '/file') {
                response.end('delete');
            }
            break;
    }


}).listen(3333);