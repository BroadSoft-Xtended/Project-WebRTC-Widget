/*global module:false*/

module.exports = function(grunt) {

  var srcFiles = [
    'src/WebRTC.js',
    'src/Configuration.js',
    'src/History.js',
    'src/Timer.js',
    'src/Stats.js',
    'src/Utils.js',
    'src/Sound.js',
    'src/Video.js',
    'src/Client.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '\
/*\n\
 * webrtc version <%= pkg.version %>\n\
 * Copyright (c) 2012-<%= grunt.template.today("yyyy") %> Dominik Steiner - BroadSoft <http://www.broadsoft.com>\n\
 * Homepage: http://webrtc.net\n\
 * License: http://webrtc.net/license\n\
 */\n\n\n',
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
          "ClientConfig": true
        }
      },
      globals: {}
    },
    uglify: {
      dist: {
        files: {
          'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
        }
      },
      options: {
        banner: '<%= meta.banner %>'
      }
    },
    qunit: {
      connectLocal: ['test/run-TestConnectLocal.html']
    }
  });


  // Load Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');



  // Task for building webrtc-devel.js (uncompressed), webrtc-X.Y.Z.js (uncompressed)
  // and webrtc-X.Y.Z.min.js (minified).
  // Both webrtc-devel.js and webrtc-X.Y.Z.js are the same file with different name.
  grunt.registerTask('build', ['concat:devel', 'includereplace:devel', 'jshint:devel', 'concat:post_devel', 'concat:dist', 'includereplace:dist', 'jshint:dist', 'concat:post_dist', 'uglify:dist']);

  // Task for building webrtc-devel.js (uncompressed).
  grunt.registerTask('devel', ['concat:devel', 'includereplace:devel', 'jshint:devel', 'concat:post_devel']);

  // Test tasks.
  grunt.registerTask('testConnectLocal', ['qunit:connectLocal']);
  grunt.registerTask('test', ['testConnectLocal']);

  // Travis CI task.
  // Doc: http://manuel.manuelles.nl/blog/2012/06/22/integrate-travis-ci-into-grunt/
  grunt.registerTask('travis', ['devel', 'test']);

  // Default task is an alias for 'build'.
  grunt.registerTask('default', ['build']);

};
