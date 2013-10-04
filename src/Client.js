/***************************************************
 * Created on Mon Jan 14 15:32:43 GMT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/
(function(WebRTC) {
  var Client,
    LOG_PREFIX = WebRTC.name +' | '+ 'Client' +' | ';

  Client = function() {
    this.configuration = new WebRTC.Configuration();
    this.sound = new WebRTC.Sound();
    this.settings = new WebRTC.Settings(this.configuration, this.sound);
    this.stats = new WebRTC.Stats(this);
    this.timer = new WebRTC.Timer(this, this.stats, this.configuration);
    this.video = new WebRTC.Video();
    this.history = new WebRTC.History(this.sound);
    this.sipStack = null;
    this.rtcSession = null;
    this.fullScreen = false;

    this.registerListeners();

    this.init();
  };

  Client.prototype = {
    init: function() {
      var self = this;
      var unsupported = WebRTC.Utils.compatibilityCheck();
      if(unsupported)
      {
        $('#unsupported').html(unsupported).show();
      }

      // Allow some windows to be draggable, required jQuery.UI
      if (ClientConfig.enableWindowDrag)
      {
        $(function()
        {
          $("#localVideo").draggable();
          $("#callStats").draggable();
          $("#callHistory").draggable();
        });
      }

      // Initial function selection
      if (ClientConfig.enableHD === true && this.configuration.hd === true)
      {
        $("*").addClass("hd");
      }

      if (this.configuration.register === true && !this.configuration.password)
      {
        this.authPopUp(this.configuration.userid, this.configuration.password);
      }
      else
      {
        if (!this.configuration.userid)
        {
          this.configuration.userid = WebRTC.Utils.randomUserid();
        }
      }

      if (this.configuration.destination)
      {
        this.configuration.hideCallControl = true;
      }

      $.cookie.raw = true;

      window.onbeforeunload = function(e) {
        if (self.configuration.timerRunning)
        {
          self.rtcSession.terminate();
        }
        self.endCall();
        return null;
      };

      this.onLoad(this.configuration.userid, this.configuration.password);
    },

    authPopUp: function() {
      var self = this;
      if (this.configuration.userid !== false)
      {
        $("#authPopup input#username").val(this.configuration.userid);
      }

      $("#authPopup").keypress(function(e)
      {
        if (e.which === 13)
        {
          $('#authPopupButton').click();
        }
      });

      $("#authPopup").fadeIn(300);
      $('#authPopupButton').click(function()
      {
        var userid = $("#authPopup input#username").val();
        var password = $("#authPopup input#password").val();
        if ($("#authPopup input#displayName").val())
        {
          self.configuration.displayName = $("#authPopup input#displayName").val();
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
        $("#authPopup").fadeOut(300);
        self.onLoad(userid, password);
      });
    },

    errorPopup: function(error) {
      $( "#errorPopup" ).text(error).dialog(
        {
          draggable: true,
          dialogClass: "no-close",
          buttons:
            [
              {
                text: "OK",
                click: function()
                {
                  $( this ).dialog( "close" );
                }
              }
            ]
        }
      );
    },

    // Setup the GUI
    guiStart: function() {
      // Set size for Chrome and Firefox
      $("#main").css("zoom", this.configuration.size);
      $("#main").css("-moz-transform", "scale(" + this.configuration.size +")");
      if (($.cookie("settingWindowPosition")))
      {
        var windowPositions = $.cookie("settingWindowPosition").split('|');
        for (var i = 0; i < windowPositions.length; ++i)
        {
          var elementPosition = windowPositions[i].split('-');
          $(elementPosition[0]).css("top", elementPosition[1]);
          $(elementPosition[0]).css("left", elementPosition[2]);
        }
      }
      // Fade in UI elements
      $("#remoteVideo, #videoBar").fadeIn(1000);
      if (ClientConfig.enableCallControl && !this.configuration.hideCallControl)
      {
        $("#callControl, #call, #ok").fadeIn(1000);
      }
      if (ClientConfig.enableDialpad)
      {
        $("#dialpadIconShow").fadeIn(1000);
      }
      if (ClientConfig.enableSelfView)
      {
        if ($.cookie('settingSelfViewDisable') === "true")
        {
          $("#localVideo, #selfViewDisable").fadeOut(100);
          $("#selfViewEnable").fadeIn(1000);
        }
        else
        {
          $("#selfViewEnable").fadeOut(1000);
          $("#localVideo, #selfViewDisable").fadeIn(1000);
        }
      }
      if (ClientConfig.enableSettings)
      {
        $("#settings").fadeIn(1000);
      }
      if (ClientConfig.enableFullScreen)
      {
        $("#fullScreenExpand").fadeIn(1000);
      }
    },

    // Display status messages
    message: function(text, level)
    {
      if(!ClientConfig.enableMessages)
      {
        return;
      }
      $("#messages").stop(true, true).fadeOut();
      $("#messages").removeClass("normal success warning alert");
      $("#messages").addClass(level).text(text).fadeIn(10).fadeOut(10000);
    },

    // Make sure destination allowed and in proper format
    validateDestination: function(destination)
    {
      if (destination.indexOf("sip:") === -1)
      {
        destination = ("sip:" + destination);
      }
      if ((destination.indexOf(ClientConfig.domainTo) === -1 ) && ClientConfig.allowOutside === false)
      {
        this.message(ClientConfig.messageOutsideDomain, "alert");
        return(false);
      }
      if ((destination.indexOf("@") === -1))
      {
        destination = (destination + "@" + ClientConfig.domainTo);
      }
      return(destination);
    },

    // URL call
    uriCall: function(destination)
    {
      destination = this.validateDestination(destination);
      if (destination === false)
      {
        return;
      }

      $('#call').fadeOut(1000);
      $("#hangup").fadeIn(1000);
      this.message(ClientConfig.messageCall, "success");

      // Start the Call
      this.sipStack.call(destination, this.configuration.getExSIPOptions());
    },

    // Incoming reinvite function
    incomingReInvite: function(e) {
      if (ClientConfig.enableAutoAcceptReInvite) {
        e.data.session.acceptReInvite();
      } else {
        var incomingCallName = e.data.request.from.display_name;
        var incomingCallUser = e.data.request.from.uri.user;
        var title = e.data.audioAdd ? "Adding Audio" : "Adding Video";
        this.message(title, "success");
        $("#reInvitePopup").fadeIn(100);
        $("#reInvitePopup .incomingCallName").text(incomingCallName);
        $("#reInvitePopup .incomingCallUser").text(incomingCallUser);
        $("#reInvitePopup .title").text(title);
        $("#acceptReInviteCall").off("click");
        $("#acceptReInviteCall").on("click", function(){
          $('#reInvitePopup').fadeOut(1000);
          e.data.session.acceptReInvite();
        });
        $("#rejectReInviteCall").off("click");
        $("#rejectReInviteCall").on("click", function(){
          $('#reInvitePopup').fadeOut(1000);
          e.data.session.rejectReInvite();
        });
      }
    },

    // Incoming call function
    incomingCall: function(e)
    {
      var incomingCallName = e.data.request.from.display_name;
      var incomingCallUser = e.data.request.from.uri.user;
      this.message("Incoming Call", "success");
      if (ClientConfig.enableAutoAnswer)
      {
        $("#hangup").fadeIn(1000);
        this.rtcSession.answer(this.configuration.getExSIPOptions());
      }
      else
      {
        $("#callPopup").fadeIn(100);
        $("#callPopup .incomingCallName").text(incomingCallName);
        $("#callPopup .incomingCallUser").text(incomingCallUser);
        this.sound.playRingtone();
      }
    },

    endCall: function() {
      this.video.updateSessionStreams(this.rtcSession);
  //  rtcSession = null;
      $("#hangup, #muteAudio").fadeOut(100);
      // Bring up the main elements
      if (ClientConfig.enableCallControl === true)
      {
        this.configuration.hideCallControl = false;
      }

      this.guiStart();

      if (this.configuration.timerRunning === true)
      {
        this.timer.stop();
      }
      if (ClientConfig.endCallURL !== false)
      {
        window.location = ClientConfig.endCallURL;
      }
    },

    getSessionId: function(){
      return this.rtcSession.id.replace(/\./g,'');
    },

    setCookie: function()
    {
      if (!ClientConfig.enableCallHistory)
      {
        return;
      }
      // Get latest cookie
      var allCookies = document.cookie;
      var callsArray = allCookies.match(/call_(.*?)\:\d{2}\:\d{2}/g);
      var callNumber = null;
      if (callsArray)
      {
        callNumber = callsArray.length + 1;
      }
      else
      {
        callNumber = 0;
      }
      callNumber++;

      // cookie vars
      var start = this.rtcSession.start_time;
      var epochStart = new Date(start).getTime();
      var length = this.timer.format(Math.round(Math.abs((this.rtcSession.end_time - start) / 1000)));
      var remote = this.rtcSession.remote_identity.uri;
      var direction = null;
      if (this.rtcSession.direction === "outgoing")
      {
        direction = "------>";
      }
      else
      {
        direction = "<------";
      }
      var cookieKey = ("call_" + callNumber);
      var cookieValue = (epochStart + "|" + remote + "|" + direction + "|" + length);
      $.cookie(cookieKey, cookieValue, { expires: ClientConfig.expires});
    },

    // Initial startup
    onLoad: function(userid, password) {
      var self = this;
      console.log(LOG_PREFIX +"onLoad");

      // SIP stack
      this.sipStack = new ExSIP.UA(this.configuration.getExSIPConfig(userid, password));

      this.updateRtcMediaHandlerOptions();

      // Start SIP Stack
      this.sipStack.start();

      // Start the GUI
      this.guiStart();

      // sipStack callbacks
      this.sipStack.on('connected', function(e)
      {
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("alert");
          $("#connected").addClass("success").fadeIn(10).fadeOut(3000);
        }
        if (ClientConfig.enableCallControl && !self.configuration.hideCallControl)
        {
          $("#call").fadeIn(1000);
        }
        self.message(ClientConfig.messageConnected, "success");

        if(ClientConfig.enableConnectLocalMedia) {
          // Connect to local stream
          self.sipStack.getUserMedia(self.configuration.getExSIPOptions(), function(localStream){
            self.video.updateStreams([localStream], []);
            // Start a call
            if (self.configuration.destination !== false)
            {
              self.uriCall(self.configuration.destination);
            }
          });
        }
      });
      this.sipStack.on('disconnected', function(e)
      {
        if (ClientConfig.enableConnectionIcon)
        {
          $("#connected").removeClass("success");
          $("#connected").addClass("alert").fadeIn(100);
        }
        self.message(ClientConfig.messageConnectionFailed, "alert");
        self.endCall();
        $("#call").hide();
      });
      this.sipStack.on('onReInvite', function(e) {
        self.incomingReInvite(e);
      });
      this.sipStack.on('newRTCSession', function(e)
      {
        self.rtcSession = e.data.session;

        // call event handlers
        self.rtcSession.on('progress', function(e)
        {
          self.message(ClientConfig.messageProgress, "normal");
          self.sound.playDtmfRingback();
        });
        self.rtcSession.on('failed', function(e)
        {
          var error = e.data.cause;
          self.message(error, "alert");
          if (error === "User Denied Media Access")
          {
            self.errorPopup("WebRTC was not able to access your camera!");
          }
          self.sound.pause();
          self.endCall();
        });
        self.rtcSession.on('started', function(e)
        {
          self.video.updateSessionStreams(self.rtcSession);
          $('.stats-container').attr('id', self.getSessionId()+'-1');
          self.sound.pause();
          self.timer.start();
          self.message(ClientConfig.messageStarted, "success");
          if (ClientConfig.enableMute)
          {
            $("#muteAudio").fadeIn(1000);
          }
        });
        self.rtcSession.on('ended', function(e)
        {
          self.message(ClientConfig.messageEnded, "normal");
          self.setCookie();
          self.endCall();
        });
        // handle incoming call
        if (e.data.session.direction === "incoming")
        {
          self.incomingCall(e);
        }
      });
      if(!ClientConfig.enableConnectLocalMedia) {
        if (self.configuration.destination !== false) {
          // Wait 300 ms for websockets connection then call destination in URL
          setTimeout(function(){self.uriCall(self.configuration.destination);},300);
        }
      }

      // Registration callbacks only if registering
      if (password !== false)
      {
        this.sipStack.on('registered', function(e)
        {
          if (ClientConfig.enableRegistrationIcon)
          {
            $("#registered").removeClass("alert");
            $("#registered").addClass("success").fadeIn(10).fadeOut(3000);
          }
          self.message(ClientConfig.messageRegistered, "success");
        });
        this.sipStack.on('registrationFailed', function(e)
        {
          if (ClientConfig.enableRegistrationIcon)
          {
            //$("#registered").removeClass("success");
            $("#registered").addClass("alert").fadeIn(100);
          }
          self.message(ClientConfig.messageRegistrationFailed, "alert");
        });
      }
    },

    // What we do when we get a digit during a call
    pressDTMF: function(digit)
    {
      if (digit.length !== 1)
      {
        return;
      }
      if (this.configuration.timerRunning === true)
      {
        var file = null;
        if (digit === "*")
        {
          file = "star";
        }
        else if (digit === "#")
        {
          file = "pound";
        }
        else
        {
          file = digit;
        }
        this.sound.playDtmfTone(file);
        var mainDestination = $("#callControl input#destination");
        mainDestination.val(mainDestination.val() + digit);
        if (this.configuration.timerRunning === true)
        {
          this.rtcSession.sendDTMF(digit, this.configuration.getExSIPOptions());
        }
      }
    },

    enableLocalAudio: function(enabled) {
      var localMedia = this.rtcSession.getLocalStreams()[0];
      var localAudio = localMedia.getAudioTracks()[0];
      localAudio.enabled = enabled;
    },

    registerListeners: function() {
      var self = this;

  // Buttons
      $('#call').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        var mainDestination = $("#callControl input#destination");
        var destination = mainDestination.val();
        if (destination === "")
        {
          self.message(ClientConfig.messageEmptyDestination, "alert");
        }
        else
        {
          self.uriCall(destination);
        }
      });

      $('#hangup').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.rtcSession.terminate();
        if (self.fullScreen === true)
        {
          $('#fullScreenContract').click();
        }
      });

      $('#fullScreenExpand').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $('#video')[0].webkitRequestFullScreen();
        self.fullScreen = true;
      });

      $('#fullScreenContract').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        document.webkitCancelFullScreen();
        self.fullScreen = false;
        $("#fullScreenContract").fadeOut(100);
        $("#fullScreenExpand").fadeIn(1000);
      });

      $('#selfViewDisable').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#localVideo, #selfViewDisable").fadeOut(100);
        $("#selfViewEnable").fadeIn(1000);
      });

      $('#selfViewEnable').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#selfViewEnable").fadeOut(1000);
        $("#localVideo, #selfViewDisable").fadeIn(1000);
      });

      $('#muteAudio').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableLocalAudio(false);
        $("#muteAudio").fadeOut(1000);
        $("#unmuteAudio").fadeIn(1000);
      });

      $('#unmuteAudio').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.enableLocalAudio(true);
        $("#unmuteAudio").fadeOut(1000);
        $("#muteAudio").fadeIn(1000);
      });

      $('#dialpadIconShow').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#dialIconpadShow").fadeOut(1000);
        $("#dialpad, #dialpadIconHide").fadeIn(1000);
      });

      $('#dialpadIconHide').bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        $("#dialpad, #dialpadIconHide").fadeOut(1000);
        $("#dialpadIconShow").fadeIn(1000);
      });

      $("#historyClose").bind('click', function(e)
      {
        e.preventDefault();
        self.sound.playClick();
        self.history.toggle();
      });

      $('#acceptIncomingCall, #rejectIncomingCall').bind('click', function(e)
      {
        e.preventDefault();
        $("#callPopup").fadeOut(500);
        self.sound.pause();
        if (this.id === "acceptIncomingCall")
        {
          $('#call').fadeOut(1000);
          $("#hangup").fadeIn(1000);
          self.rtcSession.answer(self.configuration.getExSIPOptions());
        }
        else if (this.id === "rejectIncomingCall")
        {
          self.rtcSession.terminate();
        }
      });

      // Dialpad digits
      $("#dialpad").bind('click', function(e)
      {
        self.pressDTMF(e.target.textContent);
      });

  // Digits from keyboard
      document.onkeypress=function(e)
      {
        e = e || window.event;
        if ((e.charCode >= 48 && e.charCode <= 57) || e.charCode === 35 || e.charCode === 42)
        {
          var digit = String.fromCharCode(e.charCode);
          self.pressDTMF(digit);
        }
        else if (e.charCode === 83)
        {
          self.stats.toggle();
        }
        else if (e.charCode === 72)
        {
          self.history.toggle();
        }
      };
    },

    updateRtcMediaHandlerOptions: function(){
      if(typeof(this.sipStack) === 'undefined') {
        return;
      }

      this.sipStack.setRtcMediaHandlerOptions(this.configuration.getRtcMediaHandlerOptions());
    }
  };

  WebRTC.Client = Client;
}(WebRTC));
