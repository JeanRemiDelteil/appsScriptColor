export class GasFile {
	
	static get SELECTOR_NAME() {
		return '.name';
	}
	
	static get SELECTOR_ITEM() {
		return '.item';
	}
	
	/**
	 * Init a new file
	 *
	 * @param {Node | Element} node
	 */
	constructor(node) {
		this.dom = {
			main: node,
			name: node.querySelector(GasFile.SELECTOR_NAME),
			item: node.querySelector(GasFile.SELECTOR_ITEM),
		};
		
		this.path = '';
		this.name = '';
		
		this.updatePath();
	}
	
	/**
	 * Set File path (and name) and return if it changed since last update
	 * Update DOM file name and add class with file type
	 *
	 * @return {boolean} true if the path changed since last update
	 */
	updatePath() {
		let path = this.dom.name.getAttribute('title');
		let pathChanged = this.path !== path;
		
		this.path = path;
		this.name = (/([^\/]+)$/.exec(path) || [])[1] || 'error';
		
		// update DOM file name
		this.dom.name.innerHTML = this.name;
		
		// get file type
		this.type = (/\.([^.]+)$/.exec(this.name) || [])[1].replace('gs', 'js') || 'js';
		
		// Set DOM file type
		this.dom.item.classList.add(`file-type-${this.type}`);
		
		return pathChanged;
	}
	
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Call before deleting all link to this file
	 */
	destroy() {
		delete this.dom.main;
	}
	
	
	/**
	 * Return file name
	 */
	toString() {
		return this.name;
	}
	
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Return file name
	 */
	toJSON() {
		return this.toString();
	}
}
