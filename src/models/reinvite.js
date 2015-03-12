module.exports = require('webrtc-core').bdsft.Model(Reinvite)

function Reinvite(eventbus) {
  var self = {};

  self.props = {'incomingCallName': true, 'incomingCallUser': true, 'title': true};

  var reinviteSession;

  self.accept = function(){
    eventbus.toggleView(Constants.VIEW_REINVITE, false);
    reinviteSession.acceptReInvite();
  };

  self.reject = function(){
    eventbus.toggleView(Constants.VIEW_REINVITE, false);
    reinviteSession.rejectReInvite();
  };

  self.listeners = function() {
    eventbus.on("reInvite", function(e) {
      reinviteSession = e.session
      self.incomingCallName = e.request.from.display_name;
      self.incomingCallUser = e.request.from.uri.user;
      self.title = e.audioAdd ? "Adding Audio" : "Adding Video";
      eventbus.message(self.title, "success");    
      eventbus.toggleView(Constants.VIEW_REINVITE, true);
    });
  };

  return self;
}