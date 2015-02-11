module.exports = require('../factory')(ReinviteView)

function ReinviteView(options, eventbus) {
  var self = {};

  self.__proto__ = PopupView(eventbus);

  self.elements = ['incomingCallName', 'incomingCallUser', 'acceptReInviteCall', 'rejectReInviteCall', 'title'];

  self.listeners = function() {
    eventbus.on("reInvite", function(e) {
      self.show();
      var incomingCallName = e.data.request.from.display_name;
      var incomingCallUser = e.data.request.from.uri.user;
      var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
      eventbus.message(title, "success");    
      self.incomingCallName.text(incomingCallName);
      self.incomingCallUser.text(incomingCallUser);
      self.title.text(title);
      self.acceptReInviteCall.off("click");
      self.acceptReInviteCall.on("click", function() {
        self.hide();
        e.data.session.acceptReInvite();
      });
      self.rejectReInviteCall.off("click");
      self.rejectReInviteCall.on("click", function() {
        self.hide();
        e.data.session.rejectReInvite();
      });
    });
  };

  return self;
}