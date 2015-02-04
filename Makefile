SHELL := /bin/bash
PATH := node_modules/.bin:$(PATH)

JS_FILES := $(shell glob-cli "src/**/*.js")
JADE_FILES := $(shell glob-cli "templates/**/*.jade")
STYLUS_FILES := $(shell glob-cli "styles/**/*.styl")


all: build

build: dist/webrtc-bundle.js



## Build browserified files #######################################################
TRANSFORMS := -t brfs

dist/webrtc-bundle.js: dist/webrtc.js
	uglifyjs js/3rdparty.js $< > $@

dist/webrtc.js: dist/webrtc.dev.js
	uglifyjs $< > $@

dist/webrtc.dev.js: $(JS_FILES) js/templates.js styles/bundle.min.css
	browserify $(TRANSFORMS) src/WebRTC.js > $@

## Compile styles ##################################################################

styles/bundle.min.css: styles/main.css
	cssmin styles/main.css > styles/bundle.min.css

### For extra css scoping, add !important to some attributes affected by inheritance (font-size)
# styles/bundle.css: styles/main.css
# 	scripts/importantize-css styles/main.css styles/bundle.css

styles/main.css: $(STYLUS_FILES)
	stylus --include-css -u stylus-font-face styles/main.styl -o styles

## Compile jade templates #########################################################
js/templates.js: $(JADE_FILES)
	templatizer -d templates -o js/templates.js