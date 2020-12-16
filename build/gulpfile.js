#!/usr/bin/env node

const {src, dest, series} = require('gulp');
const clean = require('gulp-clean');
const {argv} = require('yargs');
const rollup = require('rollup');
const createExtensionConfig = require('./rollup.config');


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
	
	// Babel browser config is defined in package.json 
	const chromeExtensionConfig = createExtensionConfig({
		input: `../${settings.inputDir}/${settings.inputFile}`,
		outputFile: `./output/${settings.outputDir}/injectColor.js`,
		production: settings.env === 'PRODUCTION',
	});
	
	const bundle = await rollup.rollup(chromeExtensionConfig.inputConfig);
	
	return bundle.write(chromeExtensionConfig.outputConfig);
}

async function watchBundle() {
	// Babel browser config is defined in package.json 
	const chromeExtensionConfig = createExtensionConfig({
		input: `../${settings.inputDir}/${settings.inputFile}`,
		outputFile: `./output/${settings.outputDir}/injectColor.js`,
		production: settings.env === 'PRODUCTION',
	});
	
	return rollup.watch({
		...chromeExtensionConfig.inputConfig,
		output: [chromeExtensionConfig.outputConfig],
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
exports.watch = series(getSettings, cleanBuildFolder, copyManifest, copyAssets, watchBundle);
