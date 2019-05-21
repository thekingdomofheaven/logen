const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');

function stylebuild(){
  return src('./src/scss/**/*.scss')
  .pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compressed' // nested, expanded, compact, or compressed.
	}).on('error', sass.logError))
  .pipe(dest('./dist/css'));
}

function htmlcopy(){
  return src('./src/index.html')
  .pipe(dest('./dist'));
}

exports.default = function(){
  watch('./src/scss/**/*.scss',stylebuild);
  watch('./src/index.html', htmlcopy);
};