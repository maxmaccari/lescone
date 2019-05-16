const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

const buildJavascript = () => {
  return gulp.src('src/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.stream());
};

const buildStyles = () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
};

const minifyImages = () => {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'))
    .pipe(browserSync.stream());
}

const copyStatic = () => {
  return gulp.src('src/static/**/*')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
};

function server () {
  browserSync.init({
    server: {
      baseDir: 'public/'
    }
  });
};

function watch () {
  gulp.watch('src/scss/**/*.js', buildJavascript);
  gulp.watch('src/scss/**/*.scss', buildStyles);
  gulp.watch('src/img/**/*', minifyImages);
  gulp.watch('src/static/**/*', copyStatic);
};

// Tasks
gulp.task('javascript', buildJavascript);
gulp.task('styles', buildStyles);
gulp.task('images', minifyImages);
gulp.task('static', copyStatic);
gulp.task('build', gulp.parallel('javascript', 'styles', 'static', 'images'));
gulp.task('watch', watch);
gulp.task('server', server);
gulp.task('default', gulp.parallel('build', 'watch', 'server'));
