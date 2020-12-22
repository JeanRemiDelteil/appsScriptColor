export interface IMonacoTheme {
	base: string;
	inherit: boolean;
	rules: {
		token: string;
		background?: string;
		foreground?: string;
		fontStyle?: string;
	}[];
	colors: {
		[token: string]: string;
	};
}
