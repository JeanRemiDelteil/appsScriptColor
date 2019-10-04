import {GasFolder} from './gasFolder';
import {getInfoShown} from '../settings';


export class GasVirtualFolder extends GasFolder {
	
	static get NAME() {
		return '## Virtual_Folders';
	}
	
	/**
	 * Init the virtual folder
	 * (there should only be one per root folder instance)
	 *
	 * @param {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>} virtualList
	 * @param saveCallback
	 */
	constructor(virtualList, saveCallback) {
		super(GasVirtualFolder.NAME, saveCallback);
		
		this._processVirtualList(virtualList);
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Create normal folder DOM and add info icon
	 */
	_createDOM() {
		super._createDOM();
		
		this.dom.titleContainer.insertAdjacentHTML('beforeend',
			`<div class="asc_folder_info">
	<i class="material-icons">info</i>
	
	<div class="asc_info_popup ${!getInfoShown().vFolder ? 'asc_info_popup-hide' : ''}">
	    Virtual folders are deprecated. They can't be edited.<br><br>
	    To still use folders, rename your files to include the whole path:<br><br>
	    folderName/sub folder/my_fileName
	</div>
</div>`);
		
		this.dom.infoPopup = this.dom.titleContainer.querySelector(`.asc_info_popup`);
		this.dom.infoIcon = this.dom.titleContainer.querySelector(`.asc_folder_info`);
		
		this.dom.infoIcon.addEventListener('click', /**@param {Event} event*/event => {
			this.toggleInfo();
			
			event.preventDefault();
			event.stopPropagation();
		});
		
		this.toggleInfo(!getInfoShown().vFolder);
	}
	
	/**
	 * Process virtual folder list to ease file discovery
	 *
	 * @param {Array<{
	 *   name: string,
	 *   state: boolean,
	 *   files: Array<string>
	 * }>} virtualList
	 *
	 * @return
	 *
	 * @private
	 */
	_processVirtualList(virtualList) {
		this._vList = new Map();
		
		virtualList.forEach(folder => {
			let currentFolder = this.getChild(folder.name) || this.addChild(new GasFolder(folder.name, this._saveCallback));
			
			// assign folder to fileName
			folder.files.forEach(file => this._vList.set(file, currentFolder));
		});
	}
	
	//</editor-fold>
	
	
	/**
	 * Check if given file is in a vFolder
	 *
	 * @param {GasFile} file
	 *
	 * @return {boolean}
	 */
	is_vFile(file) {
		return this._vList.has(file.name);
	}
	
	/**
	 * Check if given file is in a vFolder
	 *
	 * @param {GasFile} file
	 *
	 * @return {GasFolder}
	 */
	addFile(file) {
		let folder = this._vList.get(file.name) || null;
		
		folder && folder.addChild(file);
		
		return folder;
	}
	
	/**
	 * Toggle popup info state
	 *
	 * @param {boolean} [state]
	 */
	toggleInfo(state) {
		this._showInfo = state !== undefined ? state : !this._showInfo;
		
		this.dom.infoPopup.classList.toggle('asc_info_popup-hide', !this._showInfo);
	}
	
}
