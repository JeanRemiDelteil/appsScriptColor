import {GasRoot} from './gasRoot';
import {getInfoShown, setInfoShown} from '../data/settings';
import * as uiCssSelector from '../constant/cssSelectors';
import {css} from '../constant/style.css';

export class Folders {
	
	/**
	 * @param {string} key
	 */
	constructor(key) {
		/**
		 * @type {{
		 *   gasProjectFiles: HTMLElement,
		 *   gasFileList: HTMLElement,
		 * }}
		 */
		this.dom = {};
		
		/**
		 * @type {GasRoot}
		 */
		this.gasStaticRoot = null;
		
		this._key = key;
		
		
	}
	
	
	/**
	 * Wait for a specific node to be added in the DOM by the page
	 *
	 * @param {Node} target
	 * @param {string} childSelector
	 *
	 * @return {Promise.<Node>}
	 */
	_setObserver(target, childSelector) {
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
	}
	
	/**
	 * Detect page initialization by App Script, then init Folders,
	 * Entry point
	 */
	_waitInitialization() {
		// Find App script Workspace node
		this._setObserver(document.body, uiCssSelector.workspace)
		// Find App script Resource list node
			.then(node => this._setObserver(node, uiCssSelector.listFile))
			
			// Start adding folders
			.then(node => this._initFolders(node));
	}
	
	/**
	 * Folders CSS sheet
	 */
	_insertCSS() {
		document.head.insertAdjacentHTML('beforeend',
			`
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

${css}
`,
		);
	}
	
	/**
	 * Insert all initial folders if any
	 *
	 * @param {HTMLElement | Node} node
	 */
	_initFolders(node) {
		this._loadInfoShown();
		
		// Init folders
		
		this.dom.gasProjectFiles = node;
		this.dom.gasFileList = node.querySelector(uiCssSelector.listItem);
		
		// Load all static folders
		this.gasStaticRoot = new GasRoot(this.dom.gasFileList, this._saveStaticsFolder);
		
		this.gasStaticRoot.setUpVirtualFolder(this._loadVirtualFolder());
		this.gasStaticRoot.setDeepToggleState(this._loadStaticsFolder());
		
		// Shown by default, but hidden after first display
		setInfoShown({
			...getInfoShown(),
			vFolder: true,
		});
		
		this._saveInfoShown();
	}
	
	
	/**
	 * Save statics folder state
	 * auto-debounce itself
	 */
	_saveStaticsFolder() {
		clearTimeout(this._timeOut_saveStaticFolders);
		
		this._timeOut_saveStaticFolders = setTimeout(() => {
			localStorage.setItem(`appScriptColor-static-Folders-${this._key}`, JSON.stringify(this.gasStaticRoot.getDeepToggleState()));
		}, 500);
	}
	
	/**
	 * Load statics folder state
	 */
	_loadStaticsFolder() {
		let state;
		
		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-static-Folders-${this._key}`));
		}
		catch (e) {
		}
		
		return state || {};
	}
	
	/**
	 * Load virtual folder state
	 *
	 * return {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>}
	 */
	_loadVirtualFolder() {
		let state;
		
		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-Folders-${this._key}`));
		}
		catch (e) {
		}
		
		return state || [];
	}
	
	
	/**
	 * Save all infoPopup shown
	 * auto-debounce itself
	 */
	_saveInfoShown() {
		clearTimeout(this._timeOut_infoShown);
		
		this._timeOut_infoShown = setTimeout(() => {
			localStorage.setItem(`appScriptColor-infoShown`, JSON.stringify(getInfoShown()));
		}, 500);
	}
	
	/**
	 * Load all infoPopup shown
	 */
	_loadInfoShown() {
		let infoShown;
		
		try {
			infoShown = JSON.parse(localStorage.getItem(`appScriptColor-infoShown`));
		}
		catch (e) {
		}
		
		infoShown && setInfoShown(infoShown);
	}
	
	
	init() {
		this._insertCSS();
		this._waitInitialization();
	}
}
