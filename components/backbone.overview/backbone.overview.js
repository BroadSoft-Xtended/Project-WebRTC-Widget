/*!
 * Backbone.Overview 
 *
 * Copyright (c) 2014, JC Brand <jc@opkode.com>
 * Licensed under the Mozilla Public License (MPL) 
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["underscore", "backbone"],
            function(_, Backbone) {
                return factory(_ || root._, Backbone || root.Backbone);
            }
        );
   } else {
      // RequireJS isn't being used.
      // Assume underscore and backbone are loaded in <script> tags
      factory(_, Backbone);
   }
}(this, function (_, Backbone) {
    "use strict";
    var Overview = Backbone.Overview = function (options) {
        /* An Overview is a View that contains and keeps track of sub-views.
         * Kind of like what a Collection is to a Model.
         */
        var views = {};
        this.keys = function () { return _.keys(views) };
        this.getAll = function () { return views; };
        this.get = function (id) { return views[id]; };
        this.add = function (id, view) { views[id] = view; };
        this.remove = function (id) {
            var view = views[id];
            if (view) {
                delete views[id];
                view.remove();
                return view;
            }
        };
        Backbone.View.apply(this, Array.prototype.slice.apply(arguments));
    };
    _.extend(Overview.prototype, Backbone.View.prototype);
    Overview.extend = Backbone.View.extend;
    return Backbone.Overview;
}));
