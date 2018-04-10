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
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['eslint']);
});

// Install production dependencies
function installNpmDependencies(done) {
  return gulp.src('package.json')
    .pipe(shell('npm install --production', {
      cwd: targetDirectory,
    }));
}

var installDependencies = gulp.series(installNpmDependencies);

// Task definition
gulp.task('build', gulp.series(/*clean, codeValidation, gulp.parallel(codeCompilation, codeDocumentation)*/));
gulp.task('install', gulp.series('build', installDependencies));
gulp.task('default', gulp.series('build'));