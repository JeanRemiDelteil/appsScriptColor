const resolve = require('@rollup/plugin-node-resolve');
const {terser} = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const customMinifyCss = require('@open-wc/building-utils/custom-minify-css');

/**
 *
 * @param options
 * @param options.input
 * @param options.outputFile
 * @param options.production
 *
 * @return {{inputConfig: {}, outputConfig: {}}}
 */
module.exports = function createExtensionConfig(options) {
	
	return {
		inputConfig: {
			input: options.input,
			treeshake: !!options.production,
			plugins: [
				// resolve bare import specifiers
				resolve({
					extensions: ['.js', '.mjs', '.ts'],
				}),
				
				babel({
					extensions: ['.js', '.mjs', '.ts'],
					plugins: [
						"@babel/plugin-proposal-class-properties",
						["@babel/plugin-proposal-decorators", {"decoratorsBeforeExport": true}],
						'@babel/plugin-syntax-dynamic-import',
						'@babel/plugin-syntax-import-meta',
						// rollup rewrites import.meta.url, but makes them point to the file location after bundling
						// we want the location before bundling
						'bundled-import-meta',
						
						options.production && [
							'template-html-minifier',
							{
								modules: {
									'lit-html': ['html'],
									'lit-element': ['html', {name: 'css', encapsulation: 'style'}],
								},
								htmlMinifier: {
									collapseWhitespace: true,
									removeComments: true,
									caseSensitive: true,
									minifyCSS: customMinifyCss,
								},
							},
						],
					].filter(_ => !!_),
					
					presets: [
						"@babel/preset-typescript",
						[
							'@babel/preset-env',
							{
								targets: [
									"last 2 Chrome versions",
								],
								// preset-env compiles template literals for safari 12 due to a small bug which
								// doesn't affect most use cases. for example lit-html handles it: (https://github.com/Polymer/lit-html/issues/575)
								exclude: ['@babel/plugin-transform-template-literals'],
								useBuiltIns: false,
								modules: false,
							},
						],
					],
				}),
				
				// only minify if in production
				options.production && terser({
					sourcemap: false,
				}),
			],
		},
		outputConfig: {
			file: options.outputFile,
			format: 'iife',
			sourcemap: false,
		},
	};
};
