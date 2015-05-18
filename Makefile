
all: build

build: dist/webrtc-bundle.min.js

include ./node_modules/webrtc-core/makefile.defs

## Build browserified files #######################################################
TRANSFORMS :=  -t brfs

dist/webrtc-bundle.min.js: dist/webrtc-bundle.dev.js
	./node_modules/uglify-js/bin/uglifyjs $< > $@

dist/webrtc-bundle.dev.js: $(JS_FILES) js/templates.js js/styles.js
	./node_modules/browserify/bin/cmd.js $(TRANSFORMS) index.js > $@