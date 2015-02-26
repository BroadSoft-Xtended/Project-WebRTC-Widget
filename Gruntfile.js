/*global module:false*/

module.exports = function(grunt) {

  var reporter;
  if(grunt.option('reporter') && grunt.option('reporter') !== 'undefined') {
    reporter = require('./test/includes/'+grunt.option('reporter')+'_reporter')
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '\
/***************************************************\n\
* Created on Mon Jan 14 15:32:43 GMT 2013 by:\n\
*\n\
* Copyright 2014 Broadsoft\n\
* http://www.broadsoft.com\n\
***************************************************/\n\n\n'
    },
    jshint: {
      options: {
        // DOC: http://www.jshint.com/docs/options/
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: 'nofunc',  // Allow functions to be used before defined (it is valid).
        newcap: true,
        noarg: true,
        noempty: true,
        nonbsp:  true,
        // nonew: true,  // TODO: Enable when fixed.
        plusplus: false,
        undef: true,
        unused: true,
        boss: false,
        eqnull: false,
        funcscope: false,
        sub: false,
        supernew: false,
        browser: true,
        devel: true,
        node: true,
        nonstandard: true,  // Allow 'unescape()' and 'escape()'.
        "globals": {
          "$": true,
          "jQuery": true,
          "RTCPeerConnection": true,
          "ExSIP": true,
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
      globals: {},
      // Lint JS files separately.
      each_file: {
        src: [ 'src/**/*.js' ]
      }      
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
          'js/3rdparty.js': ['js/stats.js', 'js/FileSaver.js'],
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
          reporter: reporter,
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
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.js': [ 'src/WebRTC.js' ]
        },
        options: {
          browserifyOptions: {
            standalone: 'WebRTC',
            externalRequireName: 'KKKK'
          }
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

  grunt.registerTask('build', ['jshint:each_file', 'browserify', 'themify', 'uglify:dist', 'copy:indexDev', 'copy:webrtc']);

  // Test tasks.
  grunt.registerTask('testConnectLocal', ['qunit-serverless']);
  grunt.registerTask('test', ['testConnectLocal', 'notify:qunit']);

  // Default task is an alias for 'build'.
  grunt.registerTask('default', ['build']);

};
