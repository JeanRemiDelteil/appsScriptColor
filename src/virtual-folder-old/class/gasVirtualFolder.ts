import { GasFolder } from './gasFolder';
import { getInfoShown } from '../data/settings';
import { IVirtualList } from '../virtualList.interface';
import { GasFile } from './gasFile';


export class GasVirtualFolder extends GasFolder {
	dom: {
		main: HTMLElement,
		title: HTMLElement,
		titleContainer: HTMLElement,
		childList: HTMLElement,
		infoPopup: HTMLElement,
		infoIcon: HTMLElement,
	};
	private _showInfo: boolean;
	private _vList: Map<string, GasFolder>;

	/**
	 * Init the virtual folder
	 * (there should only be one per root folder instance)
	 */
	constructor(virtualList: IVirtualList[], saveCallback: () => void) {
		super(GasVirtualFolder.NAME, saveCallback);

		this._processVirtualList(virtualList);
	}

	static get NAME() {
		return '## Virtual_Folders';
	}


	//<editor-fold desc="# Private methods">

	/**
	 * Check if given file is in a vFolder
	 */
	is_vFile(file: GasFile): boolean {
		return this._vList.has(file.name);
	}

	/**
	 * Check if given file is in a vFolder
	 */
	addFile(file: GasFile): GasFolder | null {
		const folder = this._vList.get(file.name) || null;

		folder && folder.addChild(file);

		return folder;
	}

	//</editor-fold>

	/**
	 * Toggle popup info state
	 */
	toggleInfo(state?: boolean): void {
		this._showInfo = state !== undefined ? state : !this._showInfo;

		this.dom.infoPopup.classList.toggle('asc_info_popup-hide', !this._showInfo);
	}

	/**
	 * Create normal folder DOM and add info icon
	 */
	protected _createDOM(): void {
		super._createDOM();

		this.dom.titleContainer.insertAdjacentHTML(
			'beforeend',
			`<div class="asc_folder_info">
	<i class="material-icons">info</i>
	
	<div class="asc_info_popup ${!getInfoShown().vFolder ? 'asc_info_popup-hide' : ''}">
	    Virtual folders are deprecated. They can't be edited.<br><br>
	    To still use folders, rename your files to include the whole path:<br><br>
	    folderName/sub folder/my_fileName
	</div>
</div>`,
		);

		this.dom.infoPopup = this.dom.titleContainer.querySelector(`.asc_info_popup`);
		this.dom.infoIcon = this.dom.titleContainer.querySelector(`.asc_folder_info`);

		this.dom.infoIcon.addEventListener('click', event => {
			this.toggleInfo();

			event.preventDefault();
			event.stopPropagation();
		});

		this.toggleInfo(!getInfoShown().vFolder);
	}

	/**
	 * Process virtual folder list to ease file discovery
	 */
	private _processVirtualList(virtualList: IVirtualList[]): void {
		this._vList = new Map();

		virtualList.forEach(folder => {
			let currentFolder = (this.getChild(folder.name) as GasFolder) || this.addChild(new GasFolder(folder.name, this._saveCallback));

			// assign folder to fileName
			folder.files.forEach(file => this._vList.set(file, currentFolder));
		});
	}

}
