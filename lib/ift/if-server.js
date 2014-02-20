/**
 * 生成接口服务器
 */
var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');
var util = require('util');
var PORT = 9999;

/**
 *
 * @param {Object} opt 服务器根目录
 * @param {string} opt.root 服务器根目录
 * @param {number} opt.port 端口
 */
function ifServer(opt) {
    var root = opt.root;
    var port = opt.port || PORT;

    http.createServer(
        function(req, res) {
            try {
                var u = url.parse(req.url, true);
                var absPath = path.resolve(root, u.pathname.substring(1));
                //console.log(root, absPath);
                var q = u.query;

                // TODO 支持 GET POST 切换
                console.log('[ift] ' + req.url);

                // 强制重复 load
                eval(fs.readFileSync(absPath, 'utf-8'));
                var jsonStr = JSON.stringify(exports.response);
                //var jsonStr = JSON.stringify(require(absPath).response);

                // add CORS support by tiejun
                // simple request
                res.setHeader("Access-Control-Allow-Origin", "*");
                // Preflighted requests
                if (req.headers['access-control-request-headers']) {
                    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
                    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                    res.setHeader("Access-Control-Max-Age", "1728000");
                    res.setHeader("Access-Control-Allow-Credentials", "true");
                }

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                if (q.callback) {
                    res.end(q.callback + '(' + jsonStr + ')');
                }
                else {
                    res.end(jsonStr);
                }
            } catch (e) {
                res.writeHead(500);
                res.end('[500] ' + e);
            }
        }
    ).listen(//监听
        port,
        function() {
            console.log('\n[ift] 接口服务器在端口 ' + port + ' 启动');
        }
    );

}

exports.ifServer = ifServer;