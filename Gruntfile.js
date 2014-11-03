/*global module:false*/

module.exports = function(grunt) {

  var srcFiles = [
    'src/WebRTC.js',
    'src/EventBus.js',
    'src/DateFormat.js',
    'src/Configuration.js',
    'src/Settings.js',
    'src/History.js',
    'src/Transfer.js',
    'src/Constants.js',
    'src/Timer.js',
    'src/FileShare.js',
    'src/Whiteboard.js',
    'src/Stats.js',
    'src/Utils.js',
    'src/Sound.js',
    'src/Video.js',
    'src/SIPStack.js',
    'src/Icon.js',
    'src/Authentication.js',
    'src/XMPP.js',
    'src/SMSProvider.js',
    'src/SMS.js',
    'src/Client.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '\
/***************************************************\n\
* Created on Mon Jan 14 15:32:43 GMT 2013 by:\n\
*\n\
* Copyright 2013 Broadsoft\n\
* http://www.broadsoft.com\n\
***************************************************/\n\n\n',
      footer: '\
\n\n\nwindow.WebRTC = WebRTC;\n\
}(window));\n\n'
    },
    concat: {
      dist: {
        src: srcFiles,
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        options: {
          banner: '<%= meta.banner %>',
          separator: '\n\n\n',
          footer: '<%= meta.footer %>',
          process: true
        },
        nonull: true
      },
      post_dist: {
        src: [
          'dist/<%= pkg.name %>-<%= pkg.version %>.js'
        ],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        nonull: true
      },
      devel: {
        src: srcFiles,
        dest: 'dist/<%= pkg.name %>-devel.js',
        options: {
          banner: '<%= meta.banner %>',
          separator: '\n\n\n',
          footer: '<%= meta.footer %>',
          process: true
        },
        nonull: true
      },
      post_devel: {
        src: [
          'dist/<%= pkg.name %>-devel.js'
        ],
        dest: 'dist/<%= pkg.name %>-devel.js',
        nonull: true
      }
    },
    includereplace: {
      dist: {
        src:'dist/<%= pkg.name %>-<%= pkg.version %>.js',
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      devel: {
        src: 'dist/<%= pkg.name %>-devel.js',
        dest: 'dist/<%= pkg.name %>-devel.js'
      }
    },
    jshint: {
      dist: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
      devel: 'dist/<%= pkg.name %>-devel.js',
      files: ['js/*.js'],
      options: {
        devel: true,
        browser: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        onecase:true,
        unused:"vars",
        supernew: true,
        "globals": {
          "$": true,
          "jQuery": true,
          "RTCPeerConnection": true,
          "ExSIP": true,
          "detect": true,
          "ClientConfig": true,
          "addStats": true,
          "getDataSeriesByLabel": true,
          "chrome": true,
          "require": true,
          "locales": true,
          "converse": true,
          "flensed": true
        },
        exported: {
          "exsip": true,
          "libs" : true,
          "clientConfig": true
        }
      },
      globals: {}
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
          'js/3rdparty.js': ['js/jquery-1.11.0.js', 'js/jquery-cookie-1.3.1.js', 'js/jquery-ui-1.10.3.custom.js',
            'js/stats.js', 'js/detect-2.1.5.js', 'components/otr/build/dep/salsa20.js', 'components/otr/build/dep/bigint.js',
          'components/otr/vendor/cryptojs/core.js', 'components/otr/vendor/cryptojs/enc-base64.js', 'components/crypto-js-evanvosberg/src/md5.js',
          'components/crypto-js-evanvosberg/src/evpkdf.js', 'components/otr/vendor/cryptojs/cipher-core.js',
          'components/otr/vendor/cryptojs/aes.js', 'components/otr/vendor/cryptojs/sha1.js', 'components/otr/vendor/cryptojs/sha256.js',
          'components/otr/vendor/cryptojs/hmac.js', 'components/otr/vendor/cryptojs/pad-nopadding.js', 'components/otr/vendor/cryptojs/mode-ctr.js',
          'components/otr/build/dep/eventemitter.js', 'components/otr/build/otr.js', 'components/strophe/strophe.js',
          'components/strophe.roster/index.js', 'components/strophe.muc/index.js', 'components/strophe.vcard/index.js',
          'components/strophe.disco/index.js', 'components/underscore/underscore.js', 'components/backbone/backbone.js',
          'components/backbone.localStorage/backbone.localStorage.js',
          'components/tinysort/src/jquery.tinysort.js',
          'components/jed/jed.js', 'locale/en/LC_MESSAGES/en.js', 'js/FileSaver.js', 'js/sketch.js', 'js/converse.js', 'js/jquery.xhr.js'],
          'dist/<%= pkg.name %>-bundle-<%= pkg.version %>.min.js': ['js/3rdparty.js', 'js/client-config.js.default', 'js/exsip.js', 
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js']
        }
      },
      options: {
        // beautify: false,
        banner: '<%= meta.banner %>'
      }
    },
    copy: {
      indexDev: {
        options: {
          processContent: function (content, srcpath) {
              var pkg = grunt.config.get('pkg');
              var minLibName = 'exsip.js';
              var devLibName = 'exsip-devel.js';
              grunt.log.writeln('Replacing ' + minLibName +' with '+devLibName);
              return content.replace(minLibName, devLibName);
            }
        },
        src: 'index.html',
        dest: 'index-dev.html'
      },
      webrtc: {
        src: 'dist/<%= pkg.name %>-devel.js',
        dest: 'js/webrtc.js'
      }
    },
    qunit: {
      connectLocal: ['test/run-TestClient.html']
    },
    "qunit-serverless": {
      all: {
        options: {
          pageTemplate: "test/includes/qunit-page.tpl",
          includeFiles: ["custom.css", 'dist/<%= pkg.name %>-bundle-<%= pkg.version %>.min.js', "test/includes/*.js"],
          testFiles: ["test/test-*.js"],
          templateFiles: "index-test.html",
          qunitCss: "stylesheet.css",
          qunitJs: "test/qunit/qunit-1.11.0.js"
        }
      }
    },
    watch: {
      develop: {
        files: ['test/*.js', 'test/includes/*.js', 'src/*.js', 'index.html', 'index-test.html', 'stylesheet.css', 'custom.css', 'js/exsip.js', 'js/client-config.js.default'],
        tasks: ['build','test'],
        options: {
          spawn: true
        }
      }
    },
    notify: {
      qunit: {
        options: {
          title: 'Tests finished',  // optional
          message: 'Tests run successfully' //required
        }
      }
    },
    browserify: {
      all: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.js' : ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
          'dist/<%= pkg.name %>-<%= pkg.version %>-devel.js' : ['dist/<%= pkg.name %>-<%= pkg.version %>-devel.js'],
          'dist/<%= pkg.name %>-devel.js' : ['dist/<%= pkg.name %>-devel.js']
        }
      }
    }
  });


  // Load Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-qunit-serverless");
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-browserify');

  var src = 'dist/'+grunt.config().pkg.name+'-'+grunt.config().pkg.version+'.js';

  function base64(type, str) {
    return 'data:'+type+';base64,' + str.toString('base64');
  }

  function trim(str) {
    return str.replace(/(^\s+|\s+$)/g, '').replace(/(\r\n|\n|\r)/g, '');
  }

  function processCss(str) {
    var files = grunt.file.expand('*.css'),
      css = {},
      name;

    grunt.log.writeln('read css files : '+files);
    files.forEach(function (file) {
      name = file.split(/(.*).css/);
      name = name[1];

      css[name] = trim(grunt.file.read(file));
    });

    return str.replace('\'$CSS$\'', JSON.stringify(css));
  }

  function processFonts(str) {
    var files = grunt.file.expand('fonts/*.*'),
      fonts = {};

    files.forEach(function (file) {
      var fileSplit = file.split(/fonts\/(.*)\.(.*)/);
      var name = fileSplit[1].replace(/-/g,'_')+"_"+fileSplit[2];
      var contents = grunt.file.read(file, { encoding: null });

      if (contents) {
        grunt.log.writeln('reading font : '+name);
        fonts[name] = 'base64,' + contents.toString('base64');
      } else {
        grunt.fail.warn('Looks like ' + file + ' is missing. Check that it exists.');
      }
    });

    return str.replace('\'$FONTS$\'', JSON.stringify(fonts));
  }

  function processMedia(str) {
    var files = grunt.file.expand('media/*.*'),
      media = {};

    files.forEach(function (file) {
      var name = file.split(/media\/(.*)\..*/)[1];
      var contents = grunt.file.read(file, { encoding: null });

      if (contents) {
        grunt.log.writeln('reading media : '+name);
        media[name] = base64('audio/ogg', contents);
      } else {
        grunt.fail.warn('Looks like ' + file + ' is missing. Check that it exists.');
      }
    });

    return str.replace('\'$MEDIA$\'', JSON.stringify(media));
  }

  function processTemplates(str) {
    var files = grunt.file.expand('*.html'),
      templates = {},
      name;

    files.forEach(function (file) {
      name = file.split(/(.*).html/);
      name = name[1];

      grunt.log.writeln('reading template : '+name);
      templates[name] = trim(grunt.file.read(file));
    });

    return str.replace('\'$TEMPLATES$\'', JSON.stringify(templates));
  }

  grunt.registerTask('templates', 'Writes template into the JS', function () {
    var out = grunt.file.read(src);

    out = processTemplates(out);

    grunt.file.write(src, out);
  });

  grunt.registerTask('media', 'Encode media with base64 and write to JS', function () {
    var out = grunt.file.read(src);

    out = processMedia(out);

    grunt.file.write(src, out);
  });

  grunt.registerTask('fonts', 'Encode fonts with base64 and write to JS', function () {
    var out = grunt.file.read(src);

    out = processFonts(out);

    grunt.file.write(src, out);
  });

  grunt.registerTask('css', 'Write css into the JS', function () {
    var out = grunt.file.read(src);

    out = processCss(out);

    grunt.file.write(src, out);
  });

  // Task for building webrtc-devel.js (uncompressed), webrtc-X.Y.Z.js (uncompressed)
  // and webrtc-X.Y.Z.min.js (minified).
  // Both webrtc-devel.js and webrtc-X.Y.Z.js are the same file with different name.
  grunt.registerTask('themify', ['templates', 'css', 'media', 'fonts']);

  grunt.registerTask('compile_devel', ['concat:devel', 'includereplace:devel', 'jshint:devel', 'concat:post_devel']);

  grunt.registerTask('compile_dist', ['concat:dist', 'includereplace:dist', 'jshint:dist', 'concat:post_dist']);

  grunt.registerTask('build', ['compile_devel', 'compile_dist', 'browserify', 'themify', 'uglify:dist', 'copy:indexDev', 'copy:webrtc']);

  // Task for building webrtc-devel.js (uncompressed).
  grunt.registerTask('devel', ['compile_devel']);

  // Test tasks.
  grunt.registerTask('testConnectLocal', ['qunit-serverless']);
  grunt.registerTask('test', ['testConnectLocal', 'notify:qunit']);

  // Travis CI task.
  // Doc: http://manuel.manuelles.nl/blog/2012/06/22/integrate-travis-ci-into-grunt/
  grunt.registerTask('travis', ['devel', 'test']);

  // Default task is an alias for 'build'.
  grunt.registerTask('default', ['build']);

};
