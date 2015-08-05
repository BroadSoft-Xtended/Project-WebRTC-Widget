
all: build

build: dist/webrtc-bundle.min.js

include ./node_modules/webrtc-core/makefile.defs

## Build browserified files #######################################################
TRANSFORMS :=  -t brfs
VERSION := `node -pe "require('./package.json').version"`

dist/webrtc-bundle.min.js: dist/webrtc-bundle.dev.js
	cat <(echo '// webrtc-bundle.min.js '$(VERSION)) <(./node_modules/uglify-js/bin/uglifyjs $<) > $@

dist/webrtc-bundle.dev.js: $(JS_FILES) js/templates.js js/styles.js
	cat <(echo '// webrtc-bundle.dev.js '$(VERSION)) <(./node_modules/browserify/bin/cmd.js $(TRANSFORMS) index.js) > $@