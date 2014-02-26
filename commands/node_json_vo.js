
/****
*
* 1、引入模块 -- 读取模板 -- 写入模板
* 2、查找路径 --- 模板路径 、 nodejs路径、 js数据路径、jar工具路径、最终存放文档路径 
*
* 3、获取文件流---
* 4、输入文件流----转换文件流--出错标记
* 5、存入模板文件流
* 6、写入模板文件流
*
**/

var url = require('url'),
    Modules = require('Modules'),
    path = require('path'),
	// 编码系统
    punycode = require('punycode'),
	
	// 子进程
    process = require('child_process'), 
    fs = require('fs'),
    fs = require('fs'),
    fs = require('fs');

     var pathname = __dirname + '/public' + url.parse(req.url).pathname;
    

exports.area = function (r) {
    return PI * r * r;
};