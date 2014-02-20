/**
 * @file if，if项目中的数据校验工具
 * @author @鬼道(luics)
 * Usage:
 * window.ifCheck(format, response)
 */

(function() {
    function fm() {
        if (arguments.length == 0) {
            return '';
        }
        else if (arguments.length == 1) {
            return arguments[0];
        }

        var res = arguments[0], i;
        for (i = 1; i < arguments.length; ++i) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
            res = res.replace(re, arguments[i]);
        }
        return res;
    }

    var C = {
        RE_NUM: /^\d+?$/,
        RE_RULE: /\{\{(\/(.*?)\/(.*?)?)\}\}/,
        RULE_NOT_REQUIRED: '{{not-required}}',
        RULE: '__RULE__',
        MSG_UNDEFINED: '未定义 {0}',
        MSG_MISMATCH: '值类型不匹配 {0}',
        MSG_INVALID: '校验未通过 {0} 规则: {1}',
        /**
         * @type {Object}
         */
        STAT: {
            pass: 1,
            defined: 0,
            undefined: 0,
            mismatch: 0,
            stack: [],
            log: []
        },
        /**
         * 记录Log
         * @param {string} msg
         * @param {string} [level] 默认info
         */
        log: function(msg, level) {
            level = level || 'info';
            msg = fm('<div class="ifcheck-{0}">{1}</div>', level, msg);
            C.STAT.log.push(msg);
            //console.log(msg);
        },
        isRuleKey: function(key) {
            return key.indexOf(C.RULE) > -1;
        },
        getRuleKey: function(key) {
            return key + C.RULE;
        },
        checkInternal: function(dataFormat, dataResponse) {
            for (var key in dataFormat) if (dataFormat.hasOwnProperty(key)) {
                if (C.isRuleKey(key)) {
                    continue;
                }
                C.STAT.stack.push(key);

                // 规则初始化
                var ruleKey = C.getRuleKey(key);
                var ruleRequired = true;
                var ruleRegexp = null;
                var ruleRegexpStr = '';
                if (dataFormat[ruleKey]) {
                    var rule = dataFormat[ruleKey] + '';
                    ruleRequired = rule.indexOf(C.RULE_NOT_REQUIRED) === -1;
                    var ms = C.RE_RULE.exec(rule);
                    if (ms) {
                        ruleRegexpStr = ms[1];
                        var strReg = ms[2];
                        var regOpt = ms[3];
                        //console.log(ms);
                        ruleRegexp = new RegExp(strReg, regOpt ? regOpt : '');
                    }
                }

                // 注：在 js 类型中
                // typeof null === 'object'
                // typeof array === 'object'

                var fmV = dataFormat[key];
                var resV = dataResponse[key];

                // 以下3个分支，覆盖了 2 * 2 = 4 种组合条件，是完备的
                // 响应数据为非对象类型时，进行如下检验
                if (typeof resV !== 'object') {
                    if (typeof resV === 'undefined') {
                        // || (typeof dataResponse[k] === 'object' && !dataResponse[k])
                        // 数组成员允许数量上不匹配
                        if (!C.RE_NUM.test(key + '')) {
                            // C.RULE_NOT_REQUIRED 时不需要校验
                            if (ruleRequired) {
                                C.STAT.undefined++;
                                C.log(fm(C.MSG_UNDEFINED, C.STAT.stack.join('.')), 'error');
                            }
                        }
                    }
                    else if (typeof resV != typeof(fmV)) {
                        C.STAT.mismatch++;
                        C.log(fm(C.MSG_MISMATCH, C.STAT.stack.join('.')), 'error');
                    }
                    else {
                        // 只有在以上条件满足时，才进入到校验阶段
                        if (ruleRegexp && !ruleRegexp.test(resV + '')) {
                            C.STAT.mismatch++;
                            C.log(fm(C.MSG_INVALID, C.STAT.stack.join('.'), ruleRegexpStr), 'error');
                        }
                        else {
                            C.STAT.defined++;
                        }
                    }
                }
                // 数据格式为对象类型，需要递归
                else if (typeof fmV === 'object') {
                    C.checkInternal(fmV, resV);
                    C.STAT.defined++;
                }
                // 剩余情况
                else if (typeof fmV !== 'object'
                    && typeof resV === 'object') {
                    C.STAT.mismatch++;
                    C.log(fm(C.MSG_MISMATCH, C.STAT.stack.join('.')), 'error');
                }

                C.STAT.stack.pop();
            }
        },
        /**
         * 数据校验
         *
         * @param {Object} dataFormat 数据格式
         * @param {Object} dataResponse 响应数据
         */
        check: function(dataFormat, dataResponse) {

            var stat = C.STAT;
            stat.defined = 0;
            stat.undefined = 0;
            stat.mismatch = 0;
            stat.stack = ['{root}'];
            stat.log = [];
            C.checkInternal(dataFormat, dataResponse);
            stat.pass = (stat.undefined + stat.mismatch) > 0 ? 0 : 1;
            return stat;
        }
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = C;
    }
    else {
        window.ifCheck = C.check;
    }
})();
