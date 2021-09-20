const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');




gulp.task('styles', function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min"
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("public/css"));
});

gulp.task('watch', function(){
    gulp.watch("src/**/*.scss", gulp.parallel("styles"));
    // gulp.watch('src/css/**/*.css').on('change', gulp.parallel("stylesAll"));
    // gulp.watch("src/*.html").on("change", gulp.parallel('html'));
    // gulp.watch("src/js/**/*.js").on("change", gulp.parallel('scripts'));
    // gulp.watch("src/icons/**/*").on("all", gulp.parallel('icons'));
    // gulp.watch("src/fonts/**/*").on("all", gulp.parallel('fonts'));
    // gulp.watch("src/img/**/*").on("all", gulp.parallel('images'));
});

// gulp.task('stylesAll', function() {
//     return gulp.src("src/css/**/*.css")
//         .pipe(gulp.dest('dist/css'));
// });

// gulp.task('html', function() {
//     return gulp.src("src/*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest('dist'));
// });

// gulp.task('scripts', function() {
//     return gulp.src("src/js/**/*.js")
//         .pipe(gulp.dest('dist/js'));
// });

// gulp.task('fonts', function() {
//     return gulp.src("src/fonts/**/*")
//         .pipe(gulp.dest('dist/fonts'))
//         .pipe(browserSync.stream());
// });

// gulp.task('icons', function() {
//     return gulp.src("src/icons/**/*")
//         .pipe(gulp.dest('dist/icons'))
//         .pipe(browserSync.stream());
// });

// gulp.task('mailer', function() {
//     return gulp.src("src/mailer/**/*")
//         .pipe(gulp.dest('dist/mailer'));
// });

// gulp.task('images', function() {
//     return gulp.src("src/img/**/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/img'))
//         .pipe(browserSync.stream());
// });

gulp.task('default', gulp.parallel('watch', 'styles'));