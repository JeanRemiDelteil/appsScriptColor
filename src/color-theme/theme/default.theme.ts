import { CssTheme } from '../class/cssTheme';


export const defaultTheme = new CssTheme({
	themeName: 'Default',
	variables: {


		//region # OLD IDE
		'DEPRECATED codeBackGround': '#fff',
		'DEPRECATED generalText': '#333',

		'DEPRECATED Folder text': '#8a93ab',
		'DEPRECATED Folder background': '#bfbfbf29',
		//endregion
	},
	rules: {


		//region # OLD IDE

		// Folders
		'.asc_old_Folder>.asc_titleContainer': {
			'color': '{{DEPRECATED Folder text}}',
		},
		'.asc_old_info_popup': {
			'color': '{{DEPRECATED generalText}}',
			'background': '{{DEPRECATED codeBackGround}}',
			'border-color': '{{DEPRECATED generalText}}',
		},
		'.asc_old_Folder': {
			'background-color': '{{DEPRECATED Folder background}}',
		},

		//endregion
	},
});
