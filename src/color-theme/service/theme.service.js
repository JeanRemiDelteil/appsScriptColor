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
	 *
	 * @return {CssTheme}
	 */
	createThemeFrom(rootTheme, {themeName, variables = {}, rules = {}}) {
		return rootTheme.createFrom({themeName, variables, rules});
	}
	
	/**
	 * @param {CssTheme} theme
	 */
	addTheme(theme) {
		if (this._themesMap[theme.themeName]) return;
		
		this._themesMap[theme.themeName] = theme;
		this._customThemeNames.push(theme.themeName);
		this._customThemeNames.sort((a, b) => b > a ? 1 : a === b ? 0 : -1);
		
		this._notifySubscribers();
	}
	
	
	saveCustomThemes() {
		const customThemes = {};
		
		this._customThemeNames
			.map(themeName => customThemes[themeName] = JSON.parse(this._themesMap[themeName].toJSON()));
		
		localStorage.setItem('appScriptColor-theme-custom', JSON.stringify(customThemes));
	}
	
	loadCustomThemes() {
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
			
			this.addTheme(this.createThemeFrom(
				this.getThemeByName(rootTheme),
				{themeName, variables, rules},
			));
		});
	}
	
	
	subscribe(callback) {
		this._callbacks.add(callback);
	}
	
	unsubscribe(callback) {
		this._callbacks.delete(callback);
	}
	
	_notifySubscribers() {
		this._callbacks.forEach(callback => callback());
	}
}

export const themeService = new ThemeService();
