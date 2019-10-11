import {CssTheme} from '../class/cssTheme';

export const darculaTheme = new CssTheme({
	themeName: 'Darcula',
	variables: {
		'codeBackGround': '#2B2B2B',
		'generalBackGround': '#3c3f41',
		'generalText': '#bbbbbb',
		'border': '#242627',
		'listItemBackground': '#4b6eaf',
		'listItemBackgroundSelected': '#0d293e',
		'tabBackGround': '#515658',
		'listItemSelected': '#bbbbbb',
	},
	rules: {
		'.editor .code-area .CodeMirror': {'background-color': '{{codeBackGround}}', 'line-height': '17px'},
		'.editor .code-area .CodeMirror pre': {'color': '{{generalText}}'}, // punctuation
		
		'.editor .code-area .CodeMirror-cursor': {'border-left': '1px solid #fff!important'},
		'.CodeMirror-focused div.CodeMirror-selected': {'background-color': '#214283'}, // selection background
		'div.CodeMirror-selected': {'background-color': '#214283'},
		
		// color of auto-complete-list
		'.autocomplete': {'background-color': '{{tabBackGround}}'},
		'.autocomplete .selected': {'background-color': '{{codeBackGround}}', 'color': '{{listItemSelected}}'},
		
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
		'.editor .code-area .CodeMirror-gutter-text pre': {'color': '888888'}, // line number
		
		// color of code
		'.cm-s-default span.cm-keyword': {'color': '#cc7832'}, // keywords
		'.cm-s-default span.cm-atom': {'color': '#cc7832'}, // constant : true / false / undefined etc...
		'.cm-s-default span.cm-number': {'color': '#6897bb'}, // Numbers
		'.cm-s-default span.cm-def': {'color': '#ffc66d'}, // definition of variable / function and others
		'.cm-s-default span.cm-variable': {'color': '#ffc66d'},
		'.cm-s-default span.cm-variable-2': {'color': '#CDD7E0'},
		'.cm-s-default span.cm-variable-3': {'color': '#ffc66d'},
		'.cm-s-default span.cm-property': {'color': '#9876aa'}, // properties in an object
		'.cm-s-default span.cm-operator': {'color': '{{generalText}}'},
		'.cm-s-default span.cm-comment': {'color': '#888888'}, // comments
		'.cm-s-default span.cm-string': {'color': '#6a8759'}, // String
		'.cm-s-default span.cm-string-2': {'color': '#f50'}, // regular expression & CSS properties
		'.cm-s-default span.cm-meta': {'color': '#555'},
		'.cm-s-default span.cm-error': {'color': '#FF2E0B'}, // erroneous HTML code like : "zer"zer class='zer'
		'.cm-s-default span.cm-qualifier': {'color': '#FF861E'}, // CSS path
		'.cm-s-default span.cm-builtin': {'color': '#FF861E'}, // used for CSS #id (a bug probably)
		'.cm-s-default span.cm-bracket': {'color': '#997'},
		'.cm-s-default span.cm-tag': {'color': '#ffc66d'}, // HTML tag
		'.cm-s-default span.cm-attribute': {'color': '#A772D0'}, // HTML attribute
		'.cm-s-default span.cm-header': {'color': '#00ECFF'}, // HTML template token : <?=  ?>
		'.cm-s-default span.cm-quote': {'color': '#090'},
		'.cm-s-default span.cm-hr': {'color': '#999'},
		'.cm-s-default span.cm-link': {'color': '#00c'},
		
		// UI colors
		'.editor .gwt-TabLayoutPanelTabs': {'background-color': '{{generalBackGround}}', 'border-color': '{{border}}'},
		'.editor .gwt-TabLayoutPanelTab': {'background-color': '{{tabBackGround}}', 'border-color': '{{border}}'},
		'.editor .gwt-TabLayoutPanelTab:hover .name, .editor .gwt-TabLayoutPanelTab-selected .tab-header .name': {'color': '{{generalText}}'},
		'.editor .gwt-TabLayoutPanelTab-selected:hover': {'background-color': '{{codeBackGround}}'},
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
		'.workspace .gwt-SplitLayoutPanel-HDragger': {'background-color': '{{generalBackGround}}!important', 'border-left': '1px solid {{border}}!important'},
		'.workspace .gwt-SplitLayoutPanel-VDragger': {'background-color': '{{generalBackGround}}!important', 'border-top': '1px solid {{border}}!important'},
		'.workspace .gwt-SplitLayoutPanel-HDragger:hover, .workspace .gwt-SplitLayoutPanel-VDragger:hover': {'background-color': '{{listItemBackgroundSelected}}!important'},
		
		// Status bar
		'.status-bar': {'background-color': '{{generalBackGround}}', 'border-top': '1px solid {{border}}'},
		
		// general colors
		'body': {'color': '{{generalText}}'},
		
		// Debug section
		'.workspace .aux-info': {'background-color': '{{generalBackGround}}'},
		'.workspace .aux-info .debugger-frame-label': {'background-color': '{{listItemBackground}}'},
		'.workspace .aux-info .debugger-frame-label-selected': {'background-color': '{{listItemBackgroundSelected}}', 'color': '{{generalText}}'},
		'.workspace .aux-info .debugger-callstack-wrapper': {'border-left': '1px solid {{border}}', 'border-top': '1px solid {{border}}'},
		'.workspace .aux-info .treetable-wrapper': {'border-left': '1px solid {{border}}', 'border-top': '1px solid {{border}}'},
		'.workspace .aux-info .treetable-background-2': {'background-color': '{{generalBackGround}}'},
		'.workspace .aux-info .treetable-background-1': {'background-color': '#49473f'},
		
		// scrollBar
		'.CodeMirror-scroll.cm-s-default::-webkit-scrollbar-thumb': {'background-color': 'rgba(134, 130, 115, 0.45)'},
		
		// Correction to context Menu
		'.resource-context-menu': {color: '{{generalBackGround}}'},
		
		
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
			'background-color': '#15151529',
		},
	},
});
