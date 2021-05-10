# hosts
基于nodejs修改hosts文件的命令行工具
## 一、安装
```shell
npm install wmz46/hosts#main -g
#或者
cnpm install wmz46/hosts#main -g

```
## 二、卸载
npm uninstall hosts -g
## 三、使用
```shell

#打印hosts
hosts
#或
hosts -p

#帮助
hosts -h

#移除指定domain的记录,需要管理员身份运行
hosts -r github.com

#更新指定domain的记录，ip从ipaddress.com自动获取,需要管理员身份运行
hosts -u github.com

#更新指定domain的记录，ip自定义,需要管理员身份运行
hosts -u github.com 140.82.114.4


```
