var gulp = require('gulp'), 
connect = require('gulp-connect'),
mustache = require('gulp-mustache'),
jshint = require('gulp-jshint'),
pkg = require('./package.json');

// -------------------------

gulp.task('webserver', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('html', function(){
  return gulp.src('src/html/index.html')
  .pipe(mustache({
    title: 'pkg.meta.title',
    description: 'pkg.meta.description'
  }))
  .pipe(gulp.dest('build/'))
  .pipe(connect.reload());
});

gulp.task('css', function(){
  return gulp.src('src/styles.css')
  .pipe(gulp.dest('build/'));
});

gulp.task('js', function(){
  return gulp.src('src/app.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(gulp.dest('build/'));
});

gulp.task('copy', function(){
  return gulp.src('src/img/*')
  .pipe(gulp.dest('build/img/'));
});
 
gulp.task('watch', function() {
    gulp.watch('src/styles.css', ['css']);
    gulp.watch('src/html/**/*', ['html']);
    gulp.watch('src/app.js', ['js']);
    gulp.watch('src/img/*', ['copy']);
})

// ---------------------

gulp.task('serve', ['css', 'html', 'js', 'copy', 'webserver', 'watch']);
gulp.task('default', ['css','html','js', 'copy']);




 
