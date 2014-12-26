var gulp = require('gulp'),
    karma = require('karma').server,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    sourceFiles = [
      'src/someMoreAngularComponents/someMoreAngularComponents.prefix',
      'src/someMoreAngularComponents/someMoreAngularComponents.js',
      'src/someMoreAngularComponents/directives/**/*.js',
      'src/someMoreAngularComponents/filters/**/*.js',
      'src/someMoreAngularComponents/services/**/*.js',
      'src/someMoreAngularComponents/someMoreAngularComponents.suffix'
    ];

gulp.task('lint', function() {
    return gulp.src(['src/**/*.js','test/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter("fail"));
});

gulp.task('build', ['lint', 'test-src'], function() {
  gulp.src(sourceFiles)
    .pipe(concat('some-more-angular-components.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('some-more-angular-components.min.js'))
    .pipe(gulp.dest('./dist'))
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', ['build']);