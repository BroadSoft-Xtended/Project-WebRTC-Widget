SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

MEDIA_FILES := $(shell glob-cli "media/**/*")
JS_FILES := $(shell glob-cli "src/**/*.js")
JADE_FILES := $(shell glob-cli "templates/**/*.jade")
STYLUS_FILES := $(shell glob-cli "styles/**/*.styl")


all: symlinks build

build: dist/webrtc-bundle.min.js

symlinks: node_modules/bdsft-webrtc-style node_modules/bdsft-webrtc-config node_modules/bdsft-webrtc-media node_modules/bdsft-webrtc-templates node_modules/views node_modules/models



## Build browserified files #######################################################
TRANSFORMS :=  -t brfs -t require-globify

dist/webrtc-bundle.min.js: dist/webrtc-bundle.dev.js
	uglifyjs $< > $@

dist/webrtc-bundle.dev.js: $(JS_FILES) js/templates.js js/media.js js/style.js
	browserify $(TRANSFORMS) src/webrtc.js > $@

## Create symlinks ##################################################################
node_modules/bdsft-webrtc-style: js/style.js
	ln -sf ../js/style.js node_modules/bdsft-webrtc-style

node_modules/bdsft-webrtc-config: js/client-config.js.default
	ln -sf ../js/client-config.js.default node_modules/bdsft-webrtc-config

node_modules/bdsft-webrtc-media: js/media.js
	ln -sf ../js/media.js node_modules/bdsft-webrtc-media

node_modules/bdsft-webrtc-templates: js/templates.js
	ln -sf ../js/templates.js node_modules/bdsft-webrtc-templates

node_modules/views: $(JS_FILES)
	ln -sf ../src/views node_modules/views

node_modules/models: $(JS_FILES)
	ln -sf ../src/models node_modules/models

## Compile styles ##################################################################

styles/bundle.min.css: styles/main.css
	cssmin styles/main.css > styles/bundle.min.css

js/media.js: $(MEDIA_FILES)
	scripts/encode-media media js/media.js

js/style.js: styles/bundle.min.css
	scripts/export-style styles/bundle.min.css js/style.js

styles/main.css: $(STYLUS_FILES)
	stylus --include-css -u stylus-font-face --with {limit:20000} styles/main.styl -o styles

## Compile jade templates #########################################################
js/templates.js: $(JADE_FILES)
	templatizer -d templates -o js/templates.js