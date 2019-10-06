import {GasFolder} from './gasFolder';
import {GasFile} from './gasFile';
import {GasVirtualFolder} from './gasVirtualFolder';
import {CLASS_FOLDER, CLASS_ROOT} from '../constant/className';


export class GasRoot extends GasFolder {
	
	get isRoot() {
		return true;
	}
	
	/**
	 * Init a new root folder
	 *
	 * @param {Node | HTMLElement} insertNode
	 * @param saveCallBack
	 */
	constructor(insertNode, saveCallBack) {
		super('', saveCallBack);
		
		// Update Root classes
		this.dom.main.classList.remove(CLASS_FOLDER);
		this.dom.main.classList.add(CLASS_ROOT);
		
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
			if (node === this.dom.main || node['classList'].contains(CLASS_FOLDER)) continue;
			
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
				currentFolder = currentFolder.getChild(name) || currentFolder.addChild(new GasFolder(name, this._saveCallback));
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
		this.virtualFolder = this.getChild(GasVirtualFolder.NAME) || this.addChild(new GasVirtualFolder(virtualFolders, this._saveCallback));
		
		this._updateChildList(true);
	}
	
}
