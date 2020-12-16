import { GasRoot } from './class/gasRoot';
import { eventSubFolderChanged } from './constant/event';
import { css } from './constant/style.css';
import { setDomObserver } from './dom-tools';
import { IFolderStateDictionary } from './folderState.interface';


export class Folders {
	private _eventSubFolderChangedAction: () => void;
	private _timeOut_saveStaticFolders: number;

	gasStaticRoot: GasRoot;

	constructor(private _key: string) {
		this._insertCSS();
		this._setupDomObservers();
	}


	/**
	 * Detect page initialization by App Script, then init Folders,
	 * Entry point
	 */
	_setupDomObservers(): void {
		const domFirstRendered = document.body.querySelector('body > div > c-wiz');
		const domWatchedDiv = domFirstRendered.parentElement;
		const dynRefToEditorJsRenderer = domFirstRendered.getAttribute('jsrenderer');

		const onEditorMainDomChanged = (node: HTMLElement) => {
			// Get File list dom element
			const domFileListContainer = node.querySelector('div[jsslot] ul[role="listbox"]') as HTMLElement;

			this._initFolders(domFileListContainer);
		};

		setDomObserver({
			target: domWatchedDiv,
			immediateChildValidator: node => {
				return node.tagName === 'C-WIZ' && node.getAttribute('jsrenderer') === dynRefToEditorJsRenderer;
			},
			callback: onEditorMainDomChanged,
		});

		// the observer does not fire for an existing element
		onEditorMainDomChanged(domFirstRendered as HTMLElement);
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
	_initFolders(domFileList: HTMLElement): void {
		this.gasStaticRoot?.destroy();

		// Set specific style to remove some selection artifact
		domFileList.style.marginBottom = '1px';
		domFileList.parentElement.style.marginBottom = '1px';

		// Load all static folders
		this.gasStaticRoot = new GasRoot(domFileList, () => this._saveStaticsFolder());

		this.gasStaticRoot.setDeepToggleState(this._loadStaticsFolder());

		this._eventSubFolderChangedAction && domFileList.removeEventListener(eventSubFolderChanged, this._eventSubFolderChangedAction);
		this._eventSubFolderChangedAction = () => {
			this.gasStaticRoot.resetList();
			this._initFolders(domFileList);
		};
		domFileList.addEventListener(eventSubFolderChanged, this._eventSubFolderChangedAction);
	}


	/**
	 * Save statics folder state
	 * auto-debounce itself
	 */
	_saveStaticsFolder(): void {
		clearTimeout(this._timeOut_saveStaticFolders);

		this._timeOut_saveStaticFolders = window.setTimeout(() => {
			localStorage.setItem(`appScriptColor-static-Folders-${ this._key }`, JSON.stringify(this.gasStaticRoot.getDeepToggleState()));
		}, 500);
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

	static init(scriptKey: string): Folders {
		return new Folders(scriptKey);
	}
}
