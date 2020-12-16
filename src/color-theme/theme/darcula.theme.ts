import { CssTheme } from '../class/cssTheme';


export const darculaTheme = new CssTheme({
	themeName: 'Darcula',
	variables: {
		'codeBackGround': '#2B2B2B',
		'generalBackGround': '#3c3f41',
		'generalText': '#bbbbbb',
		'textSelectionBackground': '#214283',
		'border': '#242627',
		'listItem': '#bbbbbb',
		'listItemBackground': '#4b6eaf',
		'listItemSelected': '#bbbbbb',
		'listItemBackgroundSelected': '#0d293e',
		'listItem Background secondary': '#49473f',
		'tabBackGround': '#515658',
		'Scrollbar': 'rgba(134, 130, 115, 0.45)',
		'Drag bar': '#3c3f41',
		'Drag bar hoover': '#0d293e',

		'Folder text': '#8a93ab',
		'Folder background': '#15151529',

		'Line numbers': '#888888',
		'Breakpoint': '#db4437',
		'Cursor': '#ffffff',
		'Code Punctuation': '#bbbbbb',
		'Keywords': '#cc7832',
		'Constants': '#cc7832',
		'Numbers': '#6897bb',
		'Definitions': '#ffc66d',
		'Top level Variable': '#ffc66d',
		'Local variable': '#CDD7E0',
		'Object properties': '#9876aa',
		'Operators': '#bbbbbb',
		'Comments': '#888888',
		'String': '#6a8759',
		'Regular expressions': '#f50',
		'Errors in HTML': '#FF2E0B',
		'CSS selectors': '#FF861E',
		'HTML tag': '#ffc66d',
		'HTML attribute': '#A772D0',
		'HTML template': '#00ECFF',
	},
	rules: {
		'.editor .code-area .CodeMirror': {'background-color': '{{codeBackGround}}', 'line-height': '17px'},
		'.editor .code-area .CodeMirror pre': {'color': '{{Code Punctuation}}'}, // punctuation

		'.editor .code-area .CodeMirror-cursor': {'border-left': '1px solid {{Cursor}}!important'},
		'.CodeMirror-focused div.CodeMirror-selected': {'background-color': '{{textSelectionBackground}}'}, // selection background
		'div.CodeMirror-selected': {'background-color': '{{textSelectionBackground}}'},

		// color of auto-complete-list
		'.autocomplete': {'background-color': '{{tabBackGround}}', 'color': '{{listItem}}'},
		'.autocomplete .selected': {'background-color': '{{listItemBackgroundSelected}}', 'color': '{{listItemSelected}}', 'font-weight': 'bold'},

		// line number area
		'.editor .code-area .CodeMirror-gutter': {
			'background-color': '{{codeBackGround}}',
			'border-left': '1px solid',
			'border-right': '1px solid',
			'border-color': '{{border}}',
		},
		'.editor .code-area .CodeMirror-gutter-text': {
			'background-color': '{{codeBackGround}}',
			'box-shadow': '-1px 0px 0px 0px {{border}}, 1px 0px 0px 0px {{border}}',
		}, // line number's background
		'.editor .code-area .CodeMirror-gutter-text pre': {'color': '{{Line numbers}}'}, // line number
		'.editor .code-area .CodeMirror-gutter-text .breakpoint': {
			'color': '{{Breakpoint}}',
			'left': '0px',
			'line-height': '0.8em',
			'font-size': '1.5em',
		},

		// color of code
		'.cm-s-default span.cm-keyword': {'color': '{{Keywords}}'}, // keywords
		'.cm-s-default span.cm-atom': {'color': '{{Constants}}'}, // constant : true / false / undefined etc...
		'.cm-s-default span.cm-number': {'color': '{{Numbers}}'}, // Numbers
		'.cm-s-default span.cm-def': {'color': '{{Definitions}}'}, // definition of variable / function and others
		'.cm-s-default span.cm-variable': {'color': '{{Top level Variable}}'},
		'.cm-s-default span.cm-variable-2': {'color': '{{Local variable}}'},
		'.cm-s-default span.cm-variable-3': {'color': '{{Local variable}}'},
		'.cm-s-default span.cm-property': {'color': '{{Object properties}}'}, // properties in an object
		'.cm-s-default span.cm-operator': {'color': '{{Operators}}'},
		'.cm-s-default span.cm-comment': {'color': '{{Comments}}'}, // comments
		'.cm-s-default span.cm-string': {'color': '{{String}}'}, // String
		'.cm-s-default span.cm-string-2': {'color': '{{Regular expressions}}'}, // regular expression & CSS properties
		'.cm-s-default span.cm-meta': {'color': '#555'},
		'.cm-s-default span.cm-error': {'color': '{{Errors in HTML}}'}, // erroneous HTML code like : "zer"zer class='zer'
		'.cm-s-default span.cm-qualifier': {'color': '{{CSS selectors}}'}, // CSS path
		'.cm-s-default span.cm-builtin': {'color': '{{CSS selectors}}'}, // used for CSS #id (a bug probably)
		'.cm-s-default span.cm-bracket': {'color': '#997'},
		'.cm-s-default span.cm-tag': {'color': '{{HTML tag}}'}, // HTML tag
		'.cm-s-default span.cm-attribute': {'color': '{{HTML attribute}}'}, // HTML attribute
		'.cm-s-default span.cm-header': {'color': '{{HTML template}}'}, // HTML template token : <?=  ?>
		'.cm-s-default span.cm-quote': {'color': '#090'},
		'.cm-s-default span.cm-hr': {'color': '#999'},
		'.cm-s-default span.cm-link': {'color': '#00c'},

		// UI colors
		'.editor .gwt-TabLayoutPanelTabs': {'background-color': '{{generalBackGround}}', 'border-color': '{{border}}'},
		'.editor .gwt-TabLayoutPanelTab': {'background-color': '{{tabBackGround}}', 'border-color': '{{border}}'},
		'.editor .gwt-TabLayoutPanelTab:hover .name, .editor .gwt-TabLayoutPanelTab-selected .tab-header .name': {'color': '{{generalText}}'},
		'.editor .gwt-TabLayoutPanelTab-selected': {'background-color': '{{codeBackGround}}'},
		'.editor .gwt-TabLayoutPanelTab:hover': {'background-color': '{{codeBackGround}}'},

		// resource panel
		'.resource-list': {'background-color': '{{generalBackGround}}', 'color': '{{generalText}}'},
		'.resource-list .project-items-list .item': {'border-bottom': '1px solid {{border}}'},
		'.resource-list .project-items-list .selected, .resource-list .project-items-list .selected:hover': {
			'background-color': '{{listItemBackground}}',
			'color': '{{listItemSelected}}',
		},
		'.resource-list .project-items-list .focused, .resource-list .project-items-list .item:hover': {
			'background-color': '{{listItemBackgroundSelected}}',
			'color': '{{generalText}}',
		},

		// drag bar
		'.workspace .gwt-SplitLayoutPanel-HDragger': {'background-color': '{{Drag bar}}!important', 'border-left': '1px solid {{border}}!important'},
		'.workspace .gwt-SplitLayoutPanel-VDragger': {'background-color': '{{Drag bar}}!important', 'border-top': '1px solid {{border}}!important'},
		'.workspace .gwt-SplitLayoutPanel-HDragger:hover, .workspace .gwt-SplitLayoutPanel-VDragger:hover': {'background-color': '{{Drag bar hoover}}!important'},

		// Status bar
		'.status-bar': {'background-color': '{{generalBackGround}}', 'color': '{{generalText}}', 'border-top': '1px solid {{border}}'},

		// general colors
		'.workspace': {'color': '{{generalText}}'},

		// Debug section
		'.workspace .aux-info': {'background-color': '{{generalBackGround}}'},
		'.workspace .aux-info .debugger-frame-label': {'background-color': '{{listItemBackground}}'},
		'.workspace .aux-info .debugger-frame-label-selected': {'background-color': '{{listItemBackgroundSelected}}', 'color': '{{generalText}}'},
		'.workspace .aux-info .debugger-callstack-wrapper': {'border-left': '1px solid {{border}}', 'border-top': '1px solid {{border}}'},
		'.workspace .aux-info .treetable-wrapper': {'border-left': '1px solid {{border}}', 'border-top': '1px solid {{border}}'},
		'.workspace .aux-info .treetable-background-2': {'background-color': '{{generalBackGround}}'},
		'.workspace .aux-info .treetable-background-1': { 'background-color': '{{listItem Background secondary}}' },

		// scrollBar
		'.CodeMirror-scroll.cm-s-default::-webkit-scrollbar-thumb': { 'background-color': '{{Scrollbar}}' },

		// Correction to context Menu
		'.resource-context-menu': { color: '{{generalBackGround}}' },


		// Folders
		'.asc_old_Folder>.asc_titleContainer': {
			'color': '{{Folder text}}',
		},
		'.asc_old_info_popup': {
			'color': '{{generalText}}',
			'background': '{{codeBackGround}}',
			'border-color': '{{generalText}}',
		},
		'.asc_old_Folder': {
			'background-color': '{{Folder background}}',
		},
	},
});
