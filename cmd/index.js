const {
    exec
} = require('child_process');
var iconv = require('iconv-lite');

var cmd = function (command) {
    return new Promise(function (resolve, reject) {
        exec(command, {
            encoding: 'buffer'
        }, (error, stdout) => {
            var result = iconv.decode(stdout, 'cp936');
            resolve(result);
        });
    })
}

exports.cmd = cmd