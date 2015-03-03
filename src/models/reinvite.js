module.exports = Reinvite

function Reinvite(eventbus, reinviteView) {
  var self = {};

  self.view = reinviteView;

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
      reinviteSession = e.data.session
      eventbus.message(title, "success");    
      self.incomingCallName = e.request.from.display_name;
      self.incomingCallUser = e.request.from.uri.user;
      self.title = e.audioAdd ? "Adding Audio" : "Adding Video";
      self.view.show();
    });
  };

  return self;
}