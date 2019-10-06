import {GasFolder} from './class/gasFolder';
import {GasRoot} from './class/gasRoot';
import {getInfoShown, setInfoShown} from './settings';


export const Folders = {
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
		this.gasStaticRoot = new GasRoot(this.dom.gasFileList, this.saveStaticsFolder);
		
		this.gasStaticRoot.setUpVirtualFolder(this.loadVirtualFolder());
		this.gasStaticRoot.setDeepToggleState(this.loadStaticsFolder());
		
		// Shown by default, but hidden after first display
		setInfoShown({
			...getInfoShown(),
			vFolder: true,
		});
		
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
			localStorage.setItem(`appScriptColor-infoShown`, JSON.stringify(getInfoShown()));
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
		
		infoShown && setInfoShown(infoShown);
	},
	
	
	init: function () {
		this.insertCSS();
		this.waitInitialization();
	}
};
