const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const include = require('gulp-file-include');

function styledel(){
  return del('./dist/css')
};

function stylebuild(){
  return src(['./src/scss/**/*.scss','./src/scss/**/*.css'])
  .pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compressed' // nested, expanded, compact, or compressed.
	}).on('error', sass.logError))
  .pipe(dest('./dist/css'));
};

const style = series(styledel, stylebuild);

/* function htmlcopy(){
  return src('./src/index.html')
  .pipe(dest('./dist'));
}; */

function scriptdel(){
  return del('./dist/js')
}

function scriptcopy(){
  return src('./src/js/**/*.js')
  .pipe(dest('./dist/js'));
};

const script = series(scriptdel, scriptcopy);

function htmlinclude(){
  return src('./src/index.html')
  .pipe(include({
    indent: true
  }))
  .pipe(dest('./dist'))
}

function allwatch(){
  watch(['./src/index.html','./src/html/*.html'],htmlinclude);
  watch('./src/js/**/*.js',script);
  watch('./src/scss/**/*.scss',style);
}

exports.build = parallel(styledel, scriptdel);
exports.default = series(style, htmlinclude, script, allwatch);