import { EVENT_IDE_DOM_UPDATED } from '../feature-detection';
import { settingsService } from '../storage';
import { GasRoot } from './class/gasRoot';
import { css } from './constant/style.css';
import { EVENT_SUB_FOLDER_CHANGED } from './event';
import { IFolderStateDictionary } from './folderState.interface';


export class Folders {
	private static _folders: Folders;

	private _eventSubFolderChangedAction: () => void;
	private _domFileList: HTMLElement;
	private _timeOut_saveStaticFolders: number;
	private _classRef: string = `asc-folder-style-${ new Date().toISOString() }`;
	private _onDomUpdated: (param: { detail: { node: HTMLElement } }) => void;

	gasStaticRoot: GasRoot;

	constructor(private _key: string) {
		this._insertCSS();
		this._listenForDomUpdate();
	}

	destroy() {
		window.removeEventListener(EVENT_IDE_DOM_UPDATED, this._onDomUpdated);
		this._eventSubFolderChangedAction && this._domFileList?.removeEventListener(EVENT_SUB_FOLDER_CHANGED, this._eventSubFolderChangedAction);

		this.gasStaticRoot?.destroy();
		this.gasStaticRoot = undefined;

		this._cleanInsertedStyle();
	}

	/**
	 * Detect page initialization by App Script, then init Folders,
	 * Entry point
	 */
	private _listenForDomUpdate(): void {
		this._onDomUpdated = ({ detail: { node } }) => {
			// Get File list dom element
			const domFileListContainer = node.querySelector('div[jsslot] ul[role="listbox"]') as HTMLElement;

			// In the event the dom is still not updated for some reason (it happened), re-try at next frame, once.
			if (!domFileListContainer) {
				window.requestAnimationFrame(() => {
					const domFileListContainer = node.querySelector('div[jsslot] ul[role="listbox"]') as HTMLElement;
					domFileListContainer && this._initFolders(domFileListContainer);
				});

				return;
			}

			this._initFolders(domFileListContainer);
		};

		window.addEventListener(EVENT_IDE_DOM_UPDATED, this._onDomUpdated);
	}

	/**
	 * Folders CSS sheet
	 */
	private _insertCSS(): void {
		document.head.insertAdjacentHTML(
			'beforeend',
			`
<link ref-class="${ this._classRef }" href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style ref-class="${ this._classRef }">${ css }</style>
`,
		);
	}

	private _cleanInsertedStyle() {
		const domLink = document.head.querySelector(`link[ref-class="${ this._classRef }"]`);
		const domStyle = document.head.querySelector(`style[ref-class="${ this._classRef }"]`);

		domLink?.parentElement.removeChild(domLink);
		domStyle?.parentElement.removeChild(domStyle);
	}

	/**
	 * Insert all initial folders if any
	 */
	private _initFolders(domFileList: HTMLElement): void {
		this.gasStaticRoot?.destroy();
		if (!domFileList) return;

		// Set specific style to remove some selection artifact
		domFileList.style.marginBottom = '1px';
		domFileList.parentElement.style.marginBottom = '1px';

		// Load all static folders
		this.gasStaticRoot = new GasRoot(domFileList, () => this._saveStaticsFolder());

		this.gasStaticRoot.setDeepToggleState(this._loadStaticsFolder());

		this._eventSubFolderChangedAction && this._domFileList?.removeEventListener(EVENT_SUB_FOLDER_CHANGED, this._eventSubFolderChangedAction);
		this._domFileList = domFileList;

		this._eventSubFolderChangedAction = () => this._initFolders(domFileList);
		domFileList.addEventListener(EVENT_SUB_FOLDER_CHANGED, this._eventSubFolderChangedAction);
	}


	/**
	 * Save statics folder state
	 * auto-debounce itself
	 */
	private _saveStaticsFolder(): void {
		clearTimeout(this._timeOut_saveStaticFolders);

		this._timeOut_saveStaticFolders = window.setTimeout(() => {
			settingsService.setFolderStates(this._key, this.gasStaticRoot.getDeepToggleState());
		}, 500);
	}

	/**
	 * Load statics folder state
	 */
	private _loadStaticsFolder(): IFolderStateDictionary {
		return settingsService.getFolderStates(this._key);
	}


	static init(scriptKey: string): void {
		this._folders = new Folders(scriptKey);
	}

	static destroy(): void {
		this._folders?.destroy();
		this._folders = undefined;
	}
}
