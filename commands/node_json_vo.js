
/****
*
* 1������ģ�� -- ��ȡģ�� -- д��ģ��
* 2������·�� --- ģ��·�� �� nodejs·���� js����·����jar����·�������մ���ĵ�·�� 
*
* 3����ȡ�ļ���---
* 4�������ļ���----ת���ļ���--������
* 5������ģ���ļ���
* 6��д��ģ���ļ���
*
**/

var url = require('url'),
    Modules = require('Modules'),
    path = require('path'),
	// ����ϵͳ
    punycode = require('punycode'),
	
	// �ӽ���
    process = require('child_process'), 
    fs = require('fs'),
    fs = require('fs'),
    fs = require('fs');

     var pathname = __dirname + '/public' + url.parse(req.url).pathname;
    

exports.area = function (r) {
    return PI * r * r;
};