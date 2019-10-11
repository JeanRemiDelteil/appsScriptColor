import {CssTheme} from '../class/cssTheme';

export const defaultTheme = new CssTheme({
	themeName: 'Default',
	variables: {
		'codeBackGround': 'white',
		'border': '#D9D9D9',
		'listItemBackgroundSelected': '#f5f5f5',
		'generalText': '#333',
	},
	rules: {
		
		// Folders
		'.asc_Folder>.asc_titleContainer': {
			'color': '#8a93ab;',
		},
		'.asc_info_popup': {
			'color': '{{generalText}}',
			'background': '{{codeBackGround}}',
			'border-color': '{{generalText}}',
		},
		'.asc_Folder': {
			'background-color': '#bfbfbf29',
		},
		
	},
});
