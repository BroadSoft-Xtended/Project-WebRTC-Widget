module.exports = ReinviteView

var PopupView = require('./popup');

function ReinviteView(options, eventbus) {
  var self = {};

  self.__proto__ = PopupView(options, self, eventbus);

  self.elements = ['incomingCallName', 'incomingCallUser', 'acceptReInviteCall', 'rejectReInviteCall', 'title'];

  self.listeners = function() {
    eventbus.on("reInvite", function(e) {
      self.show();
      var incomingCallName = e.request.from.display_name;
      var incomingCallUser = e.request.from.uri.user;
      var title = e.audioAdd ? "Adding Audio" : "Adding Video";
      eventbus.message(title, "success");    
      self.incomingCallName.text(incomingCallName);
      self.incomingCallUser.text(incomingCallUser);
      self.title.text(title);
      self.acceptReInviteCall.off("click");
      self.acceptReInviteCall.on("click", function() {
        self.hide();
        e.session.acceptReInvite();
      });
      self.rejectReInviteCall.off("click");
      self.rejectReInviteCall.on("click", function() {
        self.hide();
        e.session.rejectReInvite();
      });
    });
  };

  return self;
}