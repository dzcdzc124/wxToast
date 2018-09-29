var gulp = require('gulp');

var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var prettify = require('gulp-jsbeautifier');

gulp.task('watch',  function(){
    gulp.watch('src/**/*.js', ['useref']);
    gulp.watch('src/**/*.css', ['useref']);
})

gulp.task('useref', function(){
    return gulp.src('src/*.html')
            .pipe(useref())
            .pipe(gulpIf('*.js', uglify()))
            .on('error', function (err) {
                console.log(err.toString());
            })
            .pipe(gulpIf('*.css', cleanCSS()))
            .pipe(gulp.dest('dist'));
})

gulp.task('prettify', function() {
    gulp.src(['./src/**/*.css', './src/*.html', './src/**/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['prettify', 'useref'])