# BroadSoft WebRTC SDK Overview

The WebRTC Widget has been built using the BroadSoft WebRTC SDK. 

It is designed for 3rd parties to easily integrate their own modules into the WebRTC Widget, adapt the existing modules in the WebRTC Widget with custom views and styles or create their own widgets reusing the existing UI Components. 

The SDK is structured as following:

## Core BroadSoft SDK<a name="webrtc_core"></a>

The WebRTC Core repository contains classes shared among all modules. 

It provides a simple framework to build your own modules. 

More details on how to build a module based on the WebRTC Core can be found in [Creating a Module](./CreatingModule.md). 

It provides amongst others the following core functionalities

- Model and View
- Bindings
- CSS Injection
- Event Bus
- Factory
- Script Injection
- Cookie / URL Config
- Utility Methods

## Modules<a name="modules"></a>

These are the building blocks of a widget. The BroadSoft WebRTC SDK ships with the following modules. 

- [Audio](https://github.com/BroadSoft-Xtended/Library-WebRTC-Audio)
- [Authentication](https://github.com/BroadSoft-Xtended/Library-WebRTC-Authentaction)
- [Call Control](https://github.com/BroadSoft-Xtended/Library-WebRTC-CallControl)
- [Connection Status](https://github.com/BroadSoft-Xtended/Library-WebRTC-ConnectionStatus)
- [Dial Pad](https://github.com/BroadSoft-Xtended/Library-WebRTC-DialPad)
- [Fullscreen](https://github.com/BroadSoft-Xtended/Library-WebRTC-FullScreen)
- [History](https://github.com/BroadSoft-Xtended/Library-WebRTC-History)
- [Incoming Call](https://github.com/BroadSoft-Xtended/Library-WebRTC-IncomingCall)
- [Messages](https://github.com/BroadSoft-Xtended/Library-WebRTC-Messages)
- [Settings](https://github.com/BroadSoft-Xtended/Library-WebRTC-Settings)
- [SIP Stack](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack)
- [Sound](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound)
- [Stats](https://github.com/BroadSoft-Xtended/Library-WebRTC-Stats)
- [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer)
- [Transfer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Transfer)
- [Video](https://github.com/BroadSoft-Xtended/Library-WebRTC-Video)
- [Video Bar](https://github.com/BroadSoft-Xtended/Library-WebRTC-VideoBar)

In order to build a custom module refer to [Creating a Module](./CreatingModule.md).

## Drop-in Widgets

A Drop-in Widget uses any combination of modules to create a widget insertable into an HTML page. 

It can be thought of as the entry point of your application and reusing WebRTC Core script injection is easily insertable through a single \<script\> tag. 

For details on how to create your own widget refer to [Creating a Drop-in Widget](./CreatingDropInWidget.md). 

The WebRTC Drop-in Widget consists of the following blocks

- [WebRTC Core](#webrtc_core)
- [Modules](#modules)
- Widget specific code
