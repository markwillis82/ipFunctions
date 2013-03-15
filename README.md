ipFunctions
=======

Providing functionality to check ip validation and convert CIDR notation to IP ranges. also allowing for single ips to be converted to long and back again.

example
=======


``` js
var cidr = require('./lib/cidr');

console.log('ip2long: 127.0.0.1 -> ' +cidr.ip2long('127.0.0.1'));
console.log('long2ip: 2130706433 -> ' +cidr.long2ip(2130706433));
console.log('incorrect IP: ' +cidr.ip2long('test'));

var range = cidr.cidrToRange('127.0.0.1/16');
console.log('CIDR Range: 127.0.0.1/16 -> ' + range[0] + ' :: ' + range[1]);
```

functions
=======
``` js
ip2long(); // convert ip String to Number (returns false if invalid)
long2ip(); // convert ip Number to String (returns false if invalid)
cidrToRange(); // convert CIDR range to 2 item array (lowest IP and highest IP) (returns false if invalid)
checkIp(); // check if IP string is valid
checkCIDR(); // check if CIDR string is valid
```

install
=======

With [npm](http://npmjs.org)

```
npm install -g ipFunctions
```

license
=======

MIT