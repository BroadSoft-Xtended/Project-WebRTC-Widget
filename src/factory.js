var $ = require('jquery');
var core = require('webrtc-core');

module.exports = Factory;

function Factory(options) {
	function getId(name) {
		var id;
		if (typeof options === "object") {
			id = options.id;
		}
		id = id || 'default';

		id = name + '_' + id;
		return id;
	};

	function requireArg(argName) {
		for(var i=0; i < (options.dependencies || []).length; i++){
			var dependency = options.dependencies[i];
			if(dependency[argName]) {
				return dependency[argName];
			}
		}

		if (argName.match(/view$/i)) {
			return require('views/' + argName.replace(/view$/i, '') + '.js');
		} else {
			return require('models/' + argName + '.js');
		}
	}

	function args(constructor) {
		return (constructor.argNames || []).map(function(argName) {
			if (argName === 'options') {
				return options;
			}

			var argConstructor = requireArg(argName);

			if (argName === 'debug') {
				return argConstructor.create([core.utils.extend({}, options, {
					name: constructor.name
				})]);
			}
			// console.log('arg : '+argName);
			var arg = create(argConstructor);
			return arg;
		});
	};

	function create(constructor) {
		var isNode = typeof global !== "undefined" && {}.toString.call(global) == '[object global]';
		if (!isNode) {
			require('views/**/*.js', {
				glob: true
			});
			require('models/**/*.js', {
				glob: true
			});
		}
		var prefix = options.instancesObj || 'bdsft';
		global[prefix] = global[prefix] || {};
		var name = constructor.name;
		var id = getId(name);
		if (!global[prefix][id]) {
			// console.log('factory : ' + id);
			var constructorArgs = args(constructor);
			// console.log('factory : create ' + id + ' with ', constructor.argNames);
			var object = constructor.create(constructorArgs);
			global[prefix][id] = object;
		}
		return global[prefix][id];
	}

	return create;
}
