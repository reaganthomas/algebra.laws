(function() {
  'use strict';

  var gulp = require('gulp');
  var mocha = require('gulp-mocha');
  var del = require('del');

  // gulp.task('clean', function(cb) {
  //   del(['dist/**/*','lib/**/*'], cb);
  // });

  gulp.task('test', function() {
    return gulp.src('test/index.js', { read: false })
      .pipe(mocha());
  });

  // gulp.task('package', [], function() {
  //
  // });
})();
