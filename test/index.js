/**
 * @see https://npmjs.org/package/qunit
 */
var testrunner = require('qunit');
var path = require('path');

testrunner.setup({
    log: {
        // log assertions overview
        assertions: false,
        // log expected and actual values for failed tests
        errors: true,
        // log tests overview
        tests: true,
        // log summary
        summary: true,
        // log global summary (all files)
        globalSummary: false,
        // log currently testing code file
        testing: true
    }
});

// 使用 __dirname 是考虑到 `npm test` 在项目根目录下运行测试

testrunner.run({
    code: {path: path.resolve(__dirname, '../lib/ift'), namespace: "ift"},
    tests: [
        path.resolve(__dirname, './test-ifCheck.js'),
        path.resolve(__dirname, './test-ifSync.js')
    ] 
}, function(err, report) {
    //console.dir(report);
});
