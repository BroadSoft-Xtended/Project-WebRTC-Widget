/**
 * @fileoverview Utils
 */

(function(WebRTC) {
  var XMPP,
    logger = new ExSIP.Logger(WebRTC.name +' | '+ 'XMPP');

  XMPP = function(client, eventBus) {
    this.eventBus = eventBus;
    this.client = client;

    this.init();
  };

  XMPP.prototype = {
    init: function(){
      if(ClientConfig.enableXMPP) {
        try{
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
        } catch(e) {
          logger.error("Could not init XMPP chat : "+e);
        }
      }
    },
    registerListeners: function(){
      var self = this;
      this.eventBus.on("started", function(e){
        self.statusBeforeCall = converse.getStatus();
        logger.log('status before call : '+self.statusBeforeCall, self.client.configuration);
        converse.setStatus('dnd');
      });
      this.eventBus.on("ended", function(e){
        logger.log('reset status to : '+self.statusBeforeCall, self.client.configuration);
        converse.setStatus(self.statusBeforeCall);
      });
    }
  };

  WebRTC.XMPP = XMPP;
}(WebRTC));
