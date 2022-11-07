module.exports = {
    inputFiles: [
        { input: 'index.ts', output: 'injectColor.js' },
        { input: 'background/index.ts', output: 'background.js' },
    ],
	inputDir: './src',
	outputDir: 'AppScriptColorDEV',
	
	env: 'DEVELOPMENT',
};
