var gulp = require('gulp');
var watch = require('gulp-watch');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var nib = require('nib');

//stylus watch
gulp.task('watch', function () {
    return gulp.src(['css/*.styl'])
        .pipe(watch(['css/*.styl']))
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest('css'))
        .pipe(notify({
            message: '<%= file.relative %> stylus successful',
            title: 'css'
        }));
});

//build
gulp.task('build', function(){
    gulp.src(['css/*.styl'])
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('css'))
        .pipe(notify({
            message: '<%= file.relative %> stylus successful with compress',
            title: 'css'
        }));
});

gulp.task('default', ['watch']);