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
      return global.bdsft_client_instances.test.connectionstatus.connectionstatus;
    }
  },
  settings: {
    get: function(){
      return global.bdsft_client_instances.test.settings.settings;
    }
  },
  stats: {
    get: function(){
      return global.bdsft_client_instances.test.stats.stats;
    }
  },
  statsview: {
    get: function(){
      return global.bdsft_client_instances.test.stats.statsview;
    }
  },
  timer: {
    get: function(){
      return global.bdsft_client_instances.test.timer.timer;
    }
  },
  timerview: {
    get: function(){
      return global.bdsft_client_instances.test.timer.timerview;
    }
  },
  smsprovider: {
    get: function(){
      return global.bdsft_client_instances.test.sms.smsprovider;
    }
  },
  sms: {
    get: function(){
      return global.bdsft_client_instances.test.sms.sms;
    }
  },
  smsview: {
    get: function(){
      return global.bdsft_client_instances.test.sms.smsview;
    }
  },
  history: {
    get: function(){
      return global.bdsft_client_instances.test.history.history;
    }
  },
  historyview: {
    get: function(){
      return global.bdsft_client_instances.test.history.historyview;
    }
  },
  settingsview: {
    get: function(){
      return global.bdsft_client_instances.test.settings.settingsview;
    }
  },
  sipstack: {
    get: function(){
      return global.bdsft_client_instances.test.sipstack.sipstack;
    }
  },
  authentication: {
    get: function(){
      return global.bdsft_client_instances.test.authentication.authentication;
    }
  },
  authenticationview: {
    get: function(){
      return global.bdsft_client_instances.test.authentication.authenticationview;
    }
  },
  incomingcall: {
    get: function(){
      return global.bdsft_client_instances.test.incomingcall.incomingcall;
    }
  },
  incomingcallview: {
    get: function(){
      return global.bdsft_client_instances.test.incomingcall.incomingcallview;
    }
  },
  messages: {
    get: function(){
      return global.bdsft_client_instances.test.messages.messages;
    }
  },
  messagesview: {
    get: function(){
      return global.bdsft_client_instances.test.messages.messagesview;
    }
  },
  cookieconfig: {
    get: function(){
      return global.bdsft_client_instances.test.core.cookieconfig;
    }
  },
  callcontrol: {
    get: function(){
      return global.bdsft_client_instances.test.callcontrol.callcontrol;
    }
  },
  callcontrolview: {
    get: function(){
      return global.bdsft_client_instances.test.callcontrol.callcontrolview;
    }
  },
  video: {
    get: function(){
      return global.bdsft_client_instances.test.video.videoview;
    }
  },
  dialpad: {
    get: function(){
      return global.bdsft_client_instances.test.dialpad.dialpadview;
    }
  },
  transfer: {
    get: function(){
      return global.bdsft_client_instances.test.transfer.transfer;
    }
  },
  transferview: {
    get: function(){
      return global.bdsft_client_instances.test.transfer.transferview;
    }
  },
  eventbus: {
    get: function(){
      return global.bdsft_client_instances.test.eventbus.eventbus;
    }
  },
  urlconfig: {
    get: function(){
      return global.bdsft_client_instances.test.core.urlconfig;
    }
  },
  cookieconfig: {
    get: function(){
      return global.bdsft_client_instances.test.core.cookieconfig;
    }
  },
  videobar: {
    get: function(){
      return global.bdsft_client_instances.test.videobar.videobarview;
    }
  }
});


setUp = function(){
  test = require('../../node_modules/webrtc-sipstack/test/includes/common')(require('../../node_modules/bdsft-sdk-test/test/includes/common'));
  core = require('webrtc-core');
  global.bdsft_client_instances = {};
  Utils = core.utils;
  Constants = core.constants;  
  ClientConfig = core.defaults;
}

create = function(config){
  config = config || {};
  var configData = core.utils.extend({id: 'test', debug: {names: false}, sipstack: {enabled: false}, stats: {enableCallStats: false}, namespace: 'bdsft_client_instances'}, config);
  var loader = require('../../lib/loader');
  var client = loader.create(configData);
  client.appendTo(core.utils.getElement('body'));
  return client;
}