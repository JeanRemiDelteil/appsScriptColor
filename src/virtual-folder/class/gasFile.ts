export class GasFile {

	dom: {
		main: HTMLElement,
		name: HTMLElement,
		item: HTMLElement,
	};
	name: string = '';
	path: string = '';
	type: string = '';

	/**
	 * Init a new file
	 */
	constructor(node: HTMLElement) {
		this.dom = {
			main: node,
			name: node.querySelector(GasFile.SELECTOR_NAME),
			item: node.querySelector(GasFile.SELECTOR_ITEM),
		};

		this.updatePath();
	}

	static get SELECTOR_NAME() {
		return '.name';
	}

	static get SELECTOR_ITEM() {
		return '.item';
	}

	/**
	 * Set File path (and name) and return if it changed since last update
	 * Update DOM file name and add class with file type
	 *
	 * @return true if the path changed since last update
	 */
	updatePath(): boolean {
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

	/**
	 * Call before deleting all link to this file
	 */
	destroy(): void {
		delete this.dom.main;
	}


	/**
	 * Return file name
	 */
	toString(): string {
		return this.name;
	}

	/**
	 * Return file name
	 */
	toJSON(): string {
		return this.toString();
	}
}
