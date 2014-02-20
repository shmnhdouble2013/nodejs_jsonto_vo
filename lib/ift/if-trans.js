/**
 * @if to json-schema
 * @author @达峰
 * @email dafeng.xdf@taobao.com
 * @useage 
 * new ifTrans({
 *     data:file
 * }).schema;
 */
var P = require('passme').passme,
    T = P._;
;(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        return define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        return factory(exports);
    } else { /* browser */
        factory(root['IfTrans'] || (root['IfTrans'] = {}));
    }
})(this, function (exports) {
    var RULE = '__RULE__';
    var EMPTY = '';
    function IfTrans(cfg) {
        var that = this;
        that.data = cfg.data;
        that.init();
        this.schema = {
            response:that.res,
            request:that.req
        };
    };
    function creatSchema(cfg) {
        return {
            "name": cfg.name || null,
            "type": "string",
            "default": cfg.default || null,
            "rule": cfg.rule || null,
            "desc": cfg.desc || ""
        };
    }
    IfTrans.prototype = {
        init: function () {
            this.clearFlags();
            this.parse();
        },
        parse: function () {
            this.getTokens();
            this.evalBlock();
            this.scanner();
        },
        clearFlags: function () {
            this.tokens = {};
            this.res = [];
            this.req = [];
            this.request = [];
            this.temp = '';
            this.status = null;
            this.num = null;
            this.schema = {};
        },
        validateCount: function () {
            var that = this;
            var c = that.c;
            if (!that.num) {
                that.num = 0;
            }
            if (c.type == 'Punctuator' && c.value == '{') {
                that.num++;
            } else if (c.type == 'Punctuator' && c.value == '}') {
                that.num--;
                if (that.num == 0) {
                    that.status = null;
                    that.num = null;
                }
            }
        },
        scanner: function () {
            var that = this;
            T.each(that.tokens, function (i, index) {
                that.c = i;
                that.i = index;
                if (i.type == 'Identifier' && i.value == 'request') {
                    that.status = 'request';
                } else if (i.type == 'Identifier' && i.value == 'response') {
                    that.status = 'response';
                } else if (that.status == 'request') {
                    that.parseComment('req');
                    that.validateCount();
                } else if (that.status == 'response') {
                    that.parseComment('res');
                    that.validateCount();
                }
            });
        },
        getTokens: function () {
            var that = this;
            that.tokens = P.tokenize(that.data, {
                ecmascript: 5,
                whiteSpace: true,
                ranges: false,
                locations: false
            });
            that.tokens = that.tokenFilter(that.tokens);
        },
        tokenFilter:function(q){
            var that = this;
            var _q = [];
            T.each(q,function(i){
                if(i.type=='WhiteSpace'){
                    if(!!~i.value.indexOf('\n')){
                        _q.push({
                            type:'Wrap',
                            value:true
                        })
                    }
                }else{
                    _q.push(i);
                }
            });
            return _q;
        },
        evalBlock: function () {
            var that = this;
            var cmd = 'var exports ={};' + that.data + ';' + 'return {' + 'request:exports["request"],' + 'response:exports["response"]' + '};';
            that.data = (new Function('anonymous', cmd))();
            that.request = that.data['request'];
            that.response = that.data['response'];
            T.each(that.response, function (v, k) {
                if (k != 'success') {
                    that.response = v;
                }
            });
            that.parseSchema(that.response, 'res');
            that.parseSchema(that.request, 'req');
        },
        parseSchema: function (d, t) {
            var that = this;
            T.each(d, function (v, k) {
                var _k = new RegExp(RULE,'g').test(k) ? k.replace(RULE, EMPTY) : k;
                if (!that.has(_k,t)) {
                    that[t].push(new creatSchema({
                        name: _k,
                        default:(new RegExp(RULE,'g').test(k) ? null : v),
                        rule: (new RegExp(RULE,'g').test(k) ? v : null)
                    }));
                } else {
                    if (new RegExp(RULE,'g').test(k)) {
                        that.has(_k,t)['rule'] = v;
                    } else {
                        that.has(_k,t)['default'] = v;
                    }
                }
            });
        },
        parseComment: function (t) {
            var that = this;
            var c = that.c;
            var i = parseInt(that.i);
            function forWard(j){
                var r = false;
                if(that.tokens[j].type == 'StringLiteral'){
                    var v = new RegExp(RULE,'g').test(that.tokens[j].value) ? that.tokens[j].value.replace(RULE, EMPTY) : that.tokens[j].value;
                    v = /'\S+'/.test(v) ? v : JSON.parse(v);
                    if(that.has(v,t)){
                        that.has(v,t)['desc'] += c.value.replace(/\s/g,EMPTY).replace('//',EMPTY).replace('/*',EMPTY).replace(/\*/g,EMPTY).replace('/',EMPTY) + ';';
                        r = true;
                    }
                }
                return r;
            }
            if(c.type == 'Comment'){
                if(that.tokens[i-1].type == 'Wrap'){
                    for(var j=i;j<that.tokens.length;j++){
                        if(forWard(j)){
                            break;
                        }
                    }
                }else{
                    for(var j=i;j>=0;j--){
                        if(forWard(j)){
                            break;
                        }
                    }
                }
            }
        },
        has: function (k,t) {
            var that = this;
            var _has = false;
            T.each(that[t], function (_k, v) {
                if (k == _k.name) {
                    _has = _k;
                    return false;
                }
            });
            return _has;
        }
    };
    exports.ifTrans = IfTrans;
});
/* vim: set sw=4 ts=4 et tw=80 : */
