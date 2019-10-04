#!/usr/bin/env node

const {src, dest, series} = require('gulp');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');
const clean = require('gulp-clean');
const {argv} = require('yargs');


/**
 * @type {BuildConfig}
 */
let settings;
let TARGET;

async function getSettings() {
	TARGET = argv['target'] || 'dev';
	
	try {
		settings = require(`./config/config_${TARGET}`);
	}
	catch (e) {
		console.log(`\x1b[31mERROR: "\x1b[0m\x1b[41m\x1b[30m${TARGET}\x1b[31m\x1b[0m\x1b[31m" is not a valid target build\x1b[0m`);
		
		throw e;
	}
	
	console.log(`\x1b[46m\x1b[30mTarget: ${TARGET} \x1b[0m`);
}


function cleanBuildFolder() {
	return src(`./output/${settings.outputDir}`, {
		read: false,
		allowEmpty: true,
	})
		.pipe(clean());
}

async function buildBundle() {
	const bundle = await rollup.rollup({
		input: `../${settings.inputDir}/${settings.inputFile}`,
		plugins: [
			resolve(),
			...(settings.env === 'PRODUCTION' ? [terser({
				sourcemap: false,
			})] : []),
		],
	});
	
	return bundle.write({
		file: `./output/${settings.outputDir}/injectColor.js`,
		format: 'iife',
		sourcemap: false,
	});
}

async function watchdBundle() {
	// noinspection JSCheckFunctionSignatures
	return rollup.watch({
		input: './_AppScriptColor_DEV/injectColor.js',
		plugins: [
			terser({
				sourcemap: false,
			}),
		],
		
		output: [
			{
				file: './build/AppScriptColor/injectColor.js',
				format: 'iife',
				sourcemap: false,
			},
		],
		watch: {},
	});
}

function copyManifest() {
	return src(`../${settings.inputDir}/manifest.json`)
		.pipe(dest(`./output/${settings.outputDir}/`));
}

function copyAssets() {
	return src(`../${settings.inputDir}/assets/*.png`)
		.pipe(dest(`./output/${settings.outputDir}/`));
}


// getSettings();

exports.build = series(getSettings, cleanBuildFolder, copyManifest, copyAssets, buildBundle);
exports.watch = series(getSettings, cleanBuildFolder, copyManifest, copyAssets, watchdBundle);
