/***************************************************
 * Created on Wed Sep 11 08:27:05 CDT 2013 by:
 * Nathan Stratton <nathan@robotics.net>
 *
 * Copyright 2013 Exario Networks
 * http://www.exarionetworks.com
 ***************************************************/

clientConfig = {

// Enable Client Features
enableHD: true,
enableCallControl: true,
enableCallTimer: true,
enableCallHistory: true,
enableFullScreen: true,
enableSelfView: true,
enableCallStats: true,
enableDialpad: true,
enableMute: true,
enableMessages: true,
enableRegistrationIcon: true,
enableConnectionIcon: true,
enableWindowDrag: true,
enableSettings: true,
enableAutoAnswer: false,
enableConnectLocalMedia: true,

// Client Variables
allowOutside: true,
disableICE: true,
volumeClick: 1,
volumeDTMF: 1,
websocketsGateway: 'webrtc.exarionetworks.com',
websocketsPort: 8060,
websocketsType: 'ws', // ws or wss 
stunServer: '204.117.64.117',
stunPort: 3478,
domainFrom: 'exarionetworks.com',
domainTo: 'exarionetworks.com',
endCallURL: false,
transmitVGA: 512,
transmitHD: 2048,
expires: 365,
debug: true,

// Client Messages
messageProgress: "Ringing",
messageOutsideDomain: "Invalid Destination",
messageStarted: "Call Started",
messageEnded: "Call Ended",
messageCall: "Performing NAT Tests",
messageConnected: "Connected",
messageConnectionFailed: "Connection Failed!",
messageRegistered: "Registered",
messageRegistrationFailed: "Registration Failed!",
messageEmptyDestination: "Invalid Number",

};
