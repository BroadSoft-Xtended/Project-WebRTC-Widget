module.exports = CookieProp;

var Prop = require('./prop');
var C = require('./Constants');
var Utils = require('./Utils');
var $ = require('jquery');

function CookieProp(obj, prop, cookie, expires) {

	var self = {};

	self.__proto__ = Prop(obj, prop);

	var superSet = self.__proto__.__set;

	cookie = cookie || Utils.camelize(obj._name + ' ' + self._name);
	expires = expires || C.EXPIRES;

	self.__proto__.__init = function() {
		if(prop.value) {
			obj[self._name] = prop.value();
		}	else {
 			obj[self._name] = $.cookie(cookie);
		}
 	};
	self.__proto__.__set = function(value) {
		superSet(value);
		self.__persist(value);
	};
	self.__proto__.__persist = function(value) {
		if (value) {
			// console.log('set cookie value : '+cookie, value);
			$.cookie(cookie, value, {
				expires: expires
			});
		} else {
			$.removeCookie(cookie);
		}
	}

	return self;
}