var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

var config = {
    npmDir: './node_modules',
    cssDir: './css',
    jsDir: './js',
    srcDir: './resources',
    fontDir: './fonts'
};

gulp.task('css', function(){
    return gulp.src(config.srcDir + '/sass/main.scss')
        .pipe(sass({
            includePaths: [
                config.npmDir + '/bootstrap-sass/assets/stylesheets',
                config.npmDir + '/breakpoint-sass/stylesheets'
            ]
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('js', function(){
    browserify(config.srcDir + '/js/main.js')
        .transform(babelify)
        .bundle()
        .pipe(source('all.js'))
        .pipe(gulp.dest('./js/scripts'))
        .pipe(connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('fonts', function() {
    return gulp.src(config.srcDir + '/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest(config.fontDir));
});

// gulp connect task
gulp.task('connect', function () {
    connect.server({
        base: 'http://localhost',
        port: 8889,
        root: config.jsDir,
        livereload: true
    });
});

// Watch for changes for matching file extensions in given directories
gulp.task('watch', function(){
    gulp.watch('resources/**/*.js', ['js']);
    gulp.watch('resources/**/*.scss', ['css']);
    gulp.watch('css/**/*.scss', ['scss']);
});

// Just run gulp to run all these tasks
gulp.task('default', ['js', 'css', 'fonts', 'connect', 'watch'], function(){

});