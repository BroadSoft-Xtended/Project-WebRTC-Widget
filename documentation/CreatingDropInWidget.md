# Creating a Drop-in Widget

If you want to completely recreate the BroadSoft WebRTC Widget that goes beyond simply configuring it with custom HTML templates and styles or you want to integrate your own modules then you might want to create your own Drop-in Widget.

The recommended structure of a Drop-in Widget written as a CommonJS module is as following

1. [lib/loader.js](#lib_loader_js) : Bootstraping the widget using webrtc-core.Loader
2. [index.js](#index_js) : entry point to your module
3. [Makefile](#Makefile) : inheriting from webrtc-core/makefile.defs
4. [lib/views/<widgetname\>.js](CreatingModule.md#lib_views_modulename) : View inheriting from webrtc-core.bdsft.View
5. [lib/models/<widgetname\>.js](CreatingModule.md#lib_models_modulename) : Model inheriting from webrtc-core.bdsft.Model
6. (optional) [templates/<modulename\>.jade](CreatingModule.md#templates_modulename_jade) : HTML template
7. (optional) [styles/<modulename\>.styl](CreatingModule.md#styles_modulename_styl) : CSS styles
8. (optional) [images/<filename\>.\*](CreatingModule.md#images_filename) : Images
9. (optional) [media/<filename\>.\*](CreatingModule.md#media_filename) : Media
10. (optional) [js/config.js](CreatingModule.md#js_config_js) : Configuration parameters

## lib/loader.js
<a name="lib_loader_js"></a>

The main purpose of this file is to bootstrap the widget and specify the dependencies of it.

It can also be used to overwrite the default configurations of the module as described in [here](Configuration.md#configuration_in_loader).

By using [webrtc-core.Loader](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/loader.js) this class will also make sure that the Drop-in Widget is being inserted into the HTML host page.

Under the hood the webrtc-core.Loader is using the [webrtc-core.Factory](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/factory.js) and the dependencies provided to create all modules used in the widget and correctly inject them as parameters to other modules that depend on them.

The BroadSoft WebRTC Widget contains the following [lib/loader.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/loader.js) file

```
var loader = require('webrtc-core').loader;

var Widget = require('../');

module.exports = loader(Widget, {
	dependencies: {
		authentication: require('webrtc-authentication'),
		dialpad: require('webrtc-dialpad'),
		// etc… adding more dependencies here
	}
});
```
## index.js
<a name="index_js"></a>

The only difference from a module's [index.js](CreatingModule.md#index_js) is that it needs to require additionally the [lib/loader.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/loader.js) file.

So on the BroadSoft WebRTC Widget this looks like this

```
module.exports = {view: require('./lib/views/widget'), model: require('./lib/models/widget')};

require('./lib/loader');
```

## Makefile
<a name="Makefile"></a>

In addition to the format described in the [Makefile](CreatingModule.md#Makefile) for a Drop-in Widget also needs a target to bundle the CommonJS modules using browserify.

In the simplest case this target in the Makefile would look like this

```
dist/webrtc-bundle.js: js/templates.js js/styles.js js/images.js js/media.js

./node\_modules/browserify/bin/cmd.js –t brfs index.js \> \$@
```

Most of the time you want also to additionally provide a target for a minimized production version of the Drop-in Widget

```
dist/webrtc-bundle.min.js: dist/webrtc-bundle.js

./node\_modules/uglify-js/bin/uglifyjs \$\< \> \$@
```
