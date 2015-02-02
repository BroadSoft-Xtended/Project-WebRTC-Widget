module.exports = XMPP;

var events = require('events');
var debug = require('debug')('xmpp');
var debugerror = require('debug')('xmpp:ERROR');
debugerror.log = console.warn.bind(console);

function XMPP(client) {
  this.client = client;

  this.init();
}

XMPP.prototype = {
  init: function() {
    if (ClientConfig.enableXMPP) {
      try {
        converse.initialize({
          auto_list_rooms: false,
          auto_subscribe: false,
          bosh_service_url: 'https://bind.opkode.im', // Please use this connection manager only for testing purposes
          hide_muc_server: false,
          i18n: locales.en, // Refer to ./locale/locales.js to see which locales are supported
          prebind: false,
          show_controlbox_by_default: true,
          xhr_user_search: false
        });
        this.registerListeners();
      } catch (e) {
        debugerror("Could not init XMPP chat : " + e);
      }
    }
  },
  registerListeners: function() {
    var self = this;
    events.on("started", function(e) {
      self.statusBeforeCall = converse.getStatus();
      debug('status before call : ' + self.statusBeforeCall, e);
      converse.setStatus('dnd');
    });
    events.on("ended", function(e) {
      debug('reset status to : ' + self.statusBeforeCall, e);
      converse.setStatus(self.statusBeforeCall);
    });
  }
};