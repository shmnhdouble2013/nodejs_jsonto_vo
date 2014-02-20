/**
 * @file if 工具集入口
 *
 * @author 鬼道(luics)
 * @date 2013-07-21
 */

var sync = require('./if-sync.js');
var serv = require('./if-server.js');
var check = require('./if-check.js');

exports.ifSync = sync.ifSync;
exports.ifInit = sync.ifInit;
exports.ifServer = serv.ifServer;
exports.ifCheck = check.check;