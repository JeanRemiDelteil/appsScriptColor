export class ColorTheme {
	
	/**
	 * @param {ThemeService} themeService
	 */
	constructor(themeService) {
		this._themeService = themeService;
		
		/**
		 * @type {HTMLElement}
		 */
		this._divCmCustomStyle = null;
		
		this.applyTheme = this.applyTheme.bind(this);
	}
	
	
	/**
	 * Apply chosen theme
	 */
	_useCustomStyle() {
		// Init the custom style element
		if (!this._divCmCustomStyle) {
			this._divCmCustomStyle = document.createElement('style');
			this._divCmCustomStyle.setAttribute('id', 'cmCustomStyle');
		}
		
		this._divCmCustomStyle.innerHTML = this._themeService.currentTheme.css;
		
		// add style element last in the HEAD
		document.head.appendChild(this._divCmCustomStyle);
	}
	
	
	init() {
		// inject custom CSS
		this._useCustomStyle();
		
		
		// create an observer instance to detect <style> insertion
		// to always be the last styleSheet
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				for (let item in mutation.addedNodes) {
					let node = mutation.addedNodes[item];
					
					// Filter for STYLE elements (other than our styleSheet)
					if (node.tagName !== 'STYLE' || node.id === 'cmCustomStyle') continue;
					
					// Move style node to the end for the HEAD
					document.head.appendChild(this._divCmCustomStyle);
				}
			});
		});
		
		// pass in the target node, as well as the observer options
		observer.observe(document.head, {
			childList: true,
			attributes: false,
			characterData: false,
		});
	}
	
	applyTheme(themeName) {
		this._themeService.setCurrentTheme(themeName);
		this._useCustomStyle();
	}
	
}

