let gulp = require('gulp');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;

console.log('Build start');

gulp.src('_AppScriptColor_DEV/injectColor.js')
	.pipe(uglify(/* options */))
	.pipe(rename('injectColor.min.js'))
	.pipe(gulp.dest('build/AppScriptColor/'))
	
	.on('finish', () => {
		console.log('Build finished');
	});