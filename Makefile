SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

JS_FILES := $(shell glob-cli "lib/**/*.js")
JADE_FILES := $(shell glob-cli "templates/**/*.jade")
STYLUS_FILES := $(shell glob-cli "styles/**/*.styl")

all: symlinks build

build: ulimit dist/webrtc-bundle.min.js

symlinks: node_modules/bdsft-webrtc-styles node_modules/bdsft-webrtc-templates node_modules/views node_modules/models



## Build browserified files #######################################################
TRANSFORMS :=  -t brfs

dist/webrtc-bundle.min.js: dist/webrtc-bundle.dev.js
	uglifyjs $< > $@

dist/webrtc-bundle.dev.js: $(JS_FILES) node_modules/bdsft-webrtc-templates node_modules/bdsft-webrtc-styles
	browserify $(TRANSFORMS) lib/webrtc.js > $@

ulimit: 
	ulimit -n 2560

## Create symlinks ##################################################################
node_modules/views: lib/views
	ln -sf ../lib/views node_modules/views

node_modules/models: lib/models
	ln -sf ../lib/models node_modules/models

## Compile styles ##################################################################
styles/client.css: $(STYLUS_FILES)
	stylus --include-css -u stylus-font-face --with {limit:20000} styles/client.styl -o styles

styles/client.min.css: styles/client.css
	cssmin styles/client.css > styles/client.min.css

node_modules/bdsft-webrtc-styles: styles/client.min.css
	node_modules/webrtc-core/scripts/export-style styles/client.min.css node_modules/bdsft-webrtc-styles

## Compile jade templates #########################################################
node_modules/bdsft-webrtc-templates: $(JADE_FILES)
	templatizer -d templates -o node_modules/bdsft-webrtc-templates