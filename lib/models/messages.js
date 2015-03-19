module.exports = require('webrtc-core').bdsft.Model(Messages)

function Messages(eventbus, configuration) {
  var self = {};

  self.props = {'text': true, 'level': true};

  // Display status messages
  self.message = function(text, level) { 
    if (!configuration.enableMessages) {
      return;
    }
    self.level = level;
    self.text = text;
  };

  self.getRemoteUser = function(rtcSession) {
    return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
  };

  self.listeners = function() {
    eventbus.on("ended", function(e) {
      self.message(configuration.messageEnded.replace('{0}', self.getRemoteUser(e.sender)), "normal");
    });
    eventbus.on("resumed", function(e) {
      self.message(configuration.messageResume.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    eventbus.on("started", function(e) {
      if (e.data && !e.data.isReconnect) {
        self.message(configuration.messageStarted.replace('{0}', self.getRemoteUser(e.sender)), "success");
      }
    });
    eventbus.on("held", function(e) {
      self.message(configuration.messageHold.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    eventbus.on("disconnected", function(e) {
      var msg = configuration.messageConnectionFailed;
      if (e.data && e.data.reason) {
        msg = e.data.reason;
      }
      if (e.data && e.data.retryAfter) {
        msg += " - Retrying in " + e.data.retryAfter + " seconds";
      }
      self.message(msg, "alert");
    });
    eventbus.on("failed", function(e) {
      var error = e.cause;
      self.message(error, "alert");
    });
    eventbus.on("progress", function(e) {
      self.message(configuration.messageProgress, "normal");
    });
    eventbus.on("message", function(e) {
      self.message(e.text, e.level);
    });
    eventbus.on("registrationFailed", function(e) {
      var statusCode = e.data.response.status_code;
      var msg = statusCode;
      if (statusCode === 403) {
        msg = "403 Authentication Failure";
      }
      self.message(configuration.messageRegistrationFailed.replace('{0}', msg), "alert");
    });
    eventbus.on("registered", function(e) {
      self.message(configuration.messageRegistered, "success");
    });
    eventbus.on("unregistered", function(e) {
      self.message(configuration.messageUnregistered || 'Unregistered', "success");
    });
    eventbus.on("connected", function(e) {
      self.message(configuration.messageConnected, "success");
    });

  };

  return self;
}