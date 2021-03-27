#!/usr/bin/env node

const {
    updateHosts,
    removeHosts,
    printHosts
} = require('./hosts')

var arguments = process.argv.splice(2);
var domain = null,
    ip = null;
if (arguments != '') {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] == '-p') {
            printHosts().then(info => {
                console.log(info)
            })
            break;
        } else if (arguments[i] == '-r') {
            domain = arguments[i + 1];
            removeHosts(domain).then(info => {
                console.log(info)
            })
            break;
        } else if (arguments[i] == '-u') {
            domain = arguments[i + 1];
            ip = arguments[i + 2];
            updateHosts(domain, ip).then(info => {
                console.log(info)
            })
            break;
        } else if (arguments[i] == '-h') {
            var arr = [];
            arr.push('[-h] [-p] [-r domain] [-u domain] [-u domain ip]')
            arr.push('-h            帮助')
            arr.push('-p            打印hosts')
            arr.push('-r domain     移除指定domain的记录')
            arr.push('-u domain     更新指定domain的记录，ip从ipaddress.com自动获取')
            arr.push('-u domain ip  更新指定domain的记录，ip自定义')
            console.log(arr.join('\r\n'))
            break;
        }
    }

} else {
    printHosts().then(info => {
        console.log(info)
    })
}