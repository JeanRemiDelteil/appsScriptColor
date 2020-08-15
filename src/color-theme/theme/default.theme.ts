import { CssTheme } from '../class/cssTheme';


export const defaultTheme = new CssTheme({
	themeName: 'Default',
	variables: {
		'codeBackGround': '#fff',
		'generalText': '#333',

		'Folder text': '#8a93ab',
		'Folder background': '#bfbfbf29',
	},
	rules: {

		// Folders
		'.asc_Folder>.asc_titleContainer': {
			'color': '{{Folder text}}',
		},
		'.asc_info_popup': {
			'color': '{{generalText}}',
			'background': '{{codeBackGround}}',
			'border-color': '{{generalText}}',
		},
		'.asc_Folder': {
			'background-color': '{{Folder background}}',
		},

	},
});
