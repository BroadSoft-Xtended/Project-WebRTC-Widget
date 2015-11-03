# Creating a Module

Reusing WebRTC Core to create custom modules will greatly improve configurability and reduce the amount of source code to maintain.

The recommended structure of a module written as a CommonJS module is as following

1.  lib/views/<modulename\>.js : View inheriting from webrtc-core.bdsft.View
2.  lib/models/<modulename\>.js : Model inheriting from webrtc-core.bdsft.Model
3.  index.js : entry point to your module
4.  Makefile : inheriting from webrtc-core/makefile.defs
5.  (optional) templates/<modulename\>.jade : HTML template
6.  (optional) styles/<modulename\>.styl : CSS styles
7.  (optional) js/config.js : Configuration parameters
8.  (optional) images/<filename\>.\* : Images
9.  (optional) media/<filename\>.\* : Media

## lib/views/<modulename\>.js 
<a name="lib_views_modulename"></a>

The view should inherit from **webrtc-core.bdsft.View**.

It takes as arguments the constructor and options to specify templates, styles, images or media.

The name of the constructor should end in \<modulename\>View.

For example the [TimerView](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/views/timer.js) is defined as following

```
module.exports = require('bdsft-sdk-view')(TimerView, {
    template: require('../../js/templates'),
    style: require('../../js/styles')
});

function TimerView() {
    var self = {};
    self.elements = ['text', 'timer'];
    return self;
}
```

In above example the array **self.elements** matches the class names in the template that is defined as following

```
.bdsft-webrtc
    .timer.fadeable.classes
        .text
```

Thus those view elements can be accessed on [TimerView](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/views/timer.js) simply by their name and be wrapped as jQuery elements. In order to set the inner text of the Timer you would do

```
timerView.text.text('01:12:34')
```

If a model exists in the same module with a property defined with the same name it would then automatically update the model too, which would be the case in our Timer module as it defines the property 'text' in [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/models/timer.js).

<a name="specify_constructor_arguments"></a>
You can also specify arguments on the constructor. If using the [webrtc-core.factory](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/factory.js)<a name="factory"></a> to instantiate the widget or module it will automatically be created and injected if the name matches any module or webrtc-core class name. For example if we wanted to use the [webrtc-core.debug](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/debug.js) in order to print some logs for TimerView we can simply specify it as a parameter on the constructor

```
function TimerView(debug){
    debug.log('some logging');
    ...
}
```

## lib/models/<modulename\>.js
<a name="lib_models_modulename"></a>

The model should inherit from **webrtc-core.bdsft.Model**.

It takes as arguments the constructor and options to specify config parameters. For example the [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/models/timer.js) is defined as following

```
module.exports = require('bdsft-sdk-model')(Timer, {
    config: require('../../js/config)
});

function Timer(eventbus, debug, urlconfig, sipstack) {

    var self = {};
    self.props = ['text', 'classes'];

    self.bindings = {
        classes: {
            timer: 'enableCallTimer',
            sipstack: 'callState',
            urlconfig: 'view'
        },
        enableCallTimer: {
            urlconfig: 'enableCallTimer'
        }
    };

    self.init = function(){
        self.updateText();
    };

    self.listeners = function(){
        eventbus.on('started', function(e){)
        ...
    };
    ...
    return self;
}
```

