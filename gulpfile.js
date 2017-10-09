let gulp = require('gulp');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;
let editFile = require('gulp-modify-file');
let clean = require('gulp-clean');


console.log('Build start');

new Promise(resolve => {
	gulp.src('build/', {read: false})
		.pipe(clean())
		
		.on('finish', resolve);
})
	.then(() => new Promise(resolve => {
		gulp.src('_AppScriptColor_DEV/injectColor.js')
			.pipe(uglify(/* options */))
			.pipe(rename('injectColor.min.js'))
			.pipe(gulp.dest('build/AppScriptColor/'))
			
			.on('finish', resolve);
	}))
	.then(() => console.log('JS minified'))
	
	.then(() => new Promise(resolve => {
		gulp.src('_AppScriptColor_DEV/manifest.json')
			.pipe(editFile((content, path, file) => {
				return content.replace('injectColor.js', 'injectColor.min.js');
			}))
			.pipe(gulp.dest('build/AppScriptColor/'))
			
			.on('finish', resolve);
	}))
	.then(() => console.log('Config copied'))
	
	.then(() => new Promise(resolve => {
		gulp.src('_AppScriptColor_DEV/*.png')
			.pipe(gulp.dest('build/AppScriptColor/'))
			
			.on('finish', resolve);
	}))
	.then(() => console.log('Images copied'))
	
	.then(() => { console.log('Build finished') });
