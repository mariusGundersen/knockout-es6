var gulp = require('gulp');
var to5 = require('gulp-6to5');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');

gulp.task('default', function(){
    gulp.src('src/*')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('out'));
});

gulp.task('watch', ['default'], function(){
    gulp.watch('src/*', ['default']);
});