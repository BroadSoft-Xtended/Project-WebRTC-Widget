/**
 * @fileoverview Utils
 */

(function (WebRTC) {
  var Authentication;

  Authentication = function (client, configuration, eventBus) {
    this.popup = $( "#authPopup" );
    this.okButton = $('#authPopupButton');
    this.userid = $('#authPopup input#username');
    this.password = $('#authPopup input#password');
    this.displayName = $('#authPopup input#displayName');

    this.visible = false;
    this.client = client;
    this.configuration = configuration;
    this.eventBus = eventBus;

    this.registerListeners();
  };

  Authentication.prototype = {
    registerListeners: function () {
      var self = this;

      this.eventBus.on("registrationFailed", function(e){
        var statusCode = e.data.response.status_code;
        if(statusCode === 401 && ClientConfig.register === true) {
          self.setVisible(true);
        }
      });

      this.okButton.bind('click', function()
      {
        var userid = self.userid.val();
        var password = self.password.val();
        if (self.displayName.val())
        {
          self.configuration.displayName = self.displayName.val();
        }
        self.configuration.register=true;
        if (userid === "")
        {
          $("#alert").text("Invalid Username").fadeIn(10).fadeOut(4000);
          return;
        }
        if (password === "")
        {
          $("#alert").text("Invalid Password").fadeIn(10).fadeOut(4000);
          return;
        }
        self.setVisible(false);
        self.client.onLoad(userid, password);
      });

      this.popup.bind('keypress', function(e)
      {
        if (e.which === 13)
        {
          self.okButton.click();
        }
      });
    },

    show: function(){
      if (this.configuration.userid !== false)
      {
        this.userid.val(this.configuration.userid);
      }

      this.setVisible(true);
    },

    setVisible: function(visible){
      this.visible = visible;
      this.client.updateClientClass();
    }
  };

  WebRTC.Authentication = Authentication;
}(WebRTC));
