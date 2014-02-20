var path = require('path');
var fs = require('fs');

// 使用 root 是考虑到 `npm test` 在项目根目录下运行测试

var root = __dirname;

ift.ifInit({root: root});

ift.ifSync({
    dataDir: path.resolve(root, 'demo/data'),
    files: ['demo.js'],
    savePath: path.resolve(root, './doc/demo.md'),
    dataTpl: path.resolve(root, './tpl/data.tpl'),
    dataIncTpl: path.resolve(root, './tpl/data.inc.tpl')
});

QUnit.module('ift.ifInit');

test('basic', function() {
    ok(fs.existsSync(path.resolve(root, 'demo')));
    ok(fs.existsSync(path.resolve(root, 'demo/data')));
    ok(fs.existsSync(path.resolve(root, 'doc')));
    ok(fs.existsSync(path.resolve(root, 'demo/data/if-config.json')));
    ok(fs.existsSync(path.resolve(root, 'demo/data/demo.js')));
});

QUnit.module('ift.ifSync');

test('basic', function() {
    ok(fs.existsSync(path.resolve(root, 'doc/demo.md')));
});