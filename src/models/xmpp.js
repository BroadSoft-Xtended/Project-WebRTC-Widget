module.exports = require('../factory')(Sound);

function XMPP(options, debug, eventbus, configuration) {
  var self = {};

  init: function() {
    if (configuration.enableXMPP) {
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
      } catch (e) {
        debug("Could not init XMPP chat : " + e);
      }
    }
  },
  self.listeners = function() {
    var self = this;
    eventbus.on("started", function() {
      self.statusBeforeCall = converse.getStatus();
      debug('status before call : ' + self.statusBeforeCall);
      converse.setStatus('dnd');
    });
    eventbus.on("ended", function() {
      debug('reset status to : ' + self.statusBeforeCall);
      converse.setStatus(self.statusBeforeCall);
    });
  }

  self.init();
  
  return self;
}