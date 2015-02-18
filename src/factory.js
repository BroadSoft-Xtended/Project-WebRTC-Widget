var $ = require('jquery');
var templates = require('../js/templates');
require('./prop');
require('./cookieprop');

module.exports = Factory;

function Factory(constructor){
	return function(options) {
		require('./models/callcontrol');
		require('./models/configuration');
		require('./models/debug');
		require('./models/eventbus');
		require('./models/settings');
		require('./models/sipstack');
		require('./models/smsprovider');
		require('./models/sound');
		require('./models/xmpp');
		require('./views/authentication');
		require('./views/client');
		require('./views/connectionstatus');
		require('./views/dialpad');
		require('./views/fileshare');
		require('./views/history');
		require('./views/incomingcall');
		require('./views/messages');
		require('./views/popup');
		require('./views/reinvite');
		require('./views/settings');
		require('./views/sms');
		require('./views/stats');
		require('./views/timer');
		require('./views/transfer');
		require('./views/video');
		require('./views/videobar');
		require('./views/whiteboard');
		require('./views/xmpp');
		global.instances = global.instances || {};
		var name = functionName(constructor);
		var id = getId(options, name);
		// console.log('factory : ' + id);
		if (!global.instances[id]) {
			options = $.extend({}, options);
			// console.log('factory : args for '+ id + ' : ', argNames(constructor));
			var constructorArgs = args(options, constructor);
			// console.log('factory : create ' + id + ' with ', argNames(constructor));
			var object = create(constructor, constructorArgs);
			object._name = name;
			global.instances[id] = object;
			if (name.match(/view$/)) {
				var viewName = name.replace('view', '');
				options = options[viewName] || {};
				object.view = $(options.view || templates[viewName]());
				(object.elements || []).forEach(function(element) {
					object[element] = object.view.find(options[element] || '.' + element);
				});
			} else {
				// console.log('factory : extend props : '+name);
				Object.keys(object.props || {}).forEach(function(name) {
					var prop = $.extend({name: name}, object.props[name])
					var type = prop.type || object.props._type || '';
					require('./'+type+'prop')(object, prop).define();
				});
			}
			constructorArgs.forEach(function(arg){
				arg._init && arg._init();
			});
			object.init && object.init(options);
			object.listeners && object.listeners();

		}
		return global.instances[id];
	}
}

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;

var __slice = [].slice;

function getId (options, name) {
	var id = options;
	if (typeof options === "object") {
		id = options.id;
	}
	id = id || 'default';

	id = name + '_' + id;
	return id;
};

function extend () {
  var consumer = arguments[0],
      providers = __slice.call(arguments, 1),
      key,
      i,
      provider;

  for (i = 0; i < providers.length; ++i) {
    provider = providers[i];
    for (key in provider) {
      if (provider.hasOwnProperty(key)) {
        consumer[key] = provider[key];
      };
    };
  };
  return consumer;
};

function delegateFunction (toProvider, options) {
	var _toProvider;
  return function () {
  	_toProvider = _toProvider || toProvider(options);
    return _toProvider.apply(this, arguments);
  };
};

function delegate (toProvider, options, methods, props, receiver) {
	receiver = receiver || {};
	methods = methods || Object.getOwnPropertyNames(toProvider);
	var _toProvider;
  methods.forEach(function (method) {
    receiver[method] = function () {
    	_toProvider = _toProvider || toProvider(options);
      return _toProvider[method].apply(receiver, arguments);
    };
  });
  props.forEach(function (prop) {
  	Object.defineProperty(receiver, prop, {
			writeable: false,
			get: function() {
	    	_toProvider = _toProvider || toProvider(options);
	    	return _toProvider[prop];
			},
			set: function(value) {
	    	_toProvider = _toProvider || toProvider(options);
	    	_toProvider[prop] = value;
			}
		});
  });
  receiver._init = function(){
		_toProvider = _toProvider || toProvider(options);
	}
  return receiver;
};

function args(options, constructor) {
	var names = argNames(constructor) || [];
	return names.map(function(argName) {
		if (argName === 'options') {
			return options;
		}

		var path;
		if (argName.match(/view$/i)) {
			path = './views/' + argName.replace(/view$/i, '');
		} else {
			if (argName === 'debug') {
				options.name = name;
			}
			path = './models/' + argName;
		}
		
		var arg;
		var argConstructor = require(path);
		var obj = argConstructor();
		if(typeof obj === 'function') {
			// console.log('factory : args : delegateFunction :'+argName);
			arg = delegateFunction(Factory(require(path)), options);
		} else {
			var methods = Object.getOwnPropertyNames(obj);
			var props = obj.elements || Object.keys(obj.props || {});
			// console.log('factory : args : delegate :'+argName, methods, props);
			arg = delegate(Factory(require(path)), options, methods, props);
			arg._name = argName;
		}
		// var argId = getId(options, functionName(argConstructor));
		// console.log('factory : args : global.instances '+argId);
		// global.instances[argId] = arg;
		return arg;
	});
};

function argNames(fun) {
	var fnStr = fun.toString().replace(STRIP_COMMENTS, '')
	var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
	if (result === null)
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