interface BuildConfig {
	inputFile: string;
	inputDir: string;
	outputDir: string;
	
	env: 'PRODUCTION' | 'DEVELOPEMENT';
}
