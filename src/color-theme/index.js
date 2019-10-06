import {defaultTheme, themes} from './theme';

export class ColorTheme {
	
	constructor() {
		this.defaultTheme = 'Darcula';
		this.userTheme = '';
		
		/**
		 * @type {HTMLElement}
		 */
		this._divCmCustomStyle = null;
	}
	
	initColors() {
		// Fetch user pref
		this.userTheme = localStorage.getItem('appScriptColor-theme') || this.defaultTheme;
		
		// inject custom CSS
		this.useCustomStyle(themes[this.userTheme] || defaultTheme);
		
		
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
	
	/**
	 * Apply chosen theme
	 *
	 * @param {CssTheme} theme
	 */
	useCustomStyle(theme) {
		// Init the custom style element
		if (!this._divCmCustomStyle) {
			this._divCmCustomStyle = document.createElement('style');
			this._divCmCustomStyle.setAttribute('id', 'cmCustomStyle');
		}
		
		// noinspection JSUnresolvedVariable
		this._divCmCustomStyle.innerHTML = theme.themeCss;
		
		// add style element last in the HEAD
		document.head.appendChild(this._divCmCustomStyle);
	}
	
	storeThemeChosen(themeName) {
		localStorage.setItem('appScriptColor-theme', themeName);
		this.userTheme = themeName;
	}
	
	applyTheme(themeName) {
		this.useCustomStyle(themeName);
		this.storeThemeChosen(themeName);
	}
	
	getCurrent() {
		return this.userTheme;
	}
}

