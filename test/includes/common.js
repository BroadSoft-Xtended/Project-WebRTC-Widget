var jsdom = require('mocha-jsdom');
var fs = require('fs');
expect = require('expect');


jsdom({
  src: [
    fs.readFileSync('js/jquery-1.11.0.js', 'utf-8'), 
    fs.readFileSync('js/jquery-cookie-1.3.1.js', 'utf-8'),
    fs.readFileSync('js/jquery-ui-1.10.3.custom.js', 'utf-8')
  ]
});

localStorage = {};
localStorage.setItem = function (key, val) {
     this[key] = val + '';
}
localStorage.getItem = function (key) {
    return this[key];
}
Object.defineProperty(localStorage, 'length', {
    get: function () { return Object.keys(this).length - 2; }
});

setUp = function(){
  testUA = require('./testUA');
  WebRTC = require('../../src/WebRTC');
  ClientConfig = require('../../js/client-config.js.default');
}

tearDown = function() {
  WebRTC.Utils.getSearchVariable = function(name) {
    return false;
  }
  client.settings.clear();
}