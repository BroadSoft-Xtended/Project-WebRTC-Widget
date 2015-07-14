# Configuration 

The modules of the widget can be configured with custom

1. media (base64 encoded string)
2. images (base64 encoded strings)
3. configuration parameters
4. html templates
5. CSS styles

1., 2. and 3. will thereby extend the default configuration specified in the modules whereas 4. and 5. will completely replace the default templates and styles if any custom ones have been specified.

For any of those aspects the configuration can happen either in the

1. [html host page of the widget (no rebuild)](#configuration_html_host_page)
2. [widget/lib/loader.js file (needs rebuilding)](#configuration_in_loader)
3. [modules js/ directory and the files media.js / images.js / config.js / templates.js / styles.js (needs rebuilding)](#configuration_inside_the_modules)

The precedence of the configuration is to look first in the html host page, then in the widget/lib/loader.js file and finally in the modules/js/<aspect\>.js files.

## Configuration in HTML host page<a name="configuration_html_host_page"></a>

You can configure the widget by adding a javascript object inside the \<script src="webrtc-bundle.min.js"\> tag.

The format of that object needs to be like this

```
{
	"name of the module": {
		"configuration to overwrite": "value"
	}
}
```

For example in order to change the [websocketsServer](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack/blob/master/js/config.js) configuration from the sipstack module and the [domainTo](https://github.com/BroadSoft-Xtended/Library-WebRTC-CallControl/blob/master/js/config.js) configuration from the callcontrol module the javascript object inside the \<script\> tag would look like this

```
<script src="webrtc-bundle.min.js">
{
	"sipstack": {
		"websocketsServer": "ws_uri":"wss://webrtc.mydomain.com:8443",
		"weight": 0
	},
	"callcontrol": {
		"domainTo": "mydomain.com"
	}
}
</script>
```

In order to configure the other aspects of the modules those can be specified in the same object using one of the following keys:

```
{
	// replace HTML template for any module
	"template": {
		"authentication": "\<div\>myauthenticationview\</div\>"
	},
	// replace CSS style for any module
	"style": {
		"authentication": ".mycssclass{color: red;}"
	},
	// overwrite media for any module
	"media": {
		"sound": {
			"click": "mybase64string"
		}
	},
	// overwrite images for any module
	"image": {
		"video": {
			"videobg": "mybase64string"
		}
	},
	// overwrite configuration parameters for any module
	"callcontrol": {
		"domainTo": "mydomain.com"
	}
}
```

<a name="image_background_url"></a>Please note that when specifying images the same key needs to exist in the modules js/styles.js file. So eg for the video module the videobg image is being used as background image through the following CSS class

```
.bdsft-webrtc .video {
	background: url('data:image/svg+xml;base64,\<%= videobg %\>') no-repeat left center;
}
```

In order to replace the HTML template for a module you need to make sure that it contains CSS classes for every elements described in the lib/views/<modulename\>.js file. For example for the timer module the following elements are defined in [timer/lib/views/timer.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/views/timer.js)

```
self.elements = ['text', 'timer'];
```

The default HTML template uses those element names as CSS classes

```
<div class="bdsft-webrtc">
	<div class="timer fadeable classes">
		<div class="text"></div>
	</div>
</div>
```

You can then see your changes by using Chrome (version 43 and above) and navigating to the html host file without having to rebuild the widget.

## Configuration in Widget's Loader.js file<a name="configuration_in_loader"></a>

Especially if you are configuring templates or styles it might make sense to configure those directly inside the [widget/lib/loader.js](../lib/loader.js) file because of the size of the strings and in order to be able to easily edit it afterwards.

Therefore you can use the existing [Makefile](../Makefile) to create those custom configuration. Just place a custom file inside the following directory depending on the aspect you want to configure

1. Media : widget/media/myaudio.ogg
2. Image : widget/images/mybgimage.svg
3. HTML template : widget/templates/<modulename\>.jade
4. CSS styles : widget/styles/<modulename\>.styl

And run 'make' from the widget/ directory. This will then output any of those files depending on the aspect

1. widget/js/media.js
2. widget/js/images.js
3. widget/js/templates.js
4. widget/js/styles.js

Those files can then be used to configure the factory options parameter within the [widget/lib/loader.js](../lib/loader.js) file. The object has thereby the same
format as described [above](#configuration_html_host_page). Eg. assuming that we have generated custom styles and template for the authentication module we could specify those in the [widget/lib/loader.js](../lib/loader.js) file as following

```
module.exports = loader(Widget, {
	style: {
		authentication: require('../js/styles').authentication
	},
	template: {
		authentication: require('../js/templates').authentication
	},
	dependencies: {
	...
	}
});
```

## Configuration inside the modules<a name="configuration_inside_the_modules"></a>

The same structure of the configuration files for the different aspects described [above](#configuration_in_loader) also apply within the modules themselves. Either edit any existing files in those locations or create new ones and then run the make script through

```
cd <module> && make
```

The models or views then specify those files using the following syntax with the example of a [Model](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound/blob/master/lib/models/sound.js)

```
module.exports = require('webrtc-core').bdsft.Model(Sound, {
	media: require('../js/media'),
	config: require('../js/config')
});
```

Or for a [View](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/views/timer.js) it would look like this

```
module.exports = require('webrtc-core').bdsft.View(TimerView, {
	template: require('../../js/templates'),
	style: require('../../js/styles')
});
```

## Configuration of CSS attributes through data attributes of the \<script\> tag<a name="configuration_css_attributes"></a>

The following colors can be configured through data attributes of the \<script\> tag that loads the WebRTC Widget and injects it into the page.

Name                       | Attribute                          | Description
-------------------------- | ---------------------------------- | -------------------------------------------------
alertMessageColor          | data-alert-message-color           | Color for the alert message.
iconHighlightColor         | data-icon-highlight-color          | Color for the icons when hovering over them.
infoMessageColor           | data-info-message-color            | Color for the informational message.
settingsTabActiveColor     | data-settings-tab-active-color     | Color for an active tab in the settings view.
settingsTabInactiveColor   | data-settings-tab-inactive-color   | Color for an inactive tab in the settings view.
statsColor                 | data-stats-color                   | Color for the stats label.
successMessageColor        | data-success-message-color         | Color for the success message.
timerColor                 | data-timer-color                   | Color for the text of the timer.
warningMessageColor        | data-warning-message-color         | Color for the warning message.

They are defined on the <script\> tag like this

```
<script src="dist/webrtc-bundle.dev.js" data-icon-highlight-color="red">
</script>
```

If you want to define your own styles to be configured through data attributes of the \<script\> tag refer to [BroadSoft WebRTC SDK](./CreatingModule.md#styles_modulename_styl).
