/**
 * Created by ITB-Oleg on 15.12.2014.
 */
/*global require*/

var WORK_OUT_FOLDER = '../public/',
    PROD = true;

var gulp        = require('gulp'),
    htmlclean   = require('gulp-htmlclean'),
    plumber     = require('gulp-plumber'),
    size        = require('gulp-filesize'),

    spritesmith = require('gulp.spritesmith'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    buffer      = require('vinyl-buffer'),
    merge       = require('merge-stream'),

    stylus      = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),

    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');


gulp.task('blade', function () {
    "use strict";

    gulp.src('./src/views/**/*.blade.php')
        .pipe(htmlclean())
        .pipe(gulp.dest('../src/views/'));
});


gulp.task('styl', function () {
    "use strict";

    var stream = gulp.src('./src/styl/app.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'css'))
        .pipe(rename({suffix: ".min"}))
        .pipe(minifyCSS())
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'css'));
});


gulp.task('js', function () {
    "use strict";

    return gulp.src(['src/js/fix.js', 'src/js/lib/**/*.js', 'src/js/modules/**/*.js', 'src/js/app/**/*.js','src/js/app.js'])
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js/'))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'js'))
        .pipe(size());
});


gulp.task('sprite', function () {
    "use strict";

    var spriteData = gulp.src('src/sprite/*.png')
        .pipe(plumber())
        .pipe(spritesmith({
            imgName: '../i/sprite.png',
            cssName: 'sprite.styl'
        }));

    var imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(WORK_OUT_FOLDER + 'i/'));


    var cssStream = spriteData.css
        .pipe(gulp.dest('./src/styl/'));

    return merge(imgStream, cssStream);
});


gulp.task('watch', function () {
    "use strict";

    gulp.watch('./src/views/**/*.blade.php', ['blade']);
    gulp.watch('./src/styl/**/*.styl', ['styl']);
    gulp.watch('./src/js/**/*.js', ['js']);

});

gulp.task('default', ['blade', 'styl', 'js', 'watch']);