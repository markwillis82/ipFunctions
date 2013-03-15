var cidr = require('./lib/cidr');


console.log('ip2long: 127.0.0.1 -> ' +cidr.ip2long('127.0.0.1'));
console.log('long2ip: 2130706433 -> ' +cidr.long2ip(2130706433));
console.log('incorrect IP: ' +cidr.ip2long('test'));

var range = cidr.cidrToRange('127.0.0.1/16');
console.log('CIDR Range: 127.0.0.1/16 -> ' + range[0] + ' :: ' + range[1]);


