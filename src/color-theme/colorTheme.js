import '../ui-dialog';

export class ColorTheme {
	
	constructor(themes) {
		this._themes = themes;
		
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
		
		// noinspection JSUnresolvedVariable
		this._divCmCustomStyle.innerHTML = this._themes[themeName].themeCss;
		
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
		
		// configuration of the observer:
		const config = {
			childList: true,
			attributes: false,
			characterData: false,
		};
		
		// pass in the target node, as well as the observer options
		//noinspection JSCheckFunctionSignatures
		observer.observe(document.head, config);
	}
	
	applyTheme(themeName) {
		this._useCustomStyle(themeName);
		this._storeThemeChosen(themeName);
	}
	
	getCurrentThemeName() {
		return this.userTheme;
	}
	
	customizeTheme() {
		document.head.insertAdjacentHTML('beforeend', `
<style>
	asc-ui-dialog {
		position: fixed;
		z-index: 1100;
	}
</style>
`);
		console.log(customElements);
		document.body.insertAdjacentHTML('beforeend', `<asc-ui-dialog title="Customize color Themes">YOO</asc-ui-dialog>`);
	}
}

