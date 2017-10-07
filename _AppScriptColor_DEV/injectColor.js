// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name default.js
// ==/ClosureCompiler==

// TODO: keyboard shortcut to navigate between coding tab
// TODO: custom auto-complete functions list


(function(){
	// quit if the current page is not editing the script
	if (!/https:\/\/script\.google\.com\/.*?\/edit/.test(document.URL)) return;
	
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
					'listItemSelected': '#F5F7FA'
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
					'.editor .code-area .CodeMirror-gutter': {'background-color': '{{codeBackGround}}', 'border-left': '1px solid', 'border-right': '1px solid', 'border-color': '{{border}}'},
					'.editor .code-area .CodeMirror-gutter-text': {'background-color': '{{codeBackGround}}', 'box-shadow': '-1px 0px 0px 0px {{border}}, 1px 0px 0px 0px {{border}}'}, // background des numéros de ligne
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
					'.resource-list .project-items-list .selected, .resource-list .project-items-list .selected:hover': {'background-color': '{{listItemBackground}}', 'color': '{{listItemSelected}}'},
					'.resource-list .project-items-list .focused, .resource-list .project-items-list .item:hover': {'background-color': '{{listItemBackgroundSelected}}', 'color': '{{generalText}}'},
					
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
					
					// CUSTOM Menu folder
					'.asc_FolderAdd': {
						'background-color': '{{codeBackGround}}',
						'border': '1px solid {{border}}'
					},
					'.asc_FolderAdd:hover': {
						'background-color': '{{listItemBackgroundSelected}}'
					},
					'.asc_folder_container': {
						'border-bottom': '5px solid {{border}}'
					},
					'.asc_Folder:not(.asc_folder_closed)':{
						'border-bottom': '5px solid {{border}}'
					}
				}
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
					'listItemSelected': '#bbbbbb'
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
					'.editor .code-area .CodeMirror-gutter': {'background-color': '{{codeBackGround}}', 'border-left': '1px solid', 'border-right': '1px solid', 'border-color': '{{border}}'},
					'.editor .code-area .CodeMirror-gutter-text': {'background-color': '{{codeBackGround}}', 'box-shadow': '-1px 0px 0px 0px {{border}}, 1px 0px 0px 0px {{border}}'}, // background des numéros de ligne
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
					'.resource-list .project-items-list .selected, .resource-list .project-items-list .selected:hover': {'background-color': '{{listItemBackground}}', 'color': '{{listItemSelected}}'},
					'.resource-list .project-items-list .focused, .resource-list .project-items-list .item:hover': {'background-color': '{{listItemBackgroundSelected}}', 'color': '{{generalText}}'},
					
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
					
					// CUSTOM Menu folder
					'.asc_FolderAdd': {
						'background-color': '{{codeBackGround}}',
						'border': '1px solid {{border}}'
					},
					'.asc_FolderAdd:hover': {
						'background-color': '{{listItemBackgroundSelected}}'
					},
					'.asc_folder_container': {
						'border-bottom': '5px solid {{border}}'
					},
					'.asc_Folder:not(.asc_folder_closed)':{
						'border-bottom': '5px solid {{border}}'
					}
				}
			},
			'Default': {
				generalVariables: {
					'codeBackGround': 'white',
					'border': '#D9D9D9',
					'listItemBackgroundSelected': '#f5f5f5'
				},
				cssRules: {
					// CUSTOM Menu folder
					'.asc_FolderAdd': {
						'background-color': '{{codeBackGround}}',
						'border': '1px solid {{border}}'
					},
					'.asc_FolderAdd:hover': {
						'background-color': '{{listItemBackgroundSelected}}'
					},
					'.asc_folder_container': {
						'border-bottom': '5px solid {{border}}'
					},
					'.asc_Folder:not(.asc_folder_closed)':{
						'border-bottom': '5px solid {{border}}'
					}
				}
			}
		},
		userTheme: '',
		
		_divStyle: null,
		
		initColors: function (){
			asc.userTheme = localStorage.getItem('appScriptColor-theme') || asc.defaultTheme;
			
			// create an observer instance to detect
			let observer = new MutationObserver(function (mutations) {
				mutations.forEach(function (mutation) {
					for (let item in mutation.addedNodes) {
						if (!mutation.addedNodes.hasOwnProperty(item)) continue;
						
						let node = mutation.addedNodes[item];
						
						// Filter for the element containing the editor style
						if (node.tagName !== 'STYLE' || node.innerHTML.indexOf('.save-box{') === - 1) continue;
						
						// inject custom CSS
						if (asc.theme[asc.userTheme]){
							asc.useCustomStyle(asc.theme[asc.userTheme]);
						}
						else{
							asc.useCustomStyle('Default');
						}
						
						// stop observing
						observer.disconnect();
					}
				});
			});
			
			// configuration of the observer:
			let config = {
				childList: true,
				attributes: false,
				characterData: false/*,
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
			
			// Init the custom style element
			if (!this._divStyle) {
				this._divStyle = document.createElement('style');
				this._divStyle.setAttribute('id', 'cmCustomStyle');
			}
			
			this._divStyle.innerHTML = this.cssBuilder(customTheme.cssRules, customTheme.generalVariables);
			
			// add style element last in the HEAD
			document.head.appendChild(this._divStyle);
		},
		/**
		 * build css string
		 */
		cssBuilder: function (css, variables) {
			let cssSheet = '';
			
			for (let selector in css){
				// build one rule
				let propertyStr = '',
					cssSettings = css[selector];
				
				for (let property in cssSettings){
					// replace declared variables
					propertyStr += `${ property }:${ cssSettings[property].replace(/{{(\w+)}}/g, (m, p1) => p1 in variables ? variables[p1] : m) };`;
				}
				
				cssSheet += `${selector}{${propertyStr}}`;
			}
			
			return cssSheet;
		},
		
		storeThemeChosen: function(themeName){
			localStorage.setItem('appScriptColor-theme', themeName);
			asc.userTheme = themeName;
		},
		
		menuColorState: false,
		addSubMenuItem: function(domSubMenu, text, callBack){
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
			domItem.addEventListener('mouseenter', function(){
				domItem.classList.toggle('goog-menuitem-highlight', true);
			});
			domItem.addEventListener('mouseleave', function(){
				domItem.classList.toggle('goog-menuitem-highlight', false);
			});
			domItem.addEventListener('click', callBack);
		},
		insertMenuButton: function(){
			//noinspection CssUnusedSymbol
			document.head.insertAdjacentHTML('beforeEnd', `<style>.asc-menu-item-icon{display: none;}.asc-menu-item-icon-display{display: inherit;}</style>`);
			
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
			for (let theme in asc.theme){
				asc.addSubMenuItem(
					domMenuColorSub,
					theme,
					function(theme){
						asc.useCustomStyle(asc.theme[theme]);
						asc.storeThemeChosen(theme);
						
						domMenuColor.classList.toggle('goog-control-open', false);
						domMenuColorSub.setAttribute('style', 'display: None;');
					}.bind(null, theme)
				);
			}
			
			// insert Menu
			googleScriptMenu.insertAdjacentHTML('beforeEnd', menuColor);
			// insert SubMenu
			document.body.appendChild(domMenuColorSub);
			
			let domMenuColor = document.getElementById('macros-color-menu'),
				domMenuShield = document.getElementById('docs-menu-shield');
			
			// add similar behaviour then other menu buttons
			domMenuColor.addEventListener('mouseenter', function(){
				domMenuColor.classList.toggle('goog-control-hover', true);
			});
			domMenuColor.addEventListener('mouseleave', function(){
				domMenuColor.classList.toggle('goog-control-hover', false);
			});
			
			// display the menu
			domMenuColor.addEventListener('click', function(){
				
				let domItemIcons = domMenuColorSub.querySelectorAll('.asc-menu-item-icon');
				for (let i = 0; i < domItemIcons.length; i++){
					domItemIcons[i].classList.toggle('asc-menu-item-icon-display', (domItemIcons[i].getAttribute('data-theme') === asc.userTheme));
				}
				
				domMenuColor.classList.toggle('goog-control-hover', false);
				domMenuColor.classList.toggle('goog-control-open', true);
				
				let menuRect = domMenuColor.getBoundingClientRect();
				
				domMenuColorSub.setAttribute('style',
`user-select: none;
visibility: visible;
left: ${menuRect.left}px;
top: ${menuRect.bottom}px;`
				);
				
				domMenuShield.setAttribute('style',
`left: ${menuRect.left + 1}px;
top: ${menuRect.bottom - 1}px;
width: ${menuRect.width - 2}px;
height: 7px;`
				);
				
				asc.menuColorState = true;
			});
			
			// Close menu when click event on document
			document.body.addEventListener('click', function(event){
				if (!asc.menuColorState) return;
				
				for (let i = 0; i < event['path'].length; i++){
					if (event['path'][i] === domMenuColorSub || event['path'][i] === domMenuColor) return;
				}
				
				domMenuColor.classList.toggle('goog-control-open', false);
				domMenuColorSub.setAttribute('style', 'display: None;');
			});
			
			
			/*
			 // we will use the menu shield to monitor menu state
			 // create an observer instance
			 var observer = new MutationObserver(function (mutations) {
			 mutations.forEach(function (mutation) {
			 if ((mutation.target.style.display == 'none' && domMenuColor.classList.contains('goog-control-open') && asc.onItem == false)) || mutation.target.style.left !=
			 (domMenuColor.getBoundingClientRect().left+1).toString() + 'px'){
			 domMenuColor.classList.toggle('goog-control-open', false);
			 domMenuColorSub.setAttribute('style', 'display: None;');
			 }
			 });
			 });
			 
			 // configuration of the observer:
			 var config = {
			 childList: true,
			 attributes: true,
			 characterData: false,
			 //subtree: false,
			 //attributeOldValue: false,
			 //characterDataOldValue: false,
			 attributeFilter: ['style']
			 };
			 
			 // pass in the target node, as well as the observer options
			 //noinspection JSCheckFunctionSignatures
			 observer.observe(domMenuShield, config);
			 */
		}
	};
	
	asc.folders = {
		selector: {
			workspace: 'div.workspace',
			listFile: '.resource-list>.project-items-list-wrapper',
			listItem: '.project-items-list'
		},
		
		DOMcontainerFolder: document.createElement('div'),
		folderList: [],
		itemMap: {},
		key: document.location.pathname.match(/\/([^\/]+?)\/edit/)[1],
		
		/**
		 * @param {HTMLElement} node
		 */
		addFolders: function(node){
			var self = asc.folders;
			
			self.DOMcontainerFolder.classList.add('asc_folder_container');
			
			self.DOMlistFile = node;
			self.DOMlist = node.querySelector(self.selector.listItem);
			
			self.DOMlistFile.addEventListener('drop', self.onItemDrop);
			self.DOMlistFile.addEventListener('dragover', self.onItemDragOver);
			
			var DOMfolderCreateButton = document.createElement('div');
			DOMfolderCreateButton.classList.add('asc_FolderAdd_container');
			
			DOMfolderCreateButton.innerHTML = '<div class="asc_FolderAdd">New Folder</div>';
			DOMfolderCreateButton.querySelector('.asc_FolderAdd').addEventListener('click', function(){
				self.createDialog('Create Folder', 'Enter new folder name', '', self.addNewFolder);
			});
			
			// insert Menu button
			self.DOMlistFile.insertBefore(DOMfolderCreateButton, self.DOMlistFile.firstChild);
			
			// add observer to detect list rebuild
			
			/**
			 * @param {MutationRecord[]} mutations
			 * @param {MutationObserver} observer
			 */
			function mutationCB(mutations, observer) {
				mutations.forEach(function (mutation) {
					for (var item in mutation.removedNodes) {
						if (!mutation.removedNodes.hasOwnProperty(item)) continue;
						
						/**
						 * @type {HTMLElement}
						 */
						var node = mutation.removedNodes[item];
						if (node.classList.contains('asc_folder_container')){
							self.rebuildFolderList(true);
							break;
						}
					}
				});
			}
			
			var observer = new MutationObserver(mutationCB);
			
			// pass in the target node, as well as the observer options
			//noinspection JSCheckFunctionSignatures
			observer.observe(self.DOMlist, {
				childList: true,
				attributes: false,
				characterData: false/*,
				 subtree: false,
				 attributeOldValue: false,
				 characterDataOldValue: false,
				 attributeFilter: []
				 */
			});
			
			self.restoreFolder();
		},
		
		setObserver: function (target, childSelector, callBack) {
			
			/**
			 * @param {MutationRecord[]} mutations
			 * @param {MutationObserver} observer
			 */
			function observerCB (mutations, observer) {
				mutations.forEach(function (mutation) {
					for (var item in mutation.addedNodes) {
						if (!mutation.addedNodes.hasOwnProperty(item)) continue;
						
						var node = mutation.addedNodes[item],
							DOMchild = node.querySelector(childSelector);
						
						if (DOMchild){
							// stop observing
							observer.disconnect();
							
							callBack(DOMchild);
						}
					}
				});
			}
			
			var observer = new MutationObserver(observerCB);
			
			// pass in the target node, as well as the observer options
			//noinspection JSCheckFunctionSignatures
			observer.observe(target, {
				childList: true,
				attributes: false,
				characterData: false/*,
				 subtree: false,
				 attributeOldValue: false,
				 characterDataOldValue: false,
				 attributeFilter: []
				 */
			});
		},
		addMenuObserver: function () {
			var self = asc.folders;
			
			var cbFindResourceList = function (node) {
				// console.log('FOUND : %o', node);
				
				self.addFolders(node);
			};
			
			var cbFindWorspace = function (node) {
				// console.log('FOUND : %o', node);
				self.setObserver(node, self.selector.listFile, cbFindResourceList);
			};
			
			self.setObserver(document.body, self.selector.workspace, cbFindWorspace);
		},
		insertCSS: function(){
			document.head.insertAdjacentHTML('beforeEnd', '\
<style>\
	.asc_FolderAdd_container {\
		padding: 8px;\
		text-align: center;\
	}\
	.asc_FolderAdd {\
		padding: 5px;\
		text-overflow: ellipsis;\
		overflow: hidden;\
		white-space: nowrap;\
	}\
	.asc_folder_container{\
		padding-bottom: 10px;\
	}\
	.asc_Folder>div.item {\
		overflow: hidden;\
		white-space: nowrap;\
		text-overflow: ellipsis;\
		padding-left: 10px!important;\
	}\
	.asc_folder_ChildList{\
		transition: max-height 500ms;\
		overflow: hidden;\
		position: relative;\
	}\
	.asc_Folder.asc_folder_closed>.asc_folder_ChildList{\
		max-height: 0;\
	}\
	.asc_Folder:not(.asc_folder_closed)>.asc_folder_ChildList{\
		max-height: 1000px;\
	}\
	.asc_Folder.asc_folder_closed>.item::before {\
		content: "+	";\
		font-family: monospace;\
	}\
	.asc_Folder:not(.asc_folder_closed)>.item::before {\
		content: "-	";\
		font-family: monospace;\
	}\
	.asc_Folder:not(.asc_folder_closed){\
		padding-bottom: 5px;\
	}\
	.asc_glass-panel{\
		opacity: 1!important;\
		background-color: rgba(153, 153, 153, 0.4);\
		position: fixed;\
		top: 0;\
		bottom: 0;\
		left: 0;\
		right: 0;\
		z-index: 1050;\
		display: flex;\
		}\
	.asc_Dialog{\
		margin: auto;\
	}\
	.asc_popMenu{\
		position: absolute;\
		right: 0;\
	}\
	.asc_popMenu .gwt-MenuItem:hover {\
		background-color: #efefef;\
	}\
</style>'
			);
		},
		
		dragDropNode: undefined,
		onItemDrag: function(event){
			self.dragDropNode = event.currentTarget;
		},
		onItemDrop: function(event){
			var node = event.currentTarget,
				i;
			
			var label = self.dragDropNode.getAttribute('aria-label');
			
			// find the child in case it was in another folder
			if (self.dragDropNode.parentFolder){
				var folder = self.dragDropNode.parentFolder.folder;
				for (i = 0; i < folder.childList.length; i++){
					if (folder.childList[i] == label){
						folder.childList.splice(i, 1);
						
						//console.log('found in %o', self.dragDropNode.parentFolder);
						break;
					}
				}
			}
			
			// back in the main item list
			if (node == asc.folders.DOMlistFile){
				asc.folders.DOMlist.appendChild(self.dragDropNode);
				
				self.dragDropNode.parentFolder = undefined;
			}
			else{
				// add item to folder list
				node.folder.childList.push(label);
				
				// add folder to item parentFolder
				self.dragDropNode.parentFolder = node;
				
				// move item node to folder
				node.folder.domChildList.appendChild(self.dragDropNode);
			}
			
			asc.folders.saveFolder();
			event.cancelBubble = true;
		},
		onItemDragOver: function(event){
			event.preventDefault();
		},
		
		toggleFolder: function (event) {
			for (var i = 0; i < event.path.length; i++){
				if (event.path[i].isCreatingPopMenu || event.path[i].classList && event.path[i].classList.contains('asc_folder_ChildList')){
					return;
				}
			}
			
			var childList = event.currentTarget.querySelector('.asc_folder_ChildList');
			
			if (!event.currentTarget.classList.contains('asc_folder_closed')){
				childList.style.maxHeight = 'initial';
				var rect = childList.getBoundingClientRect();
				childList.style.maxHeight = '' + rect.height + 'px';
				childList.getBoundingClientRect();
				childList.style.maxHeight = '';
			}
			else{
				childList.style.maxHeight = 'initial';
				rect = childList.getBoundingClientRect();
				childList.style.maxHeight = '';
				childList.getBoundingClientRect();
				childList.style.maxHeight = '' + rect.height + 'px';
			}
			event.currentTarget.classList.toggle('asc_folder_closed');
			
			asc.folders.saveFolder();
		},
		
		newFolder: function(name){
			if (!name) return;
			var self = asc.folders;
			
			var DOMnewFolder = document.createElement('div');
			
			DOMnewFolder.classList.add('asc_Folder');
			DOMnewFolder.innerHTML = '\
<div class="item">\
	<div class="gwt-Label piece name">' + name + '</div>\
	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAG0lEQVR42mOIjIz8jwszgABOCRjAKYGsAJkPAKT/IKHcRfUJAAAAAElFTkSuQmCC" width="7" height="4" class="gwt-Image dropdown" role="button" aria-label="More options" tabindex="0">\
</div>\
<div class="asc_folder_ChildList"></div>';
			
			DOMnewFolder.addEventListener('drop', self.onItemDrop);
			DOMnewFolder.addEventListener('dragover', self.onItemDragOver);
			
			DOMnewFolder.querySelector('img.dropdown').addEventListener('click', function(event){
				var parent = DOMnewFolder.querySelector('.item');
				
				parent.isCreatingPopMenu = true;
				self.popMenu(parent);
			});
			
			DOMnewFolder.addEventListener('drop', self.onItemDrop);
			DOMnewFolder.addEventListener('dragover', self.onItemDragOver);
			DOMnewFolder.addEventListener('click', self.toggleFolder);
			
			
			/**
			 * @param {MutationRecord[]} mutations
			 * @param {MutationObserver} observer
			 */
			function observerCB (mutations, observer) {
				mutations.forEach(function (mutation) {
					var item,
						reCalculateHeight = 0;
					
					for (item in mutation.addedNodes) {
						if (!mutation.addedNodes.hasOwnProperty(item)) continue;
						
						reCalculateHeight += mutation.addedNodes[item].getBoundingClientRect().height;
					}
					for (item in mutation.removedNodes) {
						if (!mutation.removedNodes.hasOwnProperty(item)) continue;
						
						reCalculateHeight -= mutation.removedNodes[item].getBoundingClientRect().height;
					}
					
					if (reCalculateHeight){
						var max = parseInt(mutation.target.style.maxHeight) + reCalculateHeight;
						mutation.target.style.maxHeight = max + 'px';
					}
				});
			}
			
			var observer = new MutationObserver(observerCB);
			
			// pass in the target node, as well as the observer options
			//noinspection JSCheckFunctionSignatures
			observer.observe(DOMnewFolder.querySelector('.asc_folder_ChildList'), {
				childList: true,
				attributes: false,
				characterData: false/*,
				 subtree: false,
				 attributeOldValue: false,
				 characterDataOldValue: false,
				 attributeFilter: []
				 */
			});
			
			
			return DOMnewFolder;
		},
		addNewFolder: function (name){
			var self = asc.folders;
			
			var DOMnewFolder = self.newFolder(name);
			
			self.folderList.push({
				name: name,
				dom: DOMnewFolder,
				domChildList: DOMnewFolder.querySelector('.asc_folder_ChildList'),
				childList: [],
				position: self.folderList.length
			});
			
			self.rebuildFolderList();
		},
		rebuildFolderList: function(state){
			console.log('REBUILD');
			
			var self = asc.folders,
				node, i, j;
			
			// set existing children properties
			for (i = 0; i < self.DOMlist.childNodes.length; i++){
				/**
				 * @type {HTMLElement}
				 */
				node = self.DOMlist.childNodes[i];
				if (node.classList.contains('asc_folder_container')) continue;
				
				var label = node.getAttribute('aria-label');
				if (self.itemMap[label] && self.itemMap[label] != node){
					self.itemMap[label].remove();
				}
				self.itemMap[label] = node;
				
				node.setAttribute('draggable', 'true');
				node.addEventListener('dragstart', self.onItemDrag);
			}
			
			self.folderList.sort(function(a, b){
				return a.position - b.position;
			});
			
			self.DOMlist.insertBefore(self.DOMcontainerFolder, self.DOMlist.firstChild);
			for (i = self.folderList.length - 1; i >= 0; i--){
				node = self.folderList[i].dom;
				if(self.DOMcontainerFolder.firstChild){
					self.DOMcontainerFolder.insertBefore(node, self.DOMcontainerFolder.firstChild);
				}
				else{
					self.DOMcontainerFolder.appendChild(node);
				}
				
				node.folder = self.folderList[i];
				
				for (j = 0; j < self.folderList[i].childList.length; j++){
					var item = self.itemMap[self.folderList[i].childList[j]];
					
					if (!item || (item.parentNode != self.DOMlist && state)){
						self.folderList[i].childList.splice(j, 1);
						item.remove();
						
						j--;
						continue;
					}
					
					item.parentFolder = node;
					node.folder.domChildList.appendChild(item);
				}
			}
			
			self.saveFolder();
		},
		
		saveFolder: function () {
			var self = asc.folders,
				save = [], child,
				i, j;
			
			for (i = 0; i < self.folderList.length; i++){
				
				// establish child item list
				child = [];
				for (j = 0; j < self.folderList[i].childList.length; j++){
					child.push(self.folderList[i].childList[j]);
				}
				
				save.push({
					n: self.folderList[i].name,
					c: child,
					s: self.folderList[i].dom.classList.contains('asc_folder_closed')
				});
			}
			
			localStorage.setItem('appScriptColor-Folders-' + asc.folders.key, JSON.stringify(save));
		},
		restoreFolder: function(){
			var self = asc.folders,
				folders = localStorage['appScriptColor-Folders-' + asc.folders.key],
				i, j, DOMnewFolder,
				children = {};
			
			if (!folders) return;
			folders = JSON.parse(folders);
			
			// build map of children
			for (i = 0; i < self.DOMlist.childNodes.length; i++){
				if (!self.DOMlist.childNodes[i].classList.contains('asc_folder_container')){
					children[self.DOMlist.childNodes[i].getAttribute('aria-label')] = self.DOMlist.childNodes[i];
				}
			}
			
			for (i = 0; i < folders.length; i++){
				
				/**
				 * @type {HTMLElement}
				 */
				DOMnewFolder = self.newFolder(folders[i].n);
				
				var DOMFolderchildList = DOMnewFolder.querySelector('.asc_folder_ChildList');
				DOMnewFolder.classList.toggle('asc_folder_closed', folders[i].s);
				if (!folders[i].s) DOMFolderchildList.style.maxHeight = '0px';
				
				var childList = [];
				// rebuild whole child list
				for (j = 0; j < folders[i].c.length; j++){
					var child = children[folders[i].c[j]];
					if (!child) continue;
					
					childList.push(folders[i].c[j]);
				}
				
				self.folderList.push({
					name: folders[i].n,
					dom: DOMnewFolder,
					domChildList: DOMFolderchildList,
					childList: childList,
					position: self.folderList.length
				});
				
			}
			
			// rebuild all list !
			self.rebuildFolderList(true);
		},
		
		createDialog: function (title, message, defaultValue, callBack_OK) {
			var self = asc.folders,
				DOMdialog = document.createElement('div');
			
			defaultValue = defaultValue || '';
			
			DOMdialog.classList.add('glass_panel', 'asc_glass-panel');
			DOMdialog.innerHTML = '\
<div class="asc_Dialog maestro-dialog">\
	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAA6UlEQVR42oWRywqCUBCGzwNFm8BF0AWCNj2I+4M3vG/EoGfoPaS1tTJtIRkUFK16hyD7J05iKnTgZ5yZby6ewxiOrusJJLOOYxiGj1zEamAJHZEY1EFN02aIX6EXcQTLCN6pAPZgWZZEoG3bc/gn0SivJuNjDJ1VVS0dx0nDMFzDFuQjvkeR9LMbEhN02wEq0b10XZfspgV+j+/7K4I55x/Y8zzeCWLcAp1SgkkEm6YZ46enLRDBm9g5DoJgiZUysXNeFYh7fIjb2GJ0n+IoGsHPxG1ciKOukQgkiqL0GhOHUAE9mw/z9wXfJTmqxGHESosAAAAASUVORK5CYII=" width="11" height="11" class="gwt-Image dialog-close-image" role="button" tabindex="0" aria-label="Close">\
	<div class="Caption">'+ title +'</div>\
	<div class="rename-box">\
		<div class="asc_Dialog_input panel">\
			<div class="gwt-Label rename-label">'+ message +'</div>\
			<input class="gwt-TextBox rename-input" value="'+ defaultValue +'"/>\
		</div>\
	</div>\
	<div class="buttons">\
		<button class="gwt-Button asc_ok">OK</button>\
		<button class="gwt-Button asc_cancel">Cancel</button>\
	</div>\
</div>';
			
			function close(){
				DOMdialog.remove();
			}
			
			var DOM_OK = DOMdialog.querySelector('.asc_ok'),
				DOM_Cancel = DOMdialog.querySelector('.asc_cancel');
			
			DOMdialog.querySelector('.rename-input').addEventListener('keydown', function(event){
				if (event.defaultPrevented) {
					return; // Should do nothing if the key event was already consumed.
				}
				
				if (event.code == 'Enter'){
					DOM_OK.click();
				}
				else if (event.code == 'Escape'){
					DOM_Cancel.click();
				}
			});
			
			DOM_OK.addEventListener('click', function () {
				callBack_OK(DOMdialog.querySelector('.rename-input').value);
				close();
			});
			DOM_Cancel.addEventListener('click', close);
			DOMdialog.querySelector('.dialog-close-image').addEventListener('click', close);
			
			document.body.appendChild(DOMdialog);
			DOMdialog.querySelector('.rename-input').focus();
		},
		popMenu: function (parent) {
			var self = asc.folders;
			
			var DOMpopMenu = document.createElement('div');
			DOMpopMenu.classList.add('resource-context-menu', 'asc_popMenu');
			
			DOMpopMenu.innerHTML = '\
<div class="gwt-MenuItem asc_menu_Rename">Rename</div>\
<div class="gwt-MenuItem asc_menu_Delete">Delete</div>\
';
			
			function close(){
				if (parent.isCreatingPopMenu){
					parent.isCreatingPopMenu = false;
					return;
				}
				DOMpopMenu.remove();
				document.removeEventListener('click', close);
			}
			
			function click(event){
				event.cancelBubble = true;
			}
			
			document.addEventListener('click', close);
			DOMpopMenu.addEventListener('click', function (event){
				event.cancelBubble = true;
			});
			DOMpopMenu.querySelector('.asc_menu_Rename').addEventListener('click', function (){
				self.createDialog('Rename Folder', 'Enter new folder name', parent.parentNode.folder.name, function(name){
					if (name){
						parent.parentNode.folder.name = name;
						parent.querySelector('.gwt-Label').innerHTML = name;
						
						self.saveFolder();
					}
				});
				
				close();
			});
			DOMpopMenu.querySelector('.asc_menu_Delete').addEventListener('click', function (){
				for (var i = 0; i < self.folderList.length; i++){
					if (self.folderList[i] == parent.parentNode.folder){
						self.folderList.splice(i, 1);
						
						// move all child node back
						var node = parent.parentNode.querySelector('.asc_folder_ChildList');
						if (node){
							for (var j = node.childNodes.length - 1; j > -1; j--){
								self.DOMlist.appendChild(node.childNodes[j]);
							}
						}
						
						parent.parentNode.remove();
						
						self.rebuildFolderList();
						
						break;
					}
				}
				
				close();
			});
			
			parent.appendChild(DOMpopMenu);
		}
	};
	
	
	asc.initColors();
	asc.insertMenuButton();
	
	asc.folders.insertCSS();
	asc.folders.addMenuObserver();
	
	//window['appScriptColor'] = asc;
	window['asc'] = asc;
})();
