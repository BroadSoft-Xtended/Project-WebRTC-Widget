Backbone.Overview
=================

An Overview is a View that references and keeps track of sub-views (i.e. just normal Backbone.Views)
Kind of like what a Collection is to a Model.

An Overview provides methods for handling the views it keeps track of:

  * add(id, view)
  * get(id)
  * getAll()
  * remove(id)

## Usage

Include Backbone.Overview after having included Backbone.js:

```html
    <script type="text/javascript" src="backbone.js"></script>
    <script type="text/javascript" src="backbone.overview.js"></script>
```

Create your overview like this:

```javascript
    this.RosterView = Backbone.Overview.extend({
    // ... same customizations as you would make for a normal Backbone.View
    });
```

### RequireJS

Include [RequireJS](http://requirejs.org):

```html
    <script type="text/javascript" src="lib/require.js"></script>
```

RequireJS config: 
```javascript
    require.config({
        paths: {
            jquery: "lib/jquery",
            underscore: "lib/underscore",
            backbone: "lib/backbone",
            backbone.overview: "lib/backbone.overview"
        }
    });
```

```javascript
    define(["backbone.overview"], function() {
        this.RosterView = Backbone.Overview.extend({
        // ... same customizations as you would make for a normal Backbone.View
        });
    });
```
## Real-world example 

Overviews are used in [converse.js](http://conversejs.org)
