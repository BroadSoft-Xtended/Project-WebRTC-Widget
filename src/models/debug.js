module.exports = require('../factory')(Debug)

var stacktrace = require('stacktrace-js');
var debug = require('debug');
var enabled = {};

function Debug(options) {
	var id = options && options.id || options || '';
	if (options.debug) {
		enabled[id] = '*:' + id;
	} else {
		delete enabled[id];
	}
	updateEnabled();

	return function(msg) {
		var caller = stacktrace().pop().match('(.*)@').pop();
		var prefix = caller + ':' + id;
		console.log('debug : ' + prefix + ':' + msg);
		debug(prefix)(msg);
	};
}

var updateEnabled = function() {
	var values = [];
	Object.keys(enabled).forEach(function(key) {
		values.push(enabled[key]);
	});
	debug.enable(values.join(','));
};
// exports.enable = function(id){
// 	enabledList.push('*'+id);
// 	var enabledStr = enabledList.join(',');
// 	debug.enable(enabledStr);
// };
// exports.disable = function(){
// 	enabledList = [];
// 	debug.disable();
// };
// exports.log = debug.log;