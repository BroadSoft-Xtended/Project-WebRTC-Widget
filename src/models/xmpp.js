module.exports = XMPP;

var XMPP = require('stanza.io');

function XMPP(options, debug, eventbus) {
  var self = {};

  var client;
  self.login = function(jid, password) {
    client = XMPP.createClient({
      jid: jid,
      password: password,

      // If you have a .well-known/host-meta.json file for your 
      // domain, the connection transport config can be skipped. 

      transport: 'bosh',
      boshURL: 'broadsoft.com'
        // (or `boshURL` if using 'bosh' as the transport) 
    });
    return client;
  };

  self.init = function() {
  };

  self.listeners = function() {
    var self = this;
    eventbus.on("started", function() {
      // self.statusBeforeCall = converse.getStatus();
      // debug('status before call : ' + self.statusBeforeCall);
      // converse.setStatus('dnd');
    });
    eventbus.on("ended", function() {
      // debug('reset status to : ' + self.statusBeforeCall);
      // converse.setStatus(self.statusBeforeCall);
    });
  };

  return self;
}