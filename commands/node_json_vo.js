var url = require('url'),
    Modules = require('Modules'),
    path = require('path'),
    punycode = require('punycode'),
    // process = require('process'), 
    fs = require('fs'),
    fs = require('fs'),
    fs = require('fs');

     var pathname = __dirname + '/public' + url.parse(req.url).pathname;
    

exports.area = function (r) {
    return PI * r * r;
};