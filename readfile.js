const fs = require('fs');

fs.readFile('./index.html','utf8',(err,data)=> {
   if(err) throw err;

    response.writeHead(200, { 'Content-Type': 'text/plain',
        'Trailer': 'Content-MD5' });


    console.log(data);
});