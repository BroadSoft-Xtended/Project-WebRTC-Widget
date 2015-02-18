var jsdom = require('mocha-jsdom');
var fs = require('fs');
expect = require('expect');

jsdom({
  src: [
    // fs.readFileSync('js/jquery-1.11.0.js', 'utf-8'), 
    // fs.readFileSync('js/jquery-cookie-1.3.1.js', 'utf-8'),
    // fs.readFileSync('js/jquery-ui-1.10.3.custom.js', 'utf-8')
  ]
});

Object.defineProperties(global, {
  settings: {
    get: function(){
      return global.instances.settings_test;
    }
  },
  settingsview: {
    get: function(){
      return global.instances.settingsview_test;
    }
  },
  sipstack: {
    get: function(){
      return global.instances.sipstack_test;
    }
  },
  authentication: {
    get: function(){
      return global.instances.authenticationview_test;
    }
  },
  incomingcall: {
    get: function(){
      return global.instances.incomingcallview_test;
    }
  },
  messages: {
    get: function(){
      return global.instances.messagesview_test;
    }
  },
  configuration: {
    get: function(){
      return global.instances.configuration_test;
    }
  },
  callcontrol: {
    get: function(){
      return global.instances.callcontrol_test;
    }
  }
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
  Utils = require('../../src/Utils');
  WebRTC = require('../../src/WebRTC');
  Client = require('../../src/views/client');
  ClientConfig = require('../../js/client-config.js.default');
}

create = function(config){
  var clientConfig = Utils.clone(ClientConfig);
  var options = $.extend({id: 'test'}, clientConfig, config, {debug: true, disabled: false});
  var client = require('../../src/factory')(Client)(options);
  client.appendTo($('body'));
  return client;
}
tearDown = function() {
  WebRTC.Utils.getSearchVariable = function(name) {
    return false;
  }
  settings.clear();
}