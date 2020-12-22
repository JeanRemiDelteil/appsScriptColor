import { CssTheme } from '../class/cssTheme';


export const darculaTheme = new CssTheme({
	themeName: 'Darcula',
	variables: {
		'IDE code background': '#2B2B2B',

		//region # OLD IDE
		'DEPRECATED codeBackGround': '#2B2B2B',
		'DEPRECATED generalBackGround': '#3c3f41',
		'DEPRECATED generalText': '#bbbbbb',
		'DEPRECATED textSelectionBackground': '#214283',
		'DEPRECATED border': '#242627',
		'DEPRECATED listItem': '#bbbbbb',
		'DEPRECATED listItemBackground': '#4b6eaf',
		'DEPRECATED listItemSelected': '#bbbbbb',
		'DEPRECATED listItemBackgroundSelected': '#0d293e',
		'DEPRECATED listItem Background secondary': '#49473f',
		'DEPRECATED tabBackGround': '#515658',
		'DEPRECATED Scrollbar': 'rgba(134, 130, 115, 0.45)',
		'DEPRECATED Drag bar': '#3c3f41',
		'DEPRECATED Drag bar hoover': '#0d293e',

		'DEPRECATED Folder text': '#8a93ab',
		'DEPRECATED Folder background': '#15151529',

		'DEPRECATED Line numbers': '#888888',
		'DEPRECATED Breakpoint': '#db4437',
		'DEPRECATED Cursor': '#ffffff',
		'DEPRECATED Code Punctuation': '#bbbbbb',
		'DEPRECATED Keywords': '#cc7832',
		'DEPRECATED Constants': '#cc7832',
		'DEPRECATED Numbers': '#6897bb',
		'DEPRECATED Definitions': '#ffc66d',
		'DEPRECATED Top level Variable': '#ffc66d',
		'DEPRECATED Local variable': '#CDD7E0',
		'DEPRECATED Object properties': '#9876aa',
		'DEPRECATED Operators': '#bbbbbb',
		'DEPRECATED Comments': '#888888',
		'DEPRECATED String': '#6a8759',
		'DEPRECATED Regular expressions': '#f50',
		'DEPRECATED Errors in HTML': '#FF2E0B',
		'DEPRECATED CSS selectors': '#FF861E',
		'DEPRECATED HTML tag': '#ffc66d',
		'DEPRECATED HTML attribute': '#A772D0',
		'DEPRECATED HTML template': '#00ECFF',
		//endregion
	},
	rules: {
		// Monaco IDE
		'.monaco-editor-background': {
			'background-color': '{{IDE code background}}',
		},

		//region # OLD IDE

		'.editor .code-area .CodeMirror': { 'background-color': '{{DEPRECATED codeBackGround}}', 'line-height': '17px' },
		'.editor .code-area .CodeMirror pre': { 'color': '{{DEPRECATED Code Punctuation}}' }, // punctuation

		'.editor .code-area .CodeMirror-DEPRECATED Cursor': { 'DEPRECATED border-left': '1px solid {{DEPRECATED Cursor}}!important' },
		'.CodeMirror-focused div.CodeMirror-selected': { 'background-color': '{{DEPRECATED textSelectionBackground}}' }, // selection background
		'div.CodeMirror-selected': { 'background-color': '{{DEPRECATED textSelectionBackground}}' },

		// color of auto-complete-list
		'.autocomplete': { 'background-color': '{{DEPRECATED tabBackGround}}', 'color': '{{DEPRECATED listItem}}' },
		'.autocomplete .selected': { 'background-color': '{{DEPRECATED listItemBackgroundSelected}}', 'color': '{{DEPRECATED listItemSelected}}', 'font-weight': 'bold' },

		// line number area
		'.editor .code-area .CodeMirror-gutter': {
			'background-color': '{{DEPRECATED codeBackGround}}',
			'DEPRECATED border-left': '1px solid',
			'DEPRECATED border-right': '1px solid',
			'DEPRECATED border-color': '{{DEPRECATED border}}',
		},
		'.editor .code-area .CodeMirror-gutter-text': {
			'background-color': '{{DEPRECATED codeBackGround}}',
			'box-shadow': '-1px 0px 0px 0px {{DEPRECATED border}}, 1px 0px 0px 0px {{DEPRECATED border}}',
		}, // line number's background
		'.editor .code-area .CodeMirror-gutter-text pre': { 'color': '{{DEPRECATED Line numbers}}' }, // line number
		'.editor .code-area .CodeMirror-gutter-text .DEPRECATED Breakpoint': {
			'color': '{{DEPRECATED Breakpoint}}',
			'left': '0px',
			'line-height': '0.8em',
			'font-size': '1.5em',
		},

		// color of code
		'.cm-s-default span.cm-keyword': { 'color': '{{DEPRECATED Keywords}}' }, // DEPRECATED Keywords
		'.cm-s-default span.cm-atom': { 'color': '{{DEPRECATED Constants}}' }, // constant : true / false / undefined etc...
		'.cm-s-default span.cm-number': { 'color': '{{DEPRECATED Numbers}}' }, // DEPRECATED Numbers
		'.cm-s-default span.cm-def': { 'color': '{{DEPRECATED Definitions}}' }, // definition of variable / function and others
		'.cm-s-default span.cm-variable': { 'color': '{{DEPRECATED Top level Variable}}' },
		'.cm-s-default span.cm-variable-2': { 'color': '{{DEPRECATED Local variable}}' },
		'.cm-s-default span.cm-variable-3': { 'color': '{{DEPRECATED Local variable}}' },
		'.cm-s-default span.cm-property': { 'color': '{{DEPRECATED Object properties}}' }, // properties in an object
		'.cm-s-default span.cm-operator': { 'color': '{{DEPRECATED Operators}}' },
		'.cm-s-default span.cm-comment': { 'color': '{{DEPRECATED Comments}}' }, // DEPRECATED Comments
		'.cm-s-default span.cm-string': { 'color': '{{DEPRECATED String}}' }, // String
		'.cm-s-default span.cm-string-2': { 'color': '{{DEPRECATED Regular expressions}}' }, // regular expression & CSS properties
		'.cm-s-default span.cm-meta': { 'color': '#555' },
		'.cm-s-default span.cm-error': { 'color': '{{DEPRECATED Errors in HTML}}' }, // erroneous HTML code like : "zer"zer class='zer'
		'.cm-s-default span.cm-qualifier': { 'color': '{{DEPRECATED CSS selectors}}' }, // CSS path
		'.cm-s-default span.cm-builtin': { 'color': '{{DEPRECATED CSS selectors}}' }, // used for CSS #id (a bug probably)
		'.cm-s-default span.cm-bracket': { 'color': '#997' },
		'.cm-s-default span.cm-tag': { 'color': '{{DEPRECATED HTML tag}}' }, // HTML tag
		'.cm-s-default span.cm-attribute': { 'color': '{{DEPRECATED HTML attribute}}' }, // HTML attribute
		'.cm-s-default span.cm-header': { 'color': '{{DEPRECATED HTML template}}' }, // HTML template token : <?=  ?>
		'.cm-s-default span.cm-quote': { 'color': '#090' },
		'.cm-s-default span.cm-hr': { 'color': '#999' },
		'.cm-s-default span.cm-link': { 'color': '#00c' },

		// UI colors
		'.editor .gwt-TabLayoutPanelTabs': { 'background-color': '{{DEPRECATED generalBackGround}}', 'DEPRECATED border-color': '{{DEPRECATED border}}' },
		'.editor .gwt-TabLayoutPanelTab': { 'background-color': '{{DEPRECATED tabBackGround}}', 'DEPRECATED border-color': '{{DEPRECATED border}}' },
		'.editor .gwt-TabLayoutPanelTab:hover .name, .editor .gwt-TabLayoutPanelTab-selected .tab-header .name': { 'color': '{{DEPRECATED generalText}}' },
		'.editor .gwt-TabLayoutPanelTab-selected': { 'background-color': '{{DEPRECATED codeBackGround}}' },
		'.editor .gwt-TabLayoutPanelTab:hover': { 'background-color': '{{DEPRECATED codeBackGround}}' },

		// resource panel
		'.resource-list': { 'background-color': '{{DEPRECATED generalBackGround}}', 'color': '{{DEPRECATED generalText}}' },
		'.resource-list .project-items-list .item': { 'DEPRECATED border-bottom': '1px solid {{DEPRECATED border}}' },
		'.resource-list .project-items-list .selected, .resource-list .project-items-list .selected:hover': {
			'background-color': '{{DEPRECATED listItemBackground}}',
			'color': '{{DEPRECATED listItemSelected}}',
		},
		'.resource-list .project-items-list .focused, .resource-list .project-items-list .item:hover': {
			'background-color': '{{DEPRECATED listItemBackgroundSelected}}',
			'color': '{{DEPRECATED generalText}}',
		},

		// DEPRECATED Drag bar
		'.workspace .gwt-SplitLayoutPanel-HDragger': {
			'background-color': '{{DEPRECATED Drag bar}}!important',
			'DEPRECATED border-left': '1px solid {{DEPRECATED border}}!important',
		},
		'.workspace .gwt-SplitLayoutPanel-VDragger': {
			'background-color': '{{DEPRECATED Drag bar}}!important',
			'DEPRECATED border-top': '1px solid {{DEPRECATED border}}!important',
		},
		'.workspace .gwt-SplitLayoutPanel-HDragger:hover, .workspace .gwt-SplitLayoutPanel-VDragger:hover': { 'background-color': '{{DEPRECATED Drag bar hoover}}!important' },

		// Status bar
		'.status-bar': {
			'background-color': '{{DEPRECATED generalBackGround}}',
			'color': '{{DEPRECATED generalText}}',
			'DEPRECATED border-top': '1px solid {{DEPRECATED border}}',
		},

		// general colors
		'.workspace': { 'color': '{{DEPRECATED generalText}}' },

		// Debug section
		'.workspace .aux-info': { 'background-color': '{{DEPRECATED generalBackGround}}' },
		'.workspace .aux-info .debugger-frame-label': { 'background-color': '{{DEPRECATED listItemBackground}}' },
		'.workspace .aux-info .debugger-frame-label-selected': { 'background-color': '{{DEPRECATED listItemBackgroundSelected}}', 'color': '{{DEPRECATED generalText}}' },
		'.workspace .aux-info .debugger-callstack-wrapper': {
			'DEPRECATED border-left': '1px solid {{DEPRECATED border}}',
			'DEPRECATED border-top': '1px solid {{DEPRECATED border}}',
		},
		'.workspace .aux-info .treetable-wrapper': { 'DEPRECATED border-left': '1px solid {{DEPRECATED border}}', 'DEPRECATED border-top': '1px solid {{DEPRECATED border}}' },
		'.workspace .aux-info .treetable-background-2': { 'background-color': '{{DEPRECATED generalBackGround}}' },
		'.workspace .aux-info .treetable-background-1': { 'background-color': '{{DEPRECATED listItem Background secondary}}' },

		// DEPRECATED Scrollbar
		'.CodeMirror-scroll.cm-s-default::-webkit-DEPRECATED Scrollbar-thumb': { 'background-color': '{{DEPRECATED Scrollbar}}' },

		// Correction to context Menu
		'.resource-context-menu': { color: '{{DEPRECATED generalBackGround}}' },


		// Folders
		'.asc_old_Folder>.asc_titleContainer': {
			'color': '{{DEPRECATED Folder text}}',
		},
		'.asc_old_info_popup': {
			'color': '{{DEPRECATED generalText}}',
			'background': '{{DEPRECATED codeBackGround}}',
			'DEPRECATED border-color': '{{DEPRECATED generalText}}',
		},
		'.asc_old_Folder': {
			'background-color': '{{DEPRECATED Folder background}}',
		},

		//endregion
	},
});