Again the Timer() constructor can take arguments that will automatically be injected using webrtc-core.factory as described [here](#specify_constructor_arguments).

### self.props
<a name="self_props"></a>

The **self.props** array defines properties on any Timer instance that can be accessed through the name of the property. For example in order to set the text on the Timer model instance you would do 

```
timer.text = '03:23:45'
```

If a view exists in the same module with an element defined with the same name it would then automatically update the view too, which would be the case in our Timer module as it defines the element 'text' in [TimerView](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/views/timer.js).

### self.bindings
<a name="databindings"></a>

The **self.bindings** describes the data bindings for the Model. In our Timer example it defines two bindings, one for the property classes and one for enableCallTimer.

The enableCallTimer property (which is defined in the configuration parameters [js/config.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/js/config.js) will be updated with the value of the [urlconfig.enableCallTimer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/urlconfig.js) property. 

This means that if the URL parameter 'enableCallTimer=true/false' is present, it will update the Timer's enableCallTimer property accordingly. 

If you want to handle the update of the property yourself, you can specify a function in the Model class with the name of

```
self.updateEnableCallTimer = function(value) {
    // do my updates of the property here
}
```

#### self.bindings.classes
<a name="databindings_classes"></a>
In our example we also defined a binding for **classes**. 

```
self.bindings = {
    classes: {
        timer: 'enableCallTimer',
        sipstack: 'callState',
        urlconfig: 'view'
    }
}
```

This implements a specific data binder that will use any of the values of the binding sources to set it as an array on the classes property and to update the View in the module with those classes looking for the element with the class name of 'classes'.

This has the benefits that we are able to define state through CSS which allows for easy overwriting behavior through CSS, keeping view related handling in CSS and is easy testable through manipulating the CSS class names of the module.

Depending on the type of the value of the binding sources it will either just use the value itself as a class name if it is of type string, or the name of the property itself if it is a boolean and of value true. In above [Timer](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/lib/models/timer.js) example the classes binding sources are the following

```
timer: 'enableCallTimer', // of type boolean as we have described above
sipstack: 'callState', // a string describing the current callState
urlconfig: 'view' // a string describing the view configuration
```

Assuming that timer.enableCallTimer is true, that sipstack.callState is 'started' and that urlconfig.view is 'audioOnly' the Timer.classes array would be updated to

```
['enableCallTimer', 'started', 'audioOnly']
```

And would end up as a class string on the [TimerView.classes](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/templates/timer.jade) as

```
'enableCallTimer started audioOnly'
```

The [styles/timer.styl](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/styles/timer.styl) is then defining CSS rules to use those class names like this

```
.timer.audioOnly
    position relative
    margin-right 10px

.timer.enableCallTimer.started
    {fadeIn}

.timer:not(.started)
    {fadeOut}
```

Both Model and View can also define two methods that will be called after the class has been instantiated, namely **self.listeners** and **self.init**.

### self.listeners

<a name="self_listeners"></a>
**self.listeners** is useful for registering listeners on [eventbus](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/eventbus.js) or [databinders](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/lib/databinder.js). 

Databinders from other modules can be easily injected into the self.listeners function by adding the name of the databinder as an argument to the function and adding the module to the constructor. 

So if we wanted to add a listener to the databinder of the sipstack, we would add the self.listeners as following

```
function MyModule(sipstack) {

// ...    

self.listeners = function(sipstackDatabinder) {
    sipstackDatabinder.onModelPropChange('callState', function(value){
        // do something with the callState update
    });
};
```

If specifying an argument with the name of databinder it will refer to the databinder of the class the self.listeners has been specified for.

### self.init

<a name="self_init"></a>
**self.init** is being called last before returning the instantiated Model or View object and can be used to trigger some initialization of properties or state. 

For the Timer Model it will update its text in order to be initialized as 00:00:00.

```
self.init = function() {
    self.updateText();
}
```

## index.js
<a name="index_js"></a>

The index.js is the entry point to the module or widget.

It should reference the view and model classes defined within the module or widget as following (as for [timer/index.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/index.js))

```
module.exports = {view: require('./lib/views/timer'), model: require('./lib/models/timer')};
```

In case that a module only contains a View or a Model it would only define either the view or model property in that object, so for example if Timer only had a view it would be

```
module.exports = {view: require('./lib/views/timer')};
```

Or if Timer only had a Model it would be

```
module.exports = {model: require('./lib/models/timer')};
```

## Makefile
<a name="Makefile"></a>

The Makefile should include the [makefile.defs](https://github.com/BroadSoft-Xtended/Library-WebRTC-Core/blob/master/makefile.defs) from the webrtc-core.

Depending on the aspects to build it should also define an all target for the make build.

The Timer module has the following [Makefile](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/Makefile)

```
all: js/templates.js js/styles.js

include ./node_modules/bdsft-sdk-view/makefile.defs
```

The Makefile will (re)build the HTML template and CSS styles when calling make inside the Timer module.

The webrtc-core.makefile.defs<a name="webrtc_core_makefile"></a> defines the following targets

1.  [js/templates.js](#templates_modulename_jade) : rebuilds all templates/\*.jade files and outputs the HTML templates into js/templates.js
2.  [js/styles.js](#styles_modulename_styl) : rebuilds all styles/\*.styl files and outputs the minimized CSS into js/styles.js
3.  [js/media.js](#media_filename) : encodes all media/\*.\* files and outputs the object with the filenames as keys and the base64 strings as value to js/media.js
4.  [js/images.js](#images_filename) : encodes all images/\*.\* files and outputs the object with the filenames as keys and the base64 strings as value to js/images.js

## templates/<modulename\>.jade
<a name="templates_modulename_jade"></a>

If the module has a View it will also need a HTML template. As seen [above](#lib_views_modulename) the template is being passed to the View in the options parameter of the webrtc-core.bdsft.View constructor.

For ease of use and maintainability it is recommended to create the HTML template as jade file in the templates/ directory.

Using the js/templates.js target from the [webrtc-core.makefile.defs](#webrtc_core_makefile) the templates/<modulename\>.jade is converted to js/templates.js which is then referenced in the View constructor.

## styles/<modulename\>.styl
<a name="styles_modulename_styl"></a>

If the module has a View it will most likely need CSS styles. As seen [above](#lib_views_modulename) the styles are being passed to the View in the options parameter of the webrtc-core.bdsft.View constructor.

For ease of use and maintainability it is recommended to create the CSS styles as stylus file in the styles/ directory.

Using the js/styles.js target from the [webrtc-core.makefile.defs](#webrtc_core_makefile) the styles/<modulename\>.styl is converted to a minimized js/styles.js which is then referenced in the View constructor.

The minimized CSS styles from js/styles.js will then be injected into the \<head\> of the HTML host page once the module is being used and provided the module's View inherited from webrtc-core.bdsft.View.

If you want to [make styles configurable](./Configuration.md#configuration_css_attributes) through data attributes on the \<script\> tag of the WebRTC Widget you can do so by first specifying the styles values inside a constants file like this

```
module.exports = {
    STYLES: {
        settingsTabActiveColor: '\#04aff0'
    }
}
```

Then specify this file in the options of the view 

```
module.exports = require('bdsft-sdk-view')(SettingsView, {
    template: require('../../js/templates'),
    style: require('../../js/styles'),
    constants: require('../constants')
});
```

In the styl file you then reference the defined constant through the \<%= %\> syntax

```
@css {
    .bdsft-webrtc .settingsPopup .tabs a.active {
        background: <%= settingsTabActiveColor %>
    }
}
```

You can then overwrite that default value through the data attributes of the \<script\> tag as shown [here](Configuration.md#configuration_css_attributes), in our example like this

```
<script src="dist/webrtc-bundle.dev.js" type="text/javascript" data-settings-tab-active-color ="green">
</script>
```

## images/<filename\>.*
<a name="images_filename"></a>

If the module has a View it might be using background images in CSS. To bundle them within the module they should be converted to base64 strings and inserted into the CSS as background images with a data URI.

To convert the images to base64 encoded strings the images have to reside in /images directory. Then using the js/images.js target from the [webrtc-core.makefile.defs](#webrtc_core_makefile) the images/<filename\>.\* are converted to base64 encoded strings and put into an object in js/images.js which is then referenced in the View constructor.

As described [here](Configuration.md#image_background_url) too the CSS styles for the modules need a background-url style that references the filename of the image in the format \<%= filename %\>. Eg in the video module the images/videobg.svg file is then references in the CSS style of the video module as

```
.bdsft-webrtc .video {
    background: url('data:image/svg+xml;base64,<%= videobg %>')
    no-repeat left center;
}
```

## media/<filename\>.*
<a name="media_filename"></a>

If the module has a Model it might be using media files to play audio or video for example. To bundle them within the module they should be converted to base64 strings.

To convert the media to base64 encoded strings the media files have to reside in /media directory. Then using the js/media.js target from the [webrtc-core.makefile.defs](#webrtc_core_makefile) the media/<filename\>.\* are converted to base64 encoded strings and put into an object in js/media.js which can then be referenced in the Model constructor.

The media base64 encoded strings are then accessible from with the Model through the property self.medias. For example the [webrtc-core.Sound](https://github.com/BroadSoft-Xtended/Library-WebRTC-Sound/blob/master/lib/sound.js) class references audio media to play back ringing and dtmf tones.

After creating the Model with

```
module.exports = require('./bdsft').Model(Sound, {
    media: require('../js/media'),
    config: require('../js/config')
});
```

When playing the tones it can then reference through

```
self.playTone = function(audioSource, media, options) {
    //...
    audioSource.attr('src', 'data:audio/ogg;base64,'+self.medias[media]);
    //...
}
```

Where the media parameter contains the name of the audio file to play.


## js/config.js
<a name="js_config_js"></a>

If the module is using a Model it might need to use configuration parameters to specify overwritable properties with default values.

Those can be specified in js/config.js as a simple object with key and values. For example the [js/config.js](https://github.com/BroadSoft-Xtended/Library-WebRTC-Timer/blob/master/js/config.js) of the Timer module only defines one configuration parameter.

```
module.exports = {
    enableCallTimer: true;
}
```

After instantiating the Model the configuration parameters will be avaible as

```
self.<name>
```

on the Model instance. So in above example the instanciated Timer will contain

```
timer.enableCallTimer
```

with value of true. (unless configured to be overwritten as detailed [here](Configuration.md))
