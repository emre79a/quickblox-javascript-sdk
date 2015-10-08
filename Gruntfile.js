module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      options: {
        banner: '/* <%= pkg.description %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        ignore: ['request'],
        browserifyOptions: {
          standalone: 'QB'
        }
      },
      all: {
        files: {
          'quickblox.js': ['js/qbMain.js'],
        }
      }
    },

    uglify: {
      options: {
        banner: '/* <%= pkg.description %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      all: {
        files: {
          'quickblox.min.js': ['quickblox.js']
        }
      }
    },

    watch: {
      files: ['js/*.js', 'js/modules/*.js', 'js/modules/webrtc/*.js'],
      tasks: ['browserify'],
      options: {
        spawn: false,
        debounceDelay: 250,
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          // protocol: 'https',
          hostname: 'localhost',
          port: 8080,
          open: true,
          keepalive: true
        }
      }
    },

    parallel: {
      assets: {
        options: {
          grunt: true
        },
        tasks: ['watch', 'connect']
      }
    }

  });

  grunt.registerTask('default', [
    'browserify',
    'uglify'
  ]);

  grunt.registerTask('server', [
    'connect'
  ]);

  grunt.registerTask('server_and_watch', ['parallel']);

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');
};
