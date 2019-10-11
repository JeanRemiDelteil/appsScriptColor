export class ColorTheme {
	
	/**
	 * @param {ThemeService} themeService
	 * @param CustomizeTheme
	 */
	constructor(themeService, CustomizeTheme) {
		this._themeService = themeService;
		this._CustomizeTheme = CustomizeTheme;
		
		this.defaultTheme = 'Darcula';
		this.userTheme = '';
		
		/**
		 * @type {HTMLElement}
		 */
		this._divCmCustomStyle = null;
		
		this.applyTheme = this.applyTheme.bind(this);
		this.customizeTheme = this.customizeTheme.bind(this);
		this.getCurrentThemeName = this.getCurrentThemeName.bind(this);
	}
	
	
	/**
	 * Apply chosen theme
	 *
	 * @param {string} themeName
	 */
	_useCustomStyle(themeName) {
		// Init the custom style element
		if (!this._divCmCustomStyle) {
			this._divCmCustomStyle = document.createElement('style');
			this._divCmCustomStyle.setAttribute('id', 'cmCustomStyle');
		}
		
		const theme = this._themeService.getThemeByName(themeName);
		this._divCmCustomStyle.innerHTML = theme.css;
		
		// add style element last in the HEAD
		document.head.appendChild(this._divCmCustomStyle);
	}
	
	_storeThemeChosen(themeName) {
		localStorage.setItem('appScriptColor-theme', themeName);
		this.userTheme = themeName;
	}
	
	
	init() {
		// Fetch user pref
		this.userTheme = localStorage.getItem('appScriptColor-theme') || this.defaultTheme;
		this._themeService.loadCustomThemes();
		
		// inject custom CSS
		this._useCustomStyle(this.userTheme || this.defaultTheme);
		
		
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
		this._useCustomStyle(themeName);
		this._storeThemeChosen(themeName);
	}
	
	getCurrentThemeName() {
		return this.userTheme;
	}
	
	customizeTheme() {
		// Insert the Custom theme edit Dialog
		// All the logic is this component
		const domCustomizeTheme = document.createElement(this._CustomizeTheme.is);
		domCustomizeTheme.colorTheme = this;
		
		document.body.appendChild(domCustomizeTheme);
	}
}

