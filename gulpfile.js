var gulp = require('gulp');
var del = require('del');
var log = require('fancy-log');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var exec = require('child_process').exec;

//Start nodemon for development
gulp.task('nodemon', function() {
  nodemon({
    script: './src/server.js',
    ext: 'js',
    ignore: ['dist/'],
  })
  .on('restart', function() {
    log.warn('>> node restart');
  })
});

// Cleanup
gulp.task(('clean'),function() {
  return del(['build']);
});

// configure a eslint task to validate all src files
gulp.task('eslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// configure to watch all src js files
// on change the eslint task is called
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['eslint']);
});

// Install production dependencies
gulp.task(('installNpmDependencies'), function(cb) {
  exec('npm install', function (err, stdout, stderr) {
    log(stdout);
    log.error(stderr);
    cb(err);
  });
});

// Task definition
gulp.task('build', ['eslint', 'clean']);
gulp.task('install',['installNpmDependencies', 'build']);
gulp.task('default', ['build']);