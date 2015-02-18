module.exports = Prop;

function Prop(obj, prop) {
	var self = {};

	self._name = prop.name || prop;
	var internal;
	var data = obj.view && obj.view[self._name] || function(value){
		if(arguments.length === 1) {
			internal = value;
		} else {
			return internal;
		}
	};

	self.__get = function(){
		if(data.val) {
			return data.val();
		} else if(data.prop) {
			return data.prop('checked');
		} else {
			return data()
		}
	};
	self.__init = function(){
		if(prop.value) {
			obj[self._name] = prop.value();
		}	
	};
	self.__set = function(value){
		if(prop.default && !value) {
			value = prop.default;
		}
		if(data.val) {
			data.val(value);
		} else if(data.prop) {
			data.prop('checked', value);
		} else {
			data(value);
		}
	};

	self.define = function(){
		Object.defineProperty(obj, self._name, {
			writeable: false,
			get: prop.get || self.__get,
			set: prop.set || self.__set
		});	

		self.__init();
	};

	return self;
}