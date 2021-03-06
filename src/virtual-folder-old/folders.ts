import { GasRoot } from './class/gasRoot';
import { getInfoShown, setInfoShown } from './data/settings';
import * as uiCssSelector from './constant/cssSelectors';
import { css } from './constant/style.css';
import { IFolderStateDictionary } from './folderState.interface';


export class Folders {

	dom: {
		gasProjectFiles: HTMLElement,
		gasFileList: HTMLElement,
	} = {
		gasProjectFiles: null,
		gasFileList: null,
	};
	gasStaticRoot: GasRoot = null;
	private _timeOut_saveStaticFolders: number;
	private _timeOut_infoShown: number;

	constructor(private _key: string) {
		this._insertCSS();
		this._waitInitialization();
	}


	/**
	 * Wait for a specific node to be added in the DOM by the page
	 */
	_setObserver(target: HTMLElement, childSelector: string): Promise<HTMLElement> {
		return new Promise(resolve => {
			const observerCB: MutationCallback = function (mutations, observer) {
				mutations.forEach(mutation => {
					for (let item in mutation.addedNodes) {
						if (!mutation.addedNodes.hasOwnProperty(item)) continue;

						let node = mutation.addedNodes[item] as HTMLElement;
						let domChild = node.querySelector(childSelector);

						if (!domChild) continue;

						// We found the node, stop observing
						observer.disconnect();

						resolve(domChild as HTMLElement);
					}
				});
			};

			let observer = new MutationObserver(observerCB);

			// pass in the target node, as well as the observer options
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
	_waitInitialization(): void {
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
	_insertCSS(): void {
		document.head.insertAdjacentHTML(
			'beforeend',
			`
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

${ css }
`,
		);
	}

	/**
	 * Insert all initial folders if any
	 */
	_initFolders(node: HTMLElement): void {
		this._loadInfoShown();

		// Init folders
		this.dom.gasProjectFiles = node;
		this.dom.gasFileList = node.querySelector(uiCssSelector.listItem);

		// Load all static folders
		this.gasStaticRoot = new GasRoot(this.dom.gasFileList, this._saveStaticsFolder.bind(this));

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
	_saveStaticsFolder(): void {
		clearTimeout(this._timeOut_saveStaticFolders);

		this._timeOut_saveStaticFolders = setTimeout(() => {
			localStorage.setItem(`appScriptColor-static-Folders-${ this._key }`, JSON.stringify(this.gasStaticRoot.getDeepToggleState()));
		}, 500) as unknown as number;
	}

	/**
	 * Load statics folder state
	 */
	_loadStaticsFolder(): IFolderStateDictionary {
		let state: IFolderStateDictionary;

		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-static-Folders-${ this._key }`));
		} catch (e) {}

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
	private _loadVirtualFolder() {
		let state;

		try {
			state = JSON.parse(localStorage.getItem(`appScriptColor-Folders-${ this._key }`));
		} catch (e) {
		}

		return state || [];
	}


	/**
	 * Save all infoPopup shown
	 * auto-debounce itself
	 */
	private _saveInfoShown(): void {
		clearTimeout(this._timeOut_infoShown);

		this._timeOut_infoShown = setTimeout(() => {
			localStorage.setItem(`appScriptColor-infoShown`, JSON.stringify(getInfoShown()));
		}, 500) as unknown as number;
	}

	/**
	 * Load all infoPopup shown
	 */
	private _loadInfoShown(): void {
		let infoShown;

		try {
			infoShown = JSON.parse(localStorage.getItem(`appScriptColor-infoShown`));
		} catch (e) {}

		infoShown && setInfoShown(infoShown);
	}
}
