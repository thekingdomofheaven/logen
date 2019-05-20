const {src, dest} = require('gulp');
const sass = require('gulp-sass');

function stylebuild(){
  return src('./src/scss/**/*.scss')
  .pipe(sass({
    outputStyle:'compressed'
  }).on('error', sass.logError))
  .pipe(dest('./dist/css'));
}

exports.default = stylebuild;