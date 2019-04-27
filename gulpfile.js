const gulp = require('gulp');
const sass = require('gulp-sass');

function compileSass () {
  return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('css/'));
}

gulp.task('sass', compileSass);
