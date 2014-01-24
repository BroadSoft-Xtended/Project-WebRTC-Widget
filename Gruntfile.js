/*global module:false*/

module.exports = function(grunt) {

  var srcFiles = [
    'src/WebRTC.js',
    'src/EventBus.js',
    'src/Configuration.js',
    'src/Settings.js',
    'src/History.js',
    'src/Transfer.js',
    'src/Constants.js',
    'src/Timer.js',
    'src/Stats.js',
    'src/Utils.js',
    'src/Sound.js',
    'src/Video.js',
    'src/SIPStack.js',
    'src/Icon.js',
    'src/Authentication.js',
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
        files: {
          'dist': 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
        }
      },
      devel: {
        files: {
          'dist': 'dist/<%= pkg.name %>-devel.js'
        }
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
          "addStats": true
        }
      },
      globals: {}
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
          'js/3rdparty.js': ['js/jquery-1.11.0.js', 'js/jquery-cookie-1.3.1.js', 'js/jquery-ui-1.10.3.custom.js',
            'js/stats.js', 'js/detect-2.1.5.js']
        }
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },
    copy: {
      clientConfig: {
        options: {
          processContent: function (content, srcpath) {
            if(grunt.file.exists('js/client-config.js')) {
              return false;
            }
            return grunt.template.process(content);
          }
        },
        src: 'js/client-config.js.example',
        dest: 'js/client-config.js'
      },
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
          includeFiles: ["js/3rdparty.js", "js/exsip-*.js", "js/client-config.js", "dist/webrtc-devel.js", "test/includes/*.js"],
          testFiles: ["test/test-*.js"],
          templateFiles: "index.html",
          qunitCss: "stylesheet.css",
          qunitJs: "test/qunit/qunit-1.11.0.js"
        }
      }
    },
    watch: {
      develop: {
        files: ['test/*.js', 'test/includes/*.js', 'src/*.js', 'index.html', 'stylesheet.css', 'js/exsip.js'],
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

  // Task for building webrtc-devel.js (uncompressed), webrtc-X.Y.Z.js (uncompressed)
  // and webrtc-X.Y.Z.min.js (minified).
  // Both webrtc-devel.js and webrtc-X.Y.Z.js are the same file with different name.
  grunt.registerTask('build', ['concat:devel', 'includereplace:devel', 'jshint:devel', 'concat:post_devel', 'concat:dist', 'includereplace:dist', 'jshint:dist', 'concat:post_dist', 'uglify:dist', 'copy:clientConfig', 'copy:indexDev', 'copy:webrtc']);

  // Task for building webrtc-devel.js (uncompressed).
  grunt.registerTask('devel', ['concat:devel', 'includereplace:devel', 'jshint:devel', 'concat:post_devel']);

  // Test tasks.
  grunt.registerTask('testConnectLocal', ['qunit-serverless']);
  grunt.registerTask('test', ['testConnectLocal', 'notify:qunit']);

  // Travis CI task.
  // Doc: http://manuel.manuelles.nl/blog/2012/06/22/integrate-travis-ci-into-grunt/
  grunt.registerTask('travis', ['devel', 'test']);

  // Default task is an alias for 'build'.
  grunt.registerTask('default', ['build']);

};
