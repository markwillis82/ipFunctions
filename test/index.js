var tap = require("tap"),
	test = tap.test,
	cidr;

test("load module", function (t) {
	cidr = require('../lib/cidr');
	t.ok(cidr, "object loaded");
	t.end();
});

test("test ip2long", function (t) {
	t.equal(cidr.ip2long('127.0.0.1'), 2130706433);

	t.equal(cidr.ip2long('255.255.255.255'), 4294967295);

	t.equal(cidr.ip2long('0.0.0.0'), 0);

	t.equal(cidr.ip2long('test'), false);

	t.end();
});

test("test long2ip", function (t) {
	t.equal(cidr.long2ip(2130706433), '127.0.0.1');
	t.equal(cidr.long2ip('2130706433'), '127.0.0.1');

	t.equal(cidr.long2ip(0), '0.0.0.0');
	t.equal(cidr.long2ip(4294967295), '255.255.255.255');

	t.equal(cidr.long2ip('test'), false);

	t.end();
});



test("test cidrToRange", function (t) {
	var goodRange = cidr.cidrToRange('127.0.0.1/16');
	t.equal(goodRange[0], '127.0.0.0');
	t.equal(goodRange[1], '127.1.0.0');

	var singleIP = cidr.cidrToRange('127.0.0.1/32');
	t.equal(singleIP[0], '127.0.0.1');
	t.equal(singleIP[1], '127.0.0.1');

	var highIP = cidr.cidrToRange('255.255.255.255/32');
	t.equal(highIP[0], '255.255.255.255');
	t.equal(highIP[1], '255.255.255.255');

	var lowIP = cidr.cidrToRange('0.0.0.0/32');
	t.equal(lowIP[0], '0.0.0.0');
	t.equal(lowIP[1], '0.0.0.0');

	var allIP = cidr.cidrToRange('0.0.0.0/0');
	t.equal(allIP[0], '0.0.0.0');
	t.equal(allIP[1], '255.255.255.255');


	var badIp = cidr.cidrToRange('broken');
	t.equal(badIp, false);

	var badIp2 = cidr.cidrToRange('broken/test');
	t.equal(badIp2, false);

	var badIp3 = cidr.cidrToRange('192.168.10.55/50');
	t.equal(badIp3, false);

	var badIp4 = cidr.cidrToRange('192.168.10.55/text');
	t.equal(badIp4, false);

	t.end();
});