const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');

function stylebuild(){
  return src('./src/scss/**/*.scss')
  .pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compressed' // nested, expanded, compact, or compressed.
	}).on('error', sass.logError))
  .pipe(dest('./dist/css'));
};

function htmlcopy(){
  return src('./src/index.html')
  .pipe(dest('./dist'));
};

function scriptcopy(){
  return src('./src/js/**/*.js')
  .pipe(dest('./dist/js'));
};

function allwatch(){
  watch('./src/index.html',htmlcopy);
  watch('./src/js/**/*.js',scriptcopy);
  watch('./src/scss/**/*.scss',stylebuild);
}

exports.default = series(stylebuild, htmlcopy, scriptcopy, allwatch);