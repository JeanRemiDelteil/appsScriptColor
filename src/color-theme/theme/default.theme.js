import {CssTheme} from './cssTheme';

export class DefaultTheme extends CssTheme {
	
	static get _themeName() {
		return 'Default';
	};
	
	static get _variables() {
		return {
			'codeBackGround': 'white',
			'border': '#D9D9D9',
			'listItemBackgroundSelected': '#f5f5f5',
			'generalText': '#333',
		};
	}
	
	static get _rules() {
		return {
			
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
			
		};
	}
	
}
