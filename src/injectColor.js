let asc = {
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


class GasFile {
	
	static get SELECTOR_NAME() {
		return '.name';
	}
	
	static get SELECTOR_ITEM() {
		return '.item';
	}
	
	/**
	 * Init a new file
	 *
	 * @param {Node | Element} node
	 */
	constructor(node) {
		this.dom = {
			main: node,
			name: node.querySelector(GasFile.SELECTOR_NAME),
			item: node.querySelector(GasFile.SELECTOR_ITEM),
		};
		
		this.path = '';
		this.name = '';
		
		this.updatePath();
	}
	
	/**
	 * Set File path (and name) and return if it changed since last update
	 * Update DOM file name and add class with file type
	 *
	 * @return {boolean} true if the path changed since last update
	 */
	updatePath() {
		let path = this.dom.name.getAttribute('title');
		let pathChanged = this.path !== path;
		
		this.path = path;
		this.name = (/([^\/]+)$/.exec(path) || [])[1] || 'error';
		
		// update DOM file name
		this.dom.name.innerHTML = this.name;
		
		// get file type
		this.type = (/\.([^.]+)$/.exec(this.name) || [])[1].replace('gs', 'js') || 'js';
		
		// Set DOM file type
		this.dom.item.classList.add(`file-type-${this.type}`);
		
		return pathChanged;
	}
	
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Call before deleting all link to this file
	 */
	destroy() {
		delete this.dom.main;
	}
	
	
	/**
	 * Return file name
	 */
	toString() {
		return this.name;
	}
	
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Return file name
	 */
	toJSON() {
		return this.toString();
	}
}

class GasFolder {
	
	static get CLASS_FOLDER() {
		return 'asc_Folder';
	}
	
	static get CLASS_TITLE_CONTAINER() {
		return 'asc_titleContainer';
	}
	
	static get CLASS_TITLE() {
		return 'asc_folder_title';
	}
	
	static get CLASS_CHILDLIST() {
		return 'asc_folder_ChildList';
	}
	
	/**
	 * Init a new folder
	 *
	 * @param {string} name
	 */
	constructor(name) {
		this.name = name;
		this.opened = true;
		
		/**
		 * @type {GasFolder}
		 */
		this.parentFolder = null;
		
		/** @type {Set<GasFile | GasFolder>} */
		this.children = new Set();
		/** @type {Map<string, GasFile | GasFolder>} */
		this.itemNameMap = new Map();
		
		/** @type {{
		 *   main: HTMLElement,
		 *   title: HTMLElement,
		 *   titleContainer: HTMLElement,
		 *   childList: HTMLElement,
		 * }} */
		this.dom = {};
		this._createDOM();
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Create internal dom structure of the Folder
	 */
	_createDOM() {
		this.dom.main = document.createElement('div');
		this.dom.main.classList.add(GasFolder.CLASS_FOLDER, 'asc_opened');
		
		this.dom.main.innerHTML =
			`<div class="${GasFolder.CLASS_TITLE_CONTAINER}">
	<div class="asc_folderIcon">
		<i class="asc_opened material-icons">folder_open</i>
		<i class="asc_closed material-icons">folder</i>
	</div>
	<div class="${GasFolder.CLASS_TITLE}" title="${this.name}/">${this.name}</div>
</div>
<div class="${GasFolder.CLASS_CHILDLIST}"></div>`;
		
		this.dom.titleContainer = this.dom.main.querySelector(`.${GasFolder.CLASS_TITLE_CONTAINER}`);
		this.dom.title = this.dom.main.querySelector(`.${GasFolder.CLASS_TITLE}`);
		this.dom.childList = this.dom.main.querySelector(`.${GasFolder.CLASS_CHILDLIST}`);
		
		// Bind toggle listener, avoid passing event argument to toggle() 
		this.dom.titleContainer.addEventListener('click', () => this.toggle());
	}
	
	/**
	 * Sort internal children list by name A-Z
	 * Sort Folder above File
	 *
	 * @private
	 */
	_sortChildren() {
		this.children = new Set(Array.from(this.children.values()).sort((a, b) => {
				let aIsFile = a instanceof GasFile;
				let bIsFile = b instanceof GasFile;
				
				return aIsFile !== bIsFile
					? aIsFile
						? 1
						: -1
					: a.name < b.name
						? -1
						: (a.name > b.name
								? 1
								: 0
						);
			}),
		);
	}
	
	/**
	 * Set parent folder of this folder
	 *
	 * @param {GasFolder} parentFolder
	 *
	 * @return {GasFolder}
	 */
	_setParent(parentFolder) {
		this.parentFolder = parentFolder;
		
		return this;
	}
	
	/**
	 * Cleanly remove any ref this folder could keep
	 *
	 * @private
	 */
	_destroy() {
		delete this.parentFolder;
		delete this.children;
		delete this.itemNameMap;
		
		this.dom.main && this.dom.main.parentElement && this.dom.main.parentElement.removeChild(this.dom.main);
		
		delete this.dom.main;
		delete this.dom.title;
		delete this.dom.childList;
	}
	
	// </editor-fold>
	
	
	/**
	 * Add a child, either a folder or a file
	 *
	 * @param {GasFolder | GasFile} child
	 */
	addChild(child) {
		this.children.add(child);
		
		this.itemNameMap.set(child.name, child);
		
		(child instanceof GasFolder) && child._setParent(this);
		
		return child;
	}
	
	/**
	 * Test if folder got a child with childName
	 * and return it
	 *
	 * @param {string} childName
	 *
	 * @return {null | GasFile | GasFolder}
	 */
	getChild(childName) {
		return this.itemNameMap.get(childName) || null;
	}
	
	/**
	 * Remove a given child from this folder
	 *
	 * @param {GasFile | GasFolder} child
	 */
	removeChild(child) {
		this.children.delete(child);
		this.itemNameMap.delete(child.name);
		
		// If child node is valid and in this folder, remove it from current folder
		child.dom.main && child.dom.main.parentElement === this.dom.main && this.dom.main.removeChild(child.dom.main);
	}
	
	
	/**
	 * Deep sort folder and all subFolders
	 */
	sortAllChildren() {
		// Sort itself
		this._sortChildren();
		
		// Sort subFolders
		this.children.forEach(item => item instanceof GasFolder && item.sortAllChildren());
	}
	
	/**
	 * Move all children into current folder dom
	 *
	 * If using deepAssign, all sub-folder will get their children in their dom
	 *
	 * @param {boolean} deepAssign
	 */
	assignDomChildren(deepAssign) {
		// clear dom children list
		this.dom.childList.innerHTML = '';
		
		this.children.forEach(item => {
			// Append direct child
			this.dom.childList.appendChild(item.dom.main);
			
			// Go through all sub directories
			deepAssign && item instanceof GasFolder && item.assignDomChildren(true);
		});
	}
	
	/**
	 * Remove all empty child folders
	 */
	clearEmptyFolder() {
		// Run in all sub-folders
		this.children.forEach(item => item instanceof GasFolder && item.clearEmptyFolder());
		
		// Now check this folder, if it's not root
		if (this instanceof GasRoot || this.children.size) return;
		
		// Delete this folder from parentFolder
		this.parentFolder && this.parentFolder.removeChild(this);
		
		// Clear this
		this._destroy();
	}
	
	
	/**
	 * Toggle folder open
	 *
	 * @param {boolean} [open]
	 */
	toggle(open) {
		this.opened = open !== undefined ? open : !this.opened;
		
		this.dom.main.classList.toggle('asc_opened', this.opened);
		
		// TODO: Set calls to depend on folder root
		// only save if open is not undefined
		open === undefined && Folders.saveStaticsFolder();
	}
	
	/**
	 * Return the whole toggle state tree of all subFolders
	 */
	getDeepToggleState() {
		let sub = {};
		
		this.children.forEach(item => item instanceof GasFolder && (sub[item.name] = item.getDeepToggleState()[item.name]));
		
		return {
			[this.name]: {
				open: this.opened,
				sub: sub,
			},
		};
	}
	
	/**
	 * Set state for all sub folder at once
	 *
	 * @param {Object} state
	 */
	setDeepToggleState(state) {
		let folderState = state[this.name];
		if (!folderState) return;
		
		this.toggle(folderState.open);
		
		this.children.forEach(item => {
			let subFolderState = folderState.sub[item.name];
			
			subFolderState && item.setDeepToggleState({
				[item.name]: subFolderState,
			});
		});
	}
	
	
	/**
	 * Return folder structure as JSON
	 */
	toString() {
		let sub = [];
		
		this.children.forEach(item => sub.push(item instanceof GasFile
			? item.name
			: JSON.parse(item.toString()),
		));
		
		return JSON.stringify({[this.name]: sub});
	}
	
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Return folder structure as JSON
	 */
	toJSON() {
		return this.toString();
	}
	
}

class GasVirtualFolder extends GasFolder {
	
	static get NAME() {
		return '## Virtual_Folders';
	}
	
	/**
	 * Init the virtual folder
	 * (there should only be one per root folder instance)
	 *
	 * @param {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>} virtualList
	 */
	constructor(virtualList) {
		super(GasVirtualFolder.NAME);
		
		this._processVirtualList(virtualList);
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Create normal folder DOM and add info icon
	 */
	_createDOM() {
		super._createDOM();
		
		this.dom.titleContainer.insertAdjacentHTML('beforeend',
			`<div class="asc_folder_info">
	<i class="material-icons">info</i>
	
	<div class="asc_info_popup ${!Folders.infoShown.vFolder ? 'asc_info_popup-hide' : ''}">
	    Virtual folders are deprecated. They can't be edited.<br><br>
	    To still use folders, rename your files to include the whole path:<br><br>
	    folderName/sub folder/my_fileName
	</div>
</div>`);
		
		this.dom.infoPopup = this.dom.titleContainer.querySelector(`.asc_info_popup`);
		this.dom.infoIcon = this.dom.titleContainer.querySelector(`.asc_folder_info`);
		
		this.dom.infoIcon.addEventListener('click', /**@param {Event} event*/event => {
			this.toggleInfo();
			
			event.preventDefault();
			event.stopPropagation();
		});
		
		this.toggleInfo(!Folders.infoShown.vFolder);
	}
	
	/**
	 * Process virtual folder list to ease file discovery
	 *
	 * @param {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>} virtualList
	 *
	 * @return
	 *
	 * @private
	 */
	_processVirtualList(virtualList) {
		this._vList = new Map();
		
		virtualList.forEach(folder => {
			let currentFolder = this.getChild(folder.name) || this.addChild(new GasFolder(folder.name));
			
			// assign folder to fileName
			folder.files.forEach(file => this._vList.set(file, currentFolder));
		});
	}
	
	//</editor-fold>
	
	
	/**
	 * Check if given file is in a vFolder
	 *
	 * @param {GasFile} file
	 *
	 * @return {boolean}
	 */
	is_vFile(file) {
		return this._vList.has(file.name);
	}
	
	/**
	 * Check if given file is in a vFolder
	 *
	 * @param {GasFile} file
	 *
	 * @return {GasFolder}
	 */
	addFile(file) {
		let folder = this._vList.get(file.name) || null;
		
		folder && folder.addChild(file);
		
		return folder;
	}
	
	/**
	 * Toggle popup info state
	 *
	 * @param {boolean} [state]
	 */
	toggleInfo(state) {
		this._showInfo = state !== undefined ? state : !this._showInfo;
		
		this.dom.infoPopup.classList.toggle('asc_info_popup-hide', !this._showInfo);
	}
	
}

class GasRoot extends GasFolder {
	
	static get CLASS_ROOT() {
		return 'asc_FolderRoot';
	}
	
	/**
	 * Init a new root folder
	 *
	 * @param {Node | HTMLElement} insertNode
	 */
	constructor(insertNode) {
		super('');
		
		// Update Root classes
		this.dom.main.classList.remove(GasFolder.CLASS_FOLDER);
		this.dom.main.classList.add(GasRoot.CLASS_ROOT);
		
		/**
		 * Node that will contain this root Folder
		 *
		 * @type {Node}
		 */
		this.root = null;
		
		/**
		 * Link between files and folder
		 *
		 * @type {Map<GasFile, GasFolder>}
		 * @private
		 */
		this._fileFolderMap = new Map();
		
		/**
		 * All node / GasFile link
		 *
		 * @type {Map<Node, GasFile>}
		 * @private
		 */
		this._fileMap = new Map();
		
		this._setRoot(insertNode);
		this._monitorContainer();
		
		this._updateChildList();
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Set root dom
	 *
	 * @param {Node | HTMLElement} [node]
	 */
	_setRoot(node) {
		if (!node && !this.root) return;
		
		// Store rootNode
		node && (this.root = node);
		
		// Put folder in root dom
		this.root.appendChild(this.dom.main);
		
		return this;
	}
	
	/**
	 * Set up a mutation Observer on the root node to detect GAS UI changes
	 *
	 * @private
	 */
	_monitorContainer() {
		// noinspection JSUnusedLocalSymbols
		/**
		 * @param {MutationRecord[]} mutations
		 */
		let mutationCB = mutations => {
			// Just check on mutation if our root has no parent --> means GAS UI rebuilt file list
			!this.dom.main.parentNode && this._updateChildList();
		};
		
		let observer = new MutationObserver(mutationCB);
		
		// pass in the target node, as well as the observer options
		observer.observe(this.root, {
			childList: true,
			attributes: false,
			characterData: false,
		});
	}
	
	/**
	 * Get all GAS files item with their name
	 *
	 * @return {{
	 *   removed: Map<Node, GasFile>,
	 *   added: Map<Node, GasFile>,
	 *   renamed: Map<Node, GasFile>,
	 * }}
	 */
	_getGasItems() {
		// Duplicate map to detect possibly removed files
		let removedFilesMap = new Map(this._fileMap);
		let addedFilesMap = new Map();
		let renamedFilesMap = new Map();
		
		for (let i = 0, numChildren = this.root.childNodes.length; i < numChildren; i++) {
			/**
			 * @type {HTMLElement | Node}
			 */
			let node = this.root.childNodes[i];
			
			// Skip if it's our folder container node
			if (node === this.dom.main || node['classList'].contains(GasFolder.CLASS_FOLDER)) continue;
			
			// Get file
			let file = this._fileMap.get(node);
			if (!file) {
				file = new GasFile(node);
				
				addedFilesMap.set(node, file);
			}
			else if (file.updatePath()) {
				renamedFilesMap.set(node, file);
			}
			
			// save item
			this._fileMap.set(node, file);
			
			// Remove from deleted file map
			removedFilesMap.delete(node);
		}
		
		// clean fileMap from removed nodes
		removedFilesMap.forEach(file => this._fileMap.delete(file.dom.main));
		
		
		return {
			removed: removedFilesMap,
			added: addedFilesMap,
			renamed: renamedFilesMap,
		};
	}
	
	
	/**
	 * Update root children list
	 *
	 * @param {boolean} [forceUpdate]
	 *
	 * @private
	 */
	_updateChildList(forceUpdate) {
		// Get existing children properties
		let {removed, added, renamed} = !forceUpdate && this._getGasItems() || {
			renamed: new Map(),
			removed: new Map(this._fileMap),
			added: new Map(this._fileMap),
		};
		
		// Quick quit if no changes
		if (!removed.size && !added.size && !renamed.size) {
			this.assignDomChildren(true);
			this._setRoot();
			
			return;
		}
		
		// Renamed nodes
		renamed.forEach(/**@param {GasFile} file */file => {
			added.set(file.dom.main, file);
			removed.set(file.dom.main, file);
		});
		
		// Removed nodes
		removed.forEach(/**@param {GasFile} file */file => {
			// Get file folder
			let folder = this._fileFolderMap.get(file);
			
			// Should never happens
			if (!folder) {
				console.log('** WARNING: NO FOLDER **');
				
				return;
			}
			
			folder.removeChild(file);
			this._fileFolderMap.delete(file);
		});
		
		// Added nodes
		added.forEach(/**@param {GasFile} file */file => {
			// build folders tree needed for this file path
			let currentFolder = this;
			let splitPath = file.path.split('/');
			
			splitPath.forEach((name, i) => {
				// Last name -> file name, add a file in current folder
				if (i === splitPath.length - 1) {
					
					// Check for virtual folder for First level files
					if (this.virtualFolder && currentFolder === this && this.virtualFolder.is_vFile(file)) {
						let folderTarget = this.virtualFolder.addFile(file);
						this._fileFolderMap.set(file, folderTarget);
						
						return;
					}
					
					currentFolder.addChild(file);
					this._fileFolderMap.set(file, currentFolder);
					
					return;
				}
				
				// Init folder && Move down a folder
				currentFolder = currentFolder.getChild(name) || currentFolder.addChild(new GasFolder(name));
			});
		});
		
		// Clear empty node if we removed some
		removed.size && this.clearEmptyFolder();
		
		// Sort all folders at once
		this.sortAllChildren();
		this.assignDomChildren(true);
		
		this._setRoot();
	}
	
	
	//</editor-fold>
	
	
	/**
	 * Add a virtual special folder, for compatibility with the old layer
	 * This new virtual folder will not allow adding new folder, nor moving files between folder
	 *
	 * If a file is in a static folder, it can't be in a virtual folder.
	 * Only first level files can be in virtual folder
	 *
	 * @param {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>} virtualFolders
	 */
	setUpVirtualFolder(virtualFolders) {
		this.virtualFolder = this.getChild(GasVirtualFolder.NAME) || this.addChild(new GasVirtualFolder(virtualFolders));
		
		this._updateChildList(true);
	}
	
}


let Folders = {
	selector: {
		workspace: 'div.workspace',
		listFile: '.resource-list>.project-items-list-wrapper',
		listItem: '.project-items-list',
	},
	/**
	 * @type {{
	 *   gasProjectFiles: HTMLElement,
	 *   gasFileList: HTMLElement,
	 * }}
	 */
	dom: {},
	
	/**
	 * @type {GasRoot}
	 */
	gasStaticRoot: null,
	
	infoShown: {
		vFolder: false,
	},
	
	key: document.location.pathname.match(/\/([^\/]+?)\/edit/)[1],
	
	/**
	 * Wait for a specific node to be added in the DOM by the page
	 *
	 * @param {Node} target
	 * @param {string} childSelector
	 *
	 * @return {Promise.<Node>}
	 */
	setObserver: function (target, childSelector) {
		return new Promise(resolve => {
			
			/**
			 * @param {MutationRecord[]} mutations
			 * @param {MutationObserver} observer
			 */
			function observerCB(mutations, observer) {
				mutations.forEach(mutation => {
					for (let item in mutation.addedNodes) {
						if (!mutation.addedNodes.hasOwnProperty(item)) continue;
						
						let node = mutation.addedNodes[item],
							domChild = node.querySelector(childSelector);
						
						if (!domChild) continue;
						
						// We found the node, stop observing
						observer.disconnect();
						
						resolve(domChild);
					}
				});
			}
			
			let observer = new MutationObserver(observerCB);
			
			// pass in the target node, as well as the observer options
			//noinspection JSCheckFunctionSignatures
			observer.observe(target, {
				childList: true,
				attributes: false,
				characterData: false, /*,
				 subtree: false,
				 attributeOldValue: false,
				 characterDataOldValue: false,
				 attributeFilter: []
				 */
			});
		});
	},
	
	/**
	 * Detect page initialization by App Script, then init Folders,
	 * Entry point
	 */
	waitInitialization: function () {
		// Find App script Workspace node
		this.setObserver(document.body, this.selector.workspace)
		// Find App script Resource list node
			.then(node => this.setObserver(node, this.selector.listFile))
			
			// Start adding folders
			.then(node => this.initFolders(node));
	},
	/**
	 * Folders CSS sheet
	 */
	insertCSS: function () {
		document.head.insertAdjacentHTML('beforeend',
			`
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<style>
	/* Root */
	.asc_FolderRoot>.${GasFolder.CLASS_TITLE_CONTAINER}{
		display: none;
	}
	
	/* Folder */
	.asc_Folder>.${GasFolder.CLASS_TITLE_CONTAINER}{
		display: flex;
		align-items: center;
		
		user-select: none;
		cursor: pointer;
	}
	.asc_Folder>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_folderIcon{
		font-size: 0;
		padding: 5px;
	}
	.asc_Folder>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_folderIcon>.material-icons{
		font-size: 20px;
	}
	
	.asc_Folder>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_closed{
		display: none;
	}
	.asc_Folder:not(.asc_opened)>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_closed{
		display: unset;
	}
	.asc_Folder:not(.asc_opened)>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_opened{
		display: none;
	}
	
	.asc_Folder>.${GasFolder.CLASS_TITLE_CONTAINER} .asc_folder_title {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		flex: auto;
		margin-right: 5px;
		padding: 7px 0;
	}
	
	.asc_Folder>.asc_folder_ChildList {
		margin-left: 20px;
	}
	.asc_Folder:not(.asc_opened)>.asc_folder_ChildList{
		display: none;
	}
	
	.asc_folder_info {
		display: flex;
		padding: 6px;
	}
	.asc_folder_info>i.material-icons {
		font-size: 18px;
	}
	
	/* Popup */
	.asc_info_popup {
		position: fixed;
		margin-left: 24px;
		width: 280px;
		height: 110px;
		padding: 10px;
		z-index: 1000000;
		border: 2px solid;
		border-radius: 3px;
		overflow: auto;
	}
	.asc_info_popup-hide{
		display: none;
	}
	
	
	/* Items */
	.project-items-list .item {
		display: flex;
		align-items: center;
		padding: 0!important;
		border: none!important;
	}
	.project-items-list .item:before {
		content: "insert_drive_file";
		/*noinspection CssNoGenericFontName*/font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 20px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		padding: 5px;
	}
	.project-items-list .item.file-type-js:before {
		content: "description";
	}
	.project-items-list .item.file-type-html:before {
		content: "web";
	}
	.project-items-list .item.file-type-json:before {
		content: "build";
	}
	
	.project-items-list .item img.piece {
		display: none!important;
	}
	.project-items-list .item div.name {
		flex: auto;
		padding: 7px 0!important;
		height: 15px;	}
	.project-items-list .item .dropdown {
		opacity: 0!important;
		margin: 0!important;
		padding: 0!important;
		height: 20px;
		width: 20px;
	}
	.project-items-list .item:after {
		content: "arrow_drop_down";
		/*noinspection CssNoGenericFontName*/font-family: 'Material Icons';
		font-weight: normal;
		font-style: normal;
		font-size: 20px;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		-webkit-font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		margin-right: 4px;
	}
</style>`,
		);
	},
	
	/**
	 * Insert all initial folders if any
	 *
	 * @param {HTMLElement} node
	 */
	initFolders: function (node) {
		this.loadInfoShown();
		
		// Init folders
		
		this.dom.gasProjectFiles = node;
		this.dom.gasFileList = node.querySelector(this.selector.listItem);
		
		// Load all static folders
		this.gasStaticRoot = new GasRoot(this.dom.gasFileList);
		
		this.gasStaticRoot.setUpVirtualFolder(this.loadVirtualFolder());
		this.gasStaticRoot.setDeepToggleState(this.loadStaticsFolder());
		
		// Shown by default, but hidden after first display
		this.infoShown.vFolder = true;
		
		this.saveInfoShown();
	},
	
	
	/**
	 * Save statics folder state
	 * auto-debounce itself
	 */
	saveStaticsFolder: function () {
		clearTimeout(this._timeOut_saveStaticFolders);
		
		this._timeOut_saveStaticFolders = setTimeout(() => {
			localStorage.setItem(`appScriptColor-static-Folders-${Folders.key}`, JSON.stringify(this.gasStaticRoot.getDeepToggleState()));
		}, 500);
	},
	
	/**
	 * Load statics folder state
	 */
	loadStaticsFolder: function () {
		let state;
		
		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-static-Folders-${Folders.key}`));
		}
		catch (e) {
		}
		
		return state || {};
	},
	
	/**
	 * Load virtual folder state
	 *
	 * return {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>}
	 */
	loadVirtualFolder: function () {
		let state;
		
		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-Folders-${Folders.key}`));
		}
		catch (e) {
		}
		
		return state || [];
	},
	
	
	/**
	 * Save all infoPopup shown
	 * auto-debounce itself
	 */
	saveInfoShown: function () {
		clearTimeout(this._timeOut_infoShown);
		
		this._timeOut_infoShown = setTimeout(() => {
			localStorage.setItem(`appScriptColor-infoShown`, JSON.stringify(this.infoShown));
		}, 500);
	},
	
	/**
	 * Load all infoPopup shown
	 */
	loadInfoShown: function () {
		let infoShown;
		
		try {
			infoShown = JSON.parse(localStorage.getItem(`appScriptColor-infoShown`));
		}
		catch (e) {
		}
		
		infoShown && (this.infoShown = infoShown);
	},
	
};
asc.folders = Folders;


//<editor-fold desc="# Boot">

// Don't execute if the current page is not editing the script
if (/\/edit$/.test(document.location.pathname)) {
	window['asc'] = asc;
	
	asc.initColors();
	asc.insertMenuButton();
	
	Folders.insertCSS();
	Folders.waitInitialization();
}

//</editor-fold>
