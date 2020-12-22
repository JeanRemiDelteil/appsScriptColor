import { CLASS_CHILDLIST, CLASS_FOLDER, CLASS_TITLE, CLASS_TITLE_CONTAINER } from '../constant/className';
import { IFolderStateDictionary } from '../folderState.interface';
import { GasFile } from './gasFile';


export class GasFolder {
	dom: {
		main: HTMLElement,
		title: HTMLElement,
		titleContainer: HTMLElement,
		childList: HTMLElement,
	} = {
		main: null,
		title: null,
		titleContainer: null,
		childList: null,
	};

	parentFolder: GasFolder = null;
	children: Set<GasFile | GasFolder> = new Set();
	opened: boolean = true;

	itemNameMap: Map<string, GasFile | GasFolder> = new Map();

	/**
	 * Init a new folder
	 */
	constructor(public name: string, protected _saveCallback: () => void) {
		this._createDOM();
	}

	get isRoot(): boolean {
		return false;
	}


	//<editor-fold desc="# Private methods">

	/**
	 * Add a child, either a folder or a file
	 */
	addChild<T extends GasFolder | GasFile>(child: T): T {
		this.children.add(child);

		this.itemNameMap.set(child.name, child);

		(
			child instanceof GasFolder
		) && child._setParent(this);

		return child;
	}

	/**
	 * Test if folder got a child with childName
	 * and return it
	 */
	getChild(childName: string): null | GasFile | GasFolder {
		return this.itemNameMap.get(childName) || null;
	}

	/**
	 * Remove a given child from this folder
	 */
	removeChild(child: GasFile | GasFolder): void {
		this.children.delete(child);
		this.itemNameMap.delete(child.name);

		// If child node is valid and in this folder, remove it from current folder
		child.dom?.main?.parentElement && child.dom.main.parentElement === this.dom?.main && this.dom.main.removeChild(child.dom.main);
	}

	/**
	 * Deep sort folder and all subFolders
	 */
	sortAllChildren(): void {
		// Sort itself
		this._sortChildren();

		// Sort subFolders
		this.children.forEach(item => item instanceof GasFolder && item.sortAllChildren());
	}

	// </editor-fold>

	/**
	 * Move all children into current folder dom
	 *
	 * If using deepAssign, all sub-folder will get their children in their dom
	 */
	assignDomChildren(deepAssign: boolean): void {
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
	clearEmptyFolder(): void {
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
	 */
	toggle(open?: boolean): void {
		this.opened = open !== undefined ? open : !this.opened;

		this.dom.main.classList.toggle('asc_old_opened', this.opened);

		// TODO: Set calls to depend on folder root
		// only save if open is not undefined
		open === undefined && this._saveCallback && this._saveCallback();
	}

	/**
	 * @return the whole toggle state tree of all subFolders
	 */
	getDeepToggleState(): IFolderStateDictionary {
		const sub: IFolderStateDictionary = {};

		this.children.forEach(item => item instanceof GasFolder && (
			sub[item.name] = item.getDeepToggleState()[item.name]
		));

		return {
			[this.name]: {
				open: this.opened,
				sub,
			},
		};
	}

	/**
	 * Set state for all sub folder at once
	 */
	setDeepToggleState(state: IFolderStateDictionary): void {
		let folderState = state[this.name];
		if (!folderState) return;

		this.toggle(folderState.open);

		this.children.forEach(item => {
			let subFolderState = folderState.sub[item.name];

			subFolderState && item instanceof GasFolder && item.setDeepToggleState({
				[item.name]: subFolderState,
			});
		});
	}

	/**
	 * @return folder structure as JSON
	 */
	toString(): string {
		let sub: string[] = [];

		this.children.forEach(item => sub.push(item instanceof GasFile
		                                       ? item.name
		                                       : JSON.parse(item.toString()),
		));

		return JSON.stringify({ [this.name]: sub });
	}

	/**
	 * @return folder structure as JSON
	 */
	toJSON(): string {
		return this.toString();
	}

	/**
	 * Create internal dom structure of the Folder
	 */
	protected _createDOM() {
		this.dom.main = document.createElement('div');
		this.dom.main.classList.add(CLASS_FOLDER, 'asc_old_opened');

		this.dom.main.innerHTML = `
<div class="${ CLASS_TITLE_CONTAINER }">
	<div class="asc_old_folderIcon">
		<i class="asc_old_opened material-icons">folder_open</i>
		<i class="asc_old_closed material-icons">folder</i>
	</div>
	<div class="${ CLASS_TITLE }" title="${ this.name }/">${ this.name }</div>
</div>
<div class="${ CLASS_CHILDLIST }"></div>`;

		this.dom.titleContainer = this.dom.main.querySelector(`.${ CLASS_TITLE_CONTAINER }`);
		this.dom.title = this.dom.main.querySelector(`.${ CLASS_TITLE }`);
		this.dom.childList = this.dom.main.querySelector(`.${ CLASS_CHILDLIST }`);

		// Bind toggle listener, avoid passing event argument to toggle() 
		this.dom.titleContainer.addEventListener('click', () => this.toggle());
	}

	/**
	 * Sort internal children list by name A-Z
	 * Sort Folder above File
	 *
	 * @private
	 */
	private _sortChildren() {
		this.children = new Set(Array.from(this.children.values())
			.sort((a, b) => {
				let aIsFile = a instanceof GasFile;
				let bIsFile = b instanceof GasFile;

				return aIsFile !== bIsFile
				       ? aIsFile
				         ? 1
				         : -1
				       : a.name < b.name
				         ? -1
				         : (
					         a.name > b.name
					         ? 1
					         : 0
				         );
			}),
		);
	}

	/**
	 * Set parent folder of this folder
	 */
	private _setParent(parentFolder: GasFolder): GasFolder {
		this.parentFolder = parentFolder;

		return this;
	}

	/**
	 * Cleanly remove any ref this folder could keep
	 *
	 * @private
	 */
	private _destroy() {
		delete this.parentFolder;
		delete this.children;
		delete this.itemNameMap;

		this?.dom?.main?.parentElement && this.dom.main.parentElement.removeChild(this.dom.main);

		delete this.dom.main;
		delete this.dom.title;
		delete this.dom.childList;
	}

}
