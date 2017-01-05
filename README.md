# BroadSoft WebRTC Widget

The BroadSoft WebRTC Widget is a SIP Endpoint bundled as a Drop-in Widget that can be injected into a HTML5 page using a script tag. After the library has loaded it will replace the script tag with the widget.

## Building

### Requisites before building

You need to have [Node.js](http://nodejs.org) installed on the system you want to build the WebRTC Widget. 

The supported node/npm version is 

"node":"0.12.7"
"npm":"2.11.3"

### How to build the WebRTC Widget

Install the Node.js dependencies:

```
npm install
```

Finally, run \`make\` to get a complete version of the WebRTC Widget:

```
make
```

The built version of webrtc will be available in the `dist/` subdirectory in both flavors: uncompressed (webrtc-bundle.dev.js) and minified (webrtc-bundle.min.js).

### Installation

Insert a \<script\> tag with the src attribute pointing to the minified (webrtc-bundle.min.js) or uncompressed (webrtc-bundle.dev.js) file in the target html file inside the body where you want the WebRTC widget to be placed.

```
<html>
  <head>
  </head>
  <body>
    <div>
      <script src=”dist/webrtc-bundle.min.js”>
      </script>
    </div>
  </body>
</html>
```

Once the page loads the webrtc-bundle.min.js <script\> tag will run and inject the WebRTC Widget at that position inside the html.

## Documentation

[Configuration](documentation/Configuration.md)

[SDK Overview](documentation/SDKOverview.md)

[Creating a Module](documentation/CreatingModule.md)

[Creating a Drop-in Widget](documentation/CreatingDropInWidget.md)
