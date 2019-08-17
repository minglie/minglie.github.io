var fs = require('fs');
var watch = './index.html';
var c = require('child_process');


fs.watch(watch, (event, file) => {
    if (file) {
        if(event==="change"){
            c.exec('window-key "index - Google Chrome" 116');
        }
    }
});