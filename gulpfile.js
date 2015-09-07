(function() {
  'use strict';

  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var bump = require('gulp-bump');

  gulp.task('test', function() {
    return gulp.src('test/index.js', { read: false })
      .pipe(mocha());
  });

  gulp.task('bump', function() {
    gulp.src('./package.json')
      .pipe(bump())
      .pipe(gulp.dest('./'));
  });
})();
