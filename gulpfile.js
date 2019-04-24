var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pug = require('gulp-pug')

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    browserSync.watch ('./dist', browserSync.reload)
});

gulp.task('js', function() {
    return gulp.src([
            'src/js/**/*.js'
        ])
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('pug', function buildHTML() {
    return gulp.src('src/pug/pages/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function(){
    return gulp.src('./src/styles/main.sass')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function(){
    gulp.watch('./src/styles/**/*.sass', gulp.series('sass'));
    gulp.watch('./src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
    gulp.parallel('pug'),
    gulp.parallel('sass'),
    gulp.parallel('js'),
    gulp.parallel('serve', 'watch')
));
