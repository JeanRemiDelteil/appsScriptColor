interface BuildConfig {
	inputFiles: { input: string, output: string }[];
	inputDir: string;
	outputDir: string;

	env: 'PRODUCTION' | 'DEVELOPMENT';
}
