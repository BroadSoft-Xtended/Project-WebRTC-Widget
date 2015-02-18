module.exports = Debug

var stacktrace = require('stacktrace-js');
var debug = require('debug');
var enabled = {};

function Debug(options) {
	options = options || {};
	var id = options && options.id || options || '';
	if (options.debug) {
		enabled[id] = '*:' + id;
	} else {
		delete enabled[id];
	}
	updateEnabled();

	return function(msg) {
		var prefix = (options.name || caller()) + ':' + id;
		debug(prefix)(msg);
	};
}

var caller = function(){
	var list = stacktrace();
	for(var i=list.length-1; i >= 0; i--) {
		var match = null;
		if((match = list[i].match(/([A-Z]\S*).*@/g))) {
			if(match !== 'Object') {
				return match;				
			}
		}
	}

	return stacktrace().pop().match('(.*)@').pop();
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