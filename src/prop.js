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

	var isCheckbox = function() {
		return data.attr && data.attr('type') === 'checkbox';
	};

	self.__get = function(){
		if(isCheckbox()) {
			return data.prop('checked');
		} else if(data.val) {
			return data.val();
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
		if(isCheckbox()) {
			data.prop('checked', value);
		} else if(data.val) {
			data.val(value);
		} else {
			data(value);
		}
	};

	self.define = function(){
		Object.defineProperty(obj, self._name, {
			writeable: false,
			configurable: true,
			get: prop.get || self.__get,
			set: prop.set || self.__set
		});	

		self.__init();
	};

	return self;
}