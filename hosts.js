const got = require('got');
var fs = require('fs');
const {
    cmd
} = require('./cmd/index')

const hostsPath = process.env.windir + "\\system32\\drivers\\etc\\hosts";
var printHosts = function () {
    return new Promise(function (resolve, reject) {
        var txt = fs.readFileSync(hostsPath, 'utf8');
        resolve(txt);
    });
}
var getIp = function (domain) {
    return new Promise(function (resolve, reject) {
        var url = "https://sites.ipaddress.com/"+domain+"/"
        got(url, {
            method: 'GET'
        }).then(function (response) {
            var html = response.body //返回数据
           
            var match = html.match( `<a href="https://www.ipaddress.com/ipv4/(\\d+\\.\\d+\\.\\d+\\.\\d+)">`);
            if (match) {
                var ip = match[1];
                resolve(ip);
            } else {
                reject();
            }

        });
    });
}
var removeHosts = function (domain) {
    return new Promise(async function (resolve, reject) {
        var txt = await printHosts();
        var lines = txt.split("\r\n");
        var newLines = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.startsWith("#")) {
                newLines.push(line)
            } else if (line.indexOf(" " + domain) > -1) {
                //存在则不添加
            } else {
                newLines.push(line);
            }
        }
        var newTxt = newLines.join("\r\n");
        fs.writeFileSync(hostsPath, newTxt);
        //刷新dns
        await cmd('ipconfig /flushdns');
        resolve(newTxt);
    })
}
var updateHosts = function (domain, ip) {
    return new Promise(async function (resolve, reject) {
        if (!ip) {
            ip = await getIp(domain);
        }
        var txt = await printHosts();
        var lines = txt.split("\r\n");
        var newLines = [];
        var isexists = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.startsWith("#")) {
                newLines.push(line)
            } else if (line.indexOf(" " + domain) > -1) {
                isexists = true;
                newLines.push(ip + " " + domain);
            } else {
                newLines.push(line);
            }
        }
        if (!isexists) {
            newLines.push(ip + " " + domain);
        }
        var newTxt = newLines.join("\r\n");
        fs.writeFileSync(hostsPath, newTxt);
        //刷新dns
        await cmd('ipconfig /flushdns');
        resolve(newTxt);

    })

}
exports.updateHosts = updateHosts
exports.removeHosts = removeHosts
exports.printHosts = printHosts