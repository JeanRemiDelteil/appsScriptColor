export const asc = {
	defaultTheme: 'Darcula',
	theme: {
		'Black fox Console': {
			generalVariables: {
				'codeBackGround': '#14171A',
				'generalBackGround': '#343c45',
				'generalText': '#a9bacb',
				'border': '#5C6773',
				'listItemBackground': '#1d4f73',
				'listItemBackgroundSelected': '#174262',
				'tabBackGround': '#2a3037',
				'listItemSelected': '#F5F7FA',
			},
			cssRules: {
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
				
			},
		},
		'Darcula': {
			generalVariables: {
				'codeBackGround': '#2B2B2B',
				'generalBackGround': '#3c3f41',
				'generalText': '#bbbbbb',
				'border': '#242627',
				'listItemBackground': '#4b6eaf',
				'listItemBackgroundSelected': '#0d293e',
				'tabBackGround': '#515658',
				'listItemSelected': '#bbbbbb',
			},
			cssRules: {
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
		},
		'Default': {
			generalVariables: {
				'codeBackGround': 'white',
				'border': '#D9D9D9',
				'listItemBackgroundSelected': '#f5f5f5',
				'generalText': '#333',
			},
			cssRules: {
				
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
		},
	},
	userTheme: '',
	
	_divCmCustomStyle: null,
	
	initColors: function () {
		// Fetch user pref
		asc.userTheme = localStorage.getItem('appScriptColor-theme') || asc.defaultTheme;
		
		// inject custom CSS
		asc.useCustomStyle(asc.theme[asc.userTheme] || 'Default');
		
		
		// create an observer instance to detect <style> insertion: when need to be the last styleSheet
		let observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				for (let item in mutation.addedNodes) {
					let node = mutation.addedNodes[item];
					
					// Filter for STYLE elements (other than our styleSheet)
					if (node.tagName !== 'STYLE' || node.id === 'cmCustomStyle') continue;
					
					// Move style node to the end for the HEAD
					document.head.appendChild(this._divCmCustomStyle);
				}
			});
		});
		
		// configuration of the observer:
		let config = {
			childList: true,
			attributes: false,
			characterData: false, /*,
			 subtree: false,
			 attributeOldValue: false,
			 characterDataOldValue: false,
			 attributeFilter: []
			 */
		};
		
		// pass in the target node, as well as the observer options
		//noinspection JSCheckFunctionSignatures
		observer.observe(document.head, config);
	},
	useCustomStyle: function (customTheme) {
		// Select theme if a theme name is passed
		if (typeof customTheme !== 'object') {
			customTheme = asc.theme[customTheme || 'Default'];
		}
		
		// Init the custom style element
		if (!this._divCmCustomStyle) {
			this._divCmCustomStyle = document.createElement('style');
			this._divCmCustomStyle.setAttribute('id', 'cmCustomStyle');
		}
		
		this._divCmCustomStyle.innerHTML = this.cssBuilder(customTheme.cssRules, customTheme.generalVariables);
		
		// add style element last in the HEAD
		document.head.appendChild(this._divCmCustomStyle);
	},
	/**
	 * build css string
	 */
	cssBuilder: function (css, variables) {
		let cssSheet = '';
		
		for (let selector in css) {
			// build one rule
			let propertyStr = '',
				cssSettings = css[selector];
			
			for (let property in cssSettings) {
				// replace declared variables
				propertyStr += `${property}:${cssSettings[property].replace(/{{(\w+)}}/g, (m, p1) => p1 in variables ? variables[p1] : m)};`;
			}
			
			cssSheet += `${selector}{${propertyStr}}`;
		}
		
		return cssSheet;
	},
	
	storeThemeChosen: function (themeName) {
		localStorage.setItem('appScriptColor-theme', themeName);
		asc.userTheme = themeName;
	},
	
	menuColorState: false,
	addSubMenuItem: function (domSubMenu, text, callBack) {
		let domItem = document.createElement('div');
		domItem.classList.add('goog-menuitem');
		domItem.classList.add('apps-menuitem');
		
		domItem.innerHTML =
			`<div class="goog-menuitem-content" style="-webkit-user-select: none;">
	<div class="docs-icon goog-inline-block goog-menuitem-icon asc-menu-item-icon" data-theme="${text}" style="-webkit-user-select:none;">
		<div class="docs-icon-img-container docs-icon-img docs-icon-arrow-more" style="-webkit-user-select: none;"></div>
	</div>
	<span class="goog-menuitem-label" style="-webkit-user-select: none;">${text}</span>
</div>`;
		
		domSubMenu.appendChild(domItem);
		
		// add function listeners
		domItem.addEventListener('mouseenter', function () {
			domItem.classList.toggle('goog-menuitem-highlight', true);
		});
		domItem.addEventListener('mouseleave', function () {
			domItem.classList.toggle('goog-menuitem-highlight', false);
		});
		domItem.addEventListener('click', callBack);
	},
	insertMenuButton: function () {
		document.head.insertAdjacentHTML('beforeend', `<style>.asc-menu-item-icon{display: none;}.asc-menu-item-icon-display{display: inherit;}</style>`);
		
		let googleScriptMenu = document.getElementById('docs-menubar');
		// no menu, we quit now
		if (!googleScriptMenu) return;
		
		let menuColor = '<div id="macros-color-menu" class="menu-button goog-control goog-inline-block" style="-webkit-user-select: none;">Colors</div>';
		
		let domMenuColorSub = document.createElement('div');
		domMenuColorSub.classList.add('goog-menu');
		domMenuColorSub.classList.add('goog-menu-vertical');
		domMenuColorSub.classList.add('goog-menu-noaccel');
		domMenuColorSub.classList.add('docs-menu-hide-mnemonics');
		domMenuColorSub.setAttribute('style', 'display: None;');
		
		// add menu item for each theme
		for (let theme in asc.theme) {
			asc.addSubMenuItem(
				domMenuColorSub,
				theme,
				function (theme) {
					asc.useCustomStyle(asc.theme[theme]);
					asc.storeThemeChosen(theme);
					
					domMenuColor.classList.toggle('goog-control-open', false);
					domMenuColorSub.setAttribute('style', 'display: None;');
				}.bind(null, theme),
			);
		}
		
		// insert Menu
		googleScriptMenu.insertAdjacentHTML('beforeend', menuColor);
		// insert SubMenu
		document.body.appendChild(domMenuColorSub);
		
		let domMenuColor = document.getElementById('macros-color-menu'),
			domMenuShield = document.getElementById('docs-menu-shield');
		
		// add similar behaviour then other menu buttons
		domMenuColor.addEventListener('mouseenter', function () {
			domMenuColor.classList.toggle('goog-control-hover', true);
		});
		domMenuColor.addEventListener('mouseleave', function () {
			domMenuColor.classList.toggle('goog-control-hover', false);
		});
		
		// display the menu
		domMenuColor.addEventListener('click', function () {
			
			let domItemIcons = domMenuColorSub.querySelectorAll('.asc-menu-item-icon');
			for (let i = 0; i < domItemIcons.length; i++) {
				domItemIcons[i].classList.toggle('asc-menu-item-icon-display', (domItemIcons[i].getAttribute('data-theme') === asc.userTheme));
			}
			
			domMenuColor.classList.toggle('goog-control-hover', false);
			domMenuColor.classList.toggle('goog-control-open', true);
			
			let menuRect = domMenuColor.getBoundingClientRect();
			
			domMenuColorSub.setAttribute('style',
				`user-select: none;
visibility: visible;
left: ${menuRect.left}px;
top: ${menuRect.bottom}px;`,
			);
			
			domMenuShield.setAttribute('style',
				`left: ${menuRect.left + 1}px;
top: ${menuRect.bottom - 1}px;
width: ${menuRect.width - 2}px;
height: 7px;`,
			);
			
			asc.menuColorState = true;
		});
		
		// Close menu when click event on document
		document.body.addEventListener('click', function (event) {
			if (!asc.menuColorState) return;
			
			for (let i = 0; i < event['path'].length; i++) {
				if (event['path'][i] === domMenuColorSub || event['path'][i] === domMenuColor) return;
			}
			
			domMenuColor.classList.toggle('goog-control-open', false);
			domMenuColorSub.setAttribute('style', 'display: None;');
		});
	},
};
