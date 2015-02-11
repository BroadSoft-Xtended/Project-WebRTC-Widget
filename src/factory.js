var $ = require('jquery');
var templates = require('../js/templates');

module.exports = function(constructor){
	return function(options) {
		var id = options;
		if(typeof options  === "object") {
			id = options.id;
		}
		id = id || 'default';
	  global.instances = global.instances || {};

	  var name = functionName(constructor);
	  id = name+'_'+id;
	  console.log('factory : '+id, argNames(constructor));
	  if(!global.instances[id]) {
	  	options = $.extend({}, options);
		  var args = (argNames(constructor) || []).map(function(argName) {
		  	if(argName === 'options') {
		  		return options;
		  	} else {
		  		return require('./models/'+argName)(options);		  		
		  	}
		  });
		  console.log('factory : create ');
	    var object = create(constructor, args);
	    if(name.match(/view$/)) {
	    	var viewName = name.replace('view', '');
			  options = options[viewName] || {};
			  object.view = $(options.view || templates[viewName]());
			  (object.elements || []).forEach(function(element) {
			  	object[element] = object.view.find(options[element] || '.'+element);
			  });
	    }
		  object.listeners && object.listeners();
	    global.instances[id] = object;
	  }
	  return global.instances[id];		
	}
};

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

function argNames(fun) {
  var fnStr = fun.toString().replace(STRIP_COMMENTS, '')
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if(result === null)
    result = []
  return result
};

function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret.toLowerCase();
}

function create(constructor, argArray) {
    var args = [null].concat(argArray);
    var factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
}
