module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        src: ['js/app.js'],
        dest: 'js/bundle.js',
        options: {
            transform: ['reactify'],
            watch: true
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ['js/*', '*.html']
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
      },
      watch: {
        js: {
            files: ['js/*', '!js/bundle.js'],
            tasks: ['browserify']
        }
      }
  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserify', 'browserSync', 'watch']);

};