import { CLASS_FOLDER, CLASS_ROOT } from '../constant/className';
import { IVirtualList } from '../virtualList.interface';
import { GasFile } from './gasFile';
import { GasFolder } from './gasFolder';
import { GasVirtualFolder } from './gasVirtualFolder';


interface IMutatedFile {
	removed: Map<Node, GasFile>;
	added: Map<Node, GasFile>;
	renamed: Map<Node, GasFile>;
}

export class GasRoot extends GasFolder {
	/**
	 * Node that will contain this root Folder
	 */
	root: HTMLElement = null;
	virtualFolder: GasVirtualFolder;
	/**
	 * Link between files and folder
	 */
	private _fileFolderMap: Map<GasFile, GasFolder> = new Map();
	/**
	 * All node / GasFile link
	 */
	private _fileMap: Map<HTMLElement, GasFile> = new Map();

	/**
	 * Init a new root folder
	 */
	constructor(insertNode: HTMLElement, saveCallBack: () => void) {
		super('', saveCallBack);

		// Update Root classes
		this.dom.main.classList.remove(CLASS_FOLDER);
		this.dom.main.classList.add(CLASS_ROOT);

		this._setRoot(insertNode);
		this._monitorContainer();

		this._updateChildList();
	}

	get isRoot() {
		return true;
	}


	//<editor-fold desc="# Private methods">

	/**
	 * Add a virtual special folder, for compatibility with the old layer
	 * This new virtual folder will not allow adding new folder, nor moving files between folder
	 *
	 * If a file is in a static folder, it can't be in a virtual folder.
	 * Only first level files can be in virtual folder
	 */
	setUpVirtualFolder(virtualFolders: IVirtualList[]): void {
		this.virtualFolder = (this.getChild(GasVirtualFolder.NAME) as GasVirtualFolder) || this.addChild(new GasVirtualFolder(virtualFolders, this._saveCallback));

		this._updateChildList(true);
	}

	/**
	 * Set root dom
	 */
	private _setRoot(node?: HTMLElement): void {
		if (!node && !this.root) return;

		// Store rootNode
		node && (this.root = node);

		// Put folder in root dom
		this.root.appendChild(this.dom.main);
	}

	/**
	 * Set up a mutation Observer on the root node to detect GAS UI changes
	 */
	private _monitorContainer(): void {
		const mutationCB: MutationCallback = _mutations => {
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
	 */
	private _getGasItems(): IMutatedFile {
		// Duplicate map to detect possibly removed files
		let removedFilesMap = new Map(this._fileMap);
		let addedFilesMap = new Map();
		let renamedFilesMap = new Map();

		for (let i = 0, numChildren = this.root.childNodes.length; i < numChildren; i++) {
			/**
			 * @type {HTMLElement | Node}
			 */
			let node = this.root.childNodes[i] as HTMLElement;

			// Skip if it's our folder container node
			if (node === this.dom.main || node.classList.contains(CLASS_FOLDER)) continue;

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


	//</editor-fold>

	/**
	 * Update root children list
	 */
	private _updateChildList(forceUpdate?: boolean): void {
		// Get existing children properties
		let { removed, added, renamed } = !forceUpdate && this._getGasItems() || {
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
		renamed.forEach((file: GasFile) => {
			added.set(file.dom.main, file);
			removed.set(file.dom.main, file);
		});

		// Removed nodes
		removed.forEach((file: GasFile) => {
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
		added.forEach((file: GasFile) => {
			// build folders tree needed for this file path
			let currentFolder: GasFolder = this;
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
				currentFolder = (currentFolder.getChild(name) as GasFolder) || currentFolder.addChild(new GasFolder(name, this._saveCallback));
			});
		});

		// Clear empty node if we removed some
		removed.size && this.clearEmptyFolder();

		// Sort all folders at once
		this.sortAllChildren();
		this.assignDomChildren(true);

		this._setRoot();
	}

}
