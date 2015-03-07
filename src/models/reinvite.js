module.exports = require('webrtc-core').bdsft.Model(Reinvite)

function Reinvite(eventbus) {
  var self = {};

  self.props = {'incomingCallName': true, 'incomingCallUser': true, 'title': true};

  var reinviteSession;

  self.accept = function(){
    self.view.hide();
    reinviteSession.acceptReInvite();
  };

  self.reject = function(){
    self.view.hide();
    reinviteSession.rejectReInvite();
  };

  self.listeners = function() {
    eventbus.on("reInvite", function(e) {
      reinviteSession = e.session
      self.incomingCallName = e.request.from.display_name;
      self.incomingCallUser = e.request.from.uri.user;
      self.title = e.audioAdd ? "Adding Audio" : "Adding Video";
      eventbus.message(self.title, "success");    
      self.view.show();
    });
  };

  return self;
}