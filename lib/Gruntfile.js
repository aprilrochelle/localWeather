module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        src: ['../js/main.js',],
        dest: '../dist/app.js',
      },
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json',
      },
      src: ['../js/**/*.js',],
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['../js/**/*.js',],
        tasks: ['eslint', 'browserify',],
      },
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('gruntify-eslint');

  grunt.registerTask('default', ['eslint', 'browserify', 'watch',]);
};
