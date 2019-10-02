const gulp = require('gulp');
const rollup = require('rollup');
const {terser} = require('rollup-plugin-terser');
const editFile = require('gulp-modify-file');
const clean = require('gulp-clean');


console.log('Build start');

new Promise(resolve => {
	gulp.src('build/', {read: false})
		.pipe(clean())
		
		.on('finish', resolve);
})
	.then(() => rollup.rollup({
		input: './_AppScriptColor_DEV/injectColor.js',
		plugins: [
			terser({
				sourcemap: false,
			})
		],
	}))
	.then(bundle => bundle.write({
		file: './build/AppScriptColor/injectColor.min.js',
		format: 'iife',
		sourcemap: false,
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
	
	.then(() => { console.log('Build finished'); });
