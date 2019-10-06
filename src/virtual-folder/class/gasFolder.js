import {GasFile} from './gasFile';
import {CLASS_CHILDLIST, CLASS_FOLDER, CLASS_TITLE, CLASS_TITLE_CONTAINER} from '../constant/className';


export class GasFolder {
	
	get isRoot() {
		return false;
	}
	
	
	/**
	 * Init a new folder
	 *
	 * @param {string} name
	 * @param {function} saveCallback
	 */
	constructor(name, saveCallback) {
		this.name = name;
		this._saveCallback = saveCallback;
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
		this.dom.main.classList.add(CLASS_FOLDER, 'asc_opened');
		
		this.dom.main.innerHTML = `
<div class="${CLASS_TITLE_CONTAINER}">
	<div class="asc_folderIcon">
		<i class="asc_opened material-icons">folder_open</i>
		<i class="asc_closed material-icons">folder</i>
	</div>
	<div class="${CLASS_TITLE}" title="${this.name}/">${this.name}</div>
</div>
<div class="${CLASS_CHILDLIST}"></div>`;
		
		this.dom.titleContainer = this.dom.main.querySelector(`.${CLASS_TITLE_CONTAINER}`);
		this.dom.title = this.dom.main.querySelector(`.${CLASS_TITLE}`);
		this.dom.childList = this.dom.main.querySelector(`.${CLASS_CHILDLIST}`);
		
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
		if (this.isRoot || this.children.size) return;
		
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
		open === undefined && this._saveCallback && this._saveCallback();
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
