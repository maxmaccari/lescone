const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');


const buildJavascript = () => {
  return gulp.src('src/js/main.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.stream());
};

const lintJavascript = () => {
  return gulp.src('src/js/main.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
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

const lintStyles = () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
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
  gulp.watch('src/js/**/*.js', buildJavascript);
  gulp.watch('src/js/**/*.js', lintJavascript);
  gulp.watch('src/scss/**/*.scss', buildStyles);
  gulp.watch('src/scss/**/*.scss', lintStyles);
  gulp.watch('src/img/**/*', minifyImages);
  gulp.watch('src/static/**/*', copyStatic);
};

// Tasks
gulp.task('javascript', buildJavascript);
gulp.task('lintJavascript', lintJavascript);
gulp.task('styles', buildStyles);
gulp.task('lintStyles', lintStyles);
gulp.task('images', minifyImages);
gulp.task('static', copyStatic);
gulp.task('lint', gulp.series('lintJavascript', 'lintStyles'));
gulp.task('build', gulp.parallel('javascript', 'styles', 'static', 'images'));
gulp.task('watch', watch);
gulp.task('server', server);
gulp.task('default', gulp.parallel('build', 'watch', 'server'));
