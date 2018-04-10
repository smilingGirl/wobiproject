var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');

gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['dist/']
  })
  .on('restart', function() {
    console.log('>> node restart');
  })
});

// configure a eslint task
gulp.task('eslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.reporter('eslint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['eslint']);
});