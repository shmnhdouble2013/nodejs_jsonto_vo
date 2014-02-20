QUnit.module("ift.ifCheck");

var ifCheck = ift.ifCheck;

test('basic', function() {
    ok(ifCheck);
    equal(0, ifCheck({a: 1}, {b: 1}).pass);
    equal(0, ifCheck({"k1": 1, "k2": false}, {"k2": "false"}).pass);
});


test('with rule', function() {
    equal(1, ifCheck({"k": 1, "k__RULE__": "{{not-required}}"}, {}).pass);
    equal(1, ifCheck({"k": "x-123", "k__RULE__": "{{/^x-\\d+?$/i}}"}, {"k": "x-1234"}).pass);
    // 该字段可不存在，但不能为 null
    equal(1, ifCheck({"k": "x-123", "k__RULE__": "{{/^x-\\d+?$/i}},{{not-required}}"}, {"k": "x-1234" }).pass);
    equal(0, ifCheck({"k": "x-123", "k__RULE__": "{{/^x-\\d+?$/i}},{{not-required}}"}, {"k": null }).pass);
});