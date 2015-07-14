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
  connectionstatus: {
    get: function(){
      return global.bdsft_client_instances.test.connectionstatus;
    }
  },
  settings: {
    get: function(){
      return global.bdsft_client_instances.test.settings;
    }
  },
  stats: {
    get: function(){
      return global.bdsft_client_instances.test.stats;
    }
  },
  statsview: {
    get: function(){
      return global.bdsft_client_instances.test.statsview;
    }
  },
  timer: {
    get: function(){
      return global.bdsft_client_instances.test.timer;
    }
  },
  timerview: {
    get: function(){
      return global.bdsft_client_instances.test.timerview;
    }
  },
  smsprovider: {
    get: function(){
      return global.bdsft_client_instances.test.smsprovider;
    }
  },
  sms: {
    get: function(){
      return global.bdsft_client_instances.test.sms;
    }
  },
  smsview: {
    get: function(){
      return global.bdsft_client_instances.test.smsview;
    }
  },
  history: {
    get: function(){
      return global.bdsft_client_instances.test.history;
    }
  },
  historyview: {
    get: function(){
      return global.bdsft_client_instances.test.historyview;
    }
  },
  settingsview: {
    get: function(){
      return global.bdsft_client_instances.test.settingsview;
    }
  },
  reinvite: {
    get: function(){
      return global.bdsft_client_instances.test.reinvite;
    }
  },
  reinviteview: {
    get: function(){
      return global.bdsft_client_instances.test.reinviteview;
    }
  },
  sipstack: {
    get: function(){
      return global.bdsft_client_instances.test.sipstack;
    }
  },
  authentication: {
    get: function(){
      return global.bdsft_client_instances.test.authentication;
    }
  },
  authenticationview: {
    get: function(){
      return global.bdsft_client_instances.test.authenticationview;
    }
  },
  incomingcall: {
    get: function(){
      return global.bdsft_client_instances.test.incomingcall;
    }
  },
  incomingcallview: {
    get: function(){
      return global.bdsft_client_instances.test.incomingcallview;
    }
  },
  messages: {
    get: function(){
      return global.bdsft_client_instances.test.messages;
    }
  },
  messagesview: {
    get: function(){
      return global.bdsft_client_instances.test.messagesview;
    }
  },
  configuration: {
    get: function(){
      return global.bdsft_client_instances.test.configuration;
    }
  },
  cookieconfig: {
    get: function(){
      return global.bdsft_client_instances.test.cookieconfig;
    }
  },
  callcontrol: {
    get: function(){
      return global.bdsft_client_instances.test.callcontrol;
    }
  },
  callcontrolview: {
    get: function(){
      return global.bdsft_client_instances.test.callcontrolview;
    }
  },
  video: {
    get: function(){
      return global.bdsft_client_instances.test.videoview;
    }
  },
  dialpad: {
    get: function(){
      return global.bdsft_client_instances.test.dialpadview;
    }
  },
  transfer: {
    get: function(){
      return global.bdsft_client_instances.test.transfer;
    }
  },
  transferview: {
    get: function(){
      return global.bdsft_client_instances.test.transferview;
    }
  },
  eventbus: {
    get: function(){
      return global.bdsft_client_instances.test.eventbus;
    }
  },
  urlconfig: {
    get: function(){
      return global.bdsft_client_instances.test.urlconfig;
    }
  },
  cookieconfig: {
    get: function(){
      return global.bdsft_client_instances.test.cookieconfig;
    }
  },
  videobar: {
    get: function(){
      return global.bdsft_client_instances.test.videobarview;
    }
  }
});


setUp = function(){
  test = require('../../node_modules/webrtc-sipstack/test/includes/common')(require('../../node_modules/webrtc-core/test/includes/common'));
  core = require('webrtc-core');
  core.bdsft.databinders = {};
  global.bdsft_client_instances = {};
  Utils = core.utils;
  Constants = core.constants;  
  ClientConfig = core.defaults;
}

create = function(config){
  var configData = core.utils.extend({id: 'test', debug: false, disabled: false, enableWindowDrag: false, namespace: 'bdsft_client_instances'}, config);
  var loader = require('../../lib/loader');
  var client = loader.create(configData);
  client.appendTo(core.utils.getElement('body'));
  return client;
}