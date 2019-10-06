import {CssTheme} from './cssTheme';

export class BlackFoxConsoleTheme extends CssTheme {
	
	static get _themeName () {
		return 'Black fox Console';
	}
	
	static get _variables () {
		return {
			'codeBackGround': '#14171A',
			'generalBackGround': '#343c45',
			'generalText': '#a9bacb',
			'border': '#5C6773',
			'listItemBackground': '#1d4f73',
			'listItemBackgroundSelected': '#174262',
			'tabBackGround': '#2a3037',
			'listItemSelected': '#F5F7FA',
		};
	}
	
	static get _rules () {
		// noinspection DuplicatedCode
		return {
			'.editor .code-area .CodeMirror': {'background-color': '{{codeBackGround}}', 'line-height': '17px'},
			'.editor .code-area .CodeMirror pre': {'color': '#CDD7E0'}, // punctuation
			
			'.editor .code-area .CodeMirror-cursor': {'border-left': '1px solid #fff!important'},
			'.CodeMirror-focused div.CodeMirror-selected': {'background-color': '#3D484A'}, // selection background
			'div.CodeMirror-selected': {'background-color': '#3D484A'},
			
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
			'.editor .code-area .CodeMirror-gutter-text pre': {'color': '{{border}}'}, // line number
			
			// color of code
			'.cm-s-default span.cm-keyword': {'color': '#ba4'}, // key words
			'.cm-s-default span.cm-atom': {'color': '#BE3F42'}, // constant : true / false / undefined etc...
			'.cm-s-default span.cm-number': {'color': '#5F9F5B'}, // Numbers
			'.cm-s-default span.cm-def': {'color': '#3689B2'}, // variable's definition / function and others
			'.cm-s-default span.cm-variable': {'color': '#3689B2'},
			'.cm-s-default span.cm-variable-2': {'color': '#CDD7E0'},
			'.cm-s-default span.cm-variable-3': {'color': '#3689B2'},
			'.cm-s-default span.cm-property': {'color': '#3689B2'},
			'.cm-s-default span.cm-operator': {'color': '#A9BACB'},
			'.cm-s-default span.cm-comment': {'color': '#5C6773'}, // comments
			'.cm-s-default span.cm-string': {'color': '#BC8154'}, // String
			'.cm-s-default span.cm-string-2': {'color': '#f50'}, // regular expression & CSS properties
			'.cm-s-default span.cm-meta': {'color': '#555'},
			'.cm-s-default span.cm-error': {'color': '#FF2E0B'}, // erroneous HTML code like : "zer"zer class='zer'
			'.cm-s-default span.cm-qualifier': {'color': '#555'},
			'.cm-s-default span.cm-builtin': {'color': '#30a'},
			'.cm-s-default span.cm-bracket': {'color': '#997'},
			'.cm-s-default span.cm-tag': {'color': '#A673BF'}, // HTML tag
			'.cm-s-default span.cm-attribute': {'color': '#3689B2'}, // HTML attribute
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
			'.workspace .gwt-SplitLayoutPanel-HDragger': {'background-color': '#000!important', 'border-left': '1px solid {{border}}!important'},
			'.workspace .gwt-SplitLayoutPanel-VDragger': {'background-color': '#000!important', 'border-top': '1px solid {{border}}!important'},
			'.workspace .gwt-SplitLayoutPanel-HDragger:hover, .workspace .gwt-SplitLayoutPanel-VDragger:hover': {'background-color': '#222!important'},
			
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
			'.workspace .aux-info .treetable-background-1': {'background-color': '#2a3037'},
			
			// scrollBar
			'.CodeMirror-scroll.cm-s-default::-webkit-scrollbar-thumb': {'background-color': '#5C6773'},
			
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
				'background-color': '#17171729',
			},
			
		};
	}
	
}
