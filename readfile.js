const fs = require('fs');

fs.stat('./public/index.html',(err,stats)=> {
    if(err) throw err;
    console.log(stats.isFile());
});