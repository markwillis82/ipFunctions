exports.ip2long = function (ip_address) {
  if(!exports.checkIp(ip_address)) return false; // invalid IP address
  var parts = ip_address.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  return parts ? parts[1] * 16777216 + parts[2] * 65536 + parts[3] * 256 + parts[4] * 1 : false;
};

exports.long2ip = function (proper_address) {
	// Converts an (IPv4) Internet network address into a string in Internet standard dotted format
	//
	// version: 1109.2015
	// discuss at: http://phpjs.org/functions/long2ip
	// +   original by: Waldo Malqui Silva
	// *     example 1: long2ip( 3221234342 );
	// *     returns 1: '192.0.34.166'
	var output = false;
	if (!isNaN(proper_address) && (proper_address >= 0 || proper_address <= 4294967295)) {
		output = Math.floor(proper_address / Math.pow(256, 3)) + '.' + Math.floor((proper_address % Math.pow(256, 3)) / Math.pow(256, 2)) + '.' + Math.floor(((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1)) + '.' + Math.floor((((proper_address % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0));
	}
	return output;
};



exports.cidrToRange = function (cidr) {
  var range = [2];
  cidr = cidr.split('/');
  if(cidr.length == 1) return false;
  if(!exports.checkIp(cidr[0])) return false; // invalid IP address
  if(cidr[1] < 0 || cidr[1] > 32 || isNaN(cidr[1])) return false; // invalid cidr address

  if(cidr[1] == 32) { // we are a single IP - do no calc
	return [cidr[0],cidr[0]];
  }

  var longStart = exports.ip2long(cidr[0]);

  range[0] = exports.long2ip((longStart) & ((-1 << (32 - cidr[1]))));
  range[1] = exports.long2ip((longStart) + Math.pow(2, (32 - cidr[1])) - 1);
  return range;
};

exports.checkIp = function (ip) {
	if(typeof ip !== 'string') return false; // only do strings
	var matches = ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
	return (matches ? true : false);
};

exports.checkCIDR = function (cidr) {
	if(typeof ip !== 'string') return false; // only do strings
	var matches = cidr.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/\d{1,2}$/);
	return (matches ? true : false);
};