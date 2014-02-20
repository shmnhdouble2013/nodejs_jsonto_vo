/**
 * @mock 到json-schema
 * @author @达峰
 * @email dafeng.xdf@taobao.com
 */
var fs = require('fs'),
    path = require('path');
var DEFAULT_ENCODING = 'utf-8';
var fileName = path.join('tpl/demo.data.js.tpl');
var file = fs.readFileSync(fileName, DEFAULT_ENCODING);
var ifTrans = require('../lib/ift/if-trans.js').ifTrans;
var schema = new ifTrans({
        data:file
    }).schema;

console.log(schema)
