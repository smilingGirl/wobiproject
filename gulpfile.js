var gulp = require('gulp');
var del = require('del');
var log = require('fancy-log');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');
var exec = require('child_process').exec;

// Task to start nodemon as a development tool
gulp.task('nodemon', function() {
  nodemon({
    script: 'src/server.js',
    ext: 'js',
    ignore: ['dist/'],
  })
  .on('restart', function() {
    log.info('>> node restart');
  })
});

// Cleanup
function clean() {
  return del(['build']);
}

// configure a eslint task to validate all src files
gulp.task('eslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// configure to watch all src js files to be checked with the eslint task
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['eslint']);
});

// Install production dependencies
gulp.task(('installNpmDependencies'), function(cb) {
  exec('npm install --production', function (err, stdout, stderr) {
    log(stdout);
    log.error(stderr);
    cb(err);
  });
});

//var installDependencies = gulp.series(installNpmDependencies);

// Task definition
gulp.task('build', null, clean/* codeValidation, gulp.parallel(codeCompilation, codeDocumentation)*/);
gulp.task('install',['installNpmDependencies', 'build']);
gulp.task('default', ['build']);