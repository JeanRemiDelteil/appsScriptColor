import {defaultTheme, defaultThemes} from '../theme';

class ThemeService {
	
	constructor() {
		/**
		 * @type {Object<CssTheme>}
		 */
		this._themesMap = {};
		
		/**
		 * @type {string[]}
		 */
		this._defaultThemeNames = defaultThemes.map(theme => {
			this._themesMap[theme.themeName] = theme;
			
			return theme.themeName;
		});
		/**
		 * @type {string[]}
		 */
		this._customThemeNames = [];
		
		/**
		 * @type {Set<function>}
		 * @private
		 */
		this._callbacks = new Set();
		
		/**
		 * @type {HTMLElement}
		 * @private
		 */
		this._dom_divCmCustomStyle = null;
		this._divCmCustomStyle_ID = 'cmCustomStyle';
		
		
		// Initialize
		this._loadCustomThemes();
		const currentThemeName = localStorage.getItem('appScriptColor-theme') || 'Darcula';
		
		/**
		 * @type {CssTheme}
		 * @private
		 */
		this.setCurrentTheme(currentThemeName);
		
		this._setStyleObserver();
	}
	
	
	/**
	 * @return {string[]}
	 */
	get defaultThemeNames() {
		return this._defaultThemeNames;
	}
	
	/**
	 * @return {string[]}
	 */
	get themeNames() {
		return [
			...this._defaultThemeNames,
			...this._customThemeNames,
		];
	}
	
	/**
	 * @return {CssTheme}
	 */
	get currentTheme() {
		return this._currentTheme;
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Apply chosen theme
	 *
	 * @param {CssTheme} theme
	 */
	_applyTheme(theme) {
		// Init the custom style element
		if (!this._dom_divCmCustomStyle) {
			this._dom_divCmCustomStyle = document.createElement('style');
			this._dom_divCmCustomStyle.setAttribute('id', this._divCmCustomStyle_ID);
		}
		
		this._dom_divCmCustomStyle.innerHTML = theme.css;
		
		// add style element last in the HEAD
		document.head.appendChild(this._dom_divCmCustomStyle);
	}
	
	/**
	 * one time set up to ensure that our stylesheet will always be the last applied style
	 */
	_setStyleObserver() {
		// create an observer instance to detect <style> insertion
		// to always be the last styleSheet
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				for (let item in mutation.addedNodes) {
					let node = mutation.addedNodes[item];
					
					// Filter for STYLE elements (other than our styleSheet)
					if (node.tagName !== 'STYLE' || node.id === this._divCmCustomStyle_ID) continue;
					
					// Move style node to the end for the HEAD
					document.head.appendChild(this._dom_divCmCustomStyle);
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
	
	
	/**
	 * @private
	 */
	_saveCustomThemes() {
		const customThemes = {};
		
		this._customThemeNames
			.map(themeName => customThemes[themeName] = JSON.parse(this._themesMap[themeName].toJSON()));
		
		localStorage.setItem('appScriptColor-theme-custom', JSON.stringify(customThemes));
	}
	
	/**
	 * @private
	 */
	_loadCustomThemes() {
		// Load custom themes
		let customThemes;
		try {
			customThemes = JSON.parse(localStorage.getItem('appScriptColor-theme-custom') || {});
		}
		catch (e) {
			customThemes = {};
		}
		
		Object.keys(customThemes).forEach(name => {
			const {rootTheme, themeName, variables, rules} = customThemes[name];
			
			this.createThemeFrom(
				this.getThemeByName(rootTheme),
				{themeName, variables, rules},
				false,
			);
		});
	}
	
	/**
	 * @param {CssTheme} theme
	 * @private
	 */
	_addTheme(theme) {
		if (this._themesMap[theme.themeName]) return;
		
		this._themesMap[theme.themeName] = theme;
		this._customThemeNames.push(theme.themeName);
		this._customThemeNames.sort((a, b) => b > a ? 1 : a === b ? 0 : -1);
		
		this._notifySubscribers();
	}
	
	
	/**
	 * @private
	 */
	_notifySubscribers() {
		this._callbacks.forEach(callback => callback());
	}
	
	//</editor-fold>
	
	
	/**
	 * @param {string} themeName
	 */
	setCurrentTheme(themeName) {
		this._currentTheme = this.getThemeByName(themeName);
		localStorage.setItem('appScriptColor-theme', this._currentTheme.themeName);
		
		this._applyTheme(this._currentTheme);
	}
	
	/**
	 * @param {string} name\
	 *
	 * @return {CssTheme}
	 */
	getThemeByName(name) {
		return this._themesMap[name] || defaultTheme;
	}
	
	
	/**
	 * @param {CssTheme} rootTheme
	 * @param {string} themeName
	 * @param {Object<string, string>} variables
	 * @param {Object<string, Object<string, string>>} rules
	 * @param {boolean} saveThemes
	 *
	 * @return {CssTheme}
	 */
	createThemeFrom(rootTheme, {themeName, variables = {}, rules = {}}, saveThemes = true) {
		
		while (rootTheme.rootTheme) {
			const themeObject = rootTheme.toObject();
			
			variables = {
				...themeObject.variables,
				...variables,
			};
			rules = {
				...themeObject.rules,
				...rules,
			};
			
			rootTheme = this.getThemeByName(rootTheme.rootTheme);
		}
		
		
		const newTheme = rootTheme.createFrom({themeName, variables, rules});
		this._addTheme(newTheme);
		
		saveThemes && this._saveCustomThemes();
		
		return newTheme;
	}
	
	/**
	 * @param {CssTheme} theme
	 * @param {string} themeName
	 * @param {Object<string, string>} variables
	 * @param {Object<string, Object<string, string>>} rules
	 */
	updateTheme(theme, {themeName, variables = {}, rules = {}}) {
		if (defaultThemes.includes(theme)) return;
		
		// Remove theme from custom theme
		delete this._themesMap[theme.themeName];
		this._customThemeNames = this._customThemeNames
			.filter(name => name !== theme.themeName);
		
		return this.createThemeFrom(theme, {themeName, variables, rules});
	}
	
	/**
	 * @param {CssTheme} theme
	 */
	deleteTheme(theme) {
		if (defaultThemes.includes(theme)) return;
		
		// Remove theme from custom theme
		delete this._themesMap[theme.themeName];
		this._customThemeNames = this._customThemeNames
			.filter(name => name !== theme.themeName);
		
		this._saveCustomThemes();
		this._notifySubscribers();
	}
	
	
	subscribe(callback) {
		this._callbacks.add(callback);
	}
	
	unsubscribe(callback) {
		this._callbacks.delete(callback);
	}
	
}

export const themeService = new ThemeService();
