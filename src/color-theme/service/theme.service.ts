import {defaultTheme, defaultThemes} from '../theme';
import {CssTheme} from '../class/cssTheme';
import {ICssThemeOptions} from '../interface/cssThemeOptions.interface';
import {ICreateThemeFromOptions} from '../interface/createThemeFromOptions.interface';


const CM_CUSTOM_STYLE_ID = 'cmCustomStyle';


class ThemeService {
	
	private _currentTheme: CssTheme;
	private _themesMap: { [themeName: string]: CssTheme } = {};
	private _defaultThemeNames: string[] = defaultThemes.map(theme => {
		this._themesMap[theme.themeName] = theme;
		
		return theme.themeName;
	});
	private _customThemeNames: string[] = [];
	private _callbacks: Set<Function> = new Set();
	private _dom_divCmCustomStyle: HTMLElement = null;
	
	
	get defaultThemeNames(): string[] {
		return this._defaultThemeNames;
	}
	
	get themeNames(): string[] {
		return [
			...this._defaultThemeNames,
			...this._customThemeNames,
		];
	}
	
	get currentTheme(): CssTheme {
		return this._currentTheme;
	}
	
	
	constructor() {
		// Load custom Themes if any
		this._loadCustomThemes();
		
		this.setCurrentTheme(localStorage.getItem('appScriptColor-theme') || 'Darcula');
		
		this._setStyleObserver();
	}
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * Apply chosen theme
	 */
	private _applyTheme(theme: CssTheme): void {
		// Init the custom style element
		if (!this._dom_divCmCustomStyle) {
			this._dom_divCmCustomStyle = document.createElement('style');
			this._dom_divCmCustomStyle.setAttribute('id', CM_CUSTOM_STYLE_ID);
		}
		
		this._dom_divCmCustomStyle.innerHTML = theme.css;
		
		// add style element last in the HEAD
		document.head.appendChild(this._dom_divCmCustomStyle);
	}
	
	/**
	 * One time set up to ensure that our stylesheet will always be the last applied style
	 */
	private _setStyleObserver(): void {
		// create an observer instance to detect <style> insertion
		// to always be the last styleSheet
		const observer = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				for (let item in mutation.addedNodes) {
					const node = mutation.addedNodes[item] as HTMLElement;
					
					// Filter for STYLE elements (other than our styleSheet)
					if (node.tagName !== 'STYLE' || node.id === CM_CUSTOM_STYLE_ID) continue;
					
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
	 * Store custom theme in localStore
	 */
	private _saveCustomThemes(): void {
		const customThemes: { [themeName: string]: ICssThemeOptions } = {};
		
		this._customThemeNames
			.map(themeName => customThemes[themeName] = JSON.parse(this._themesMap[themeName].toJSON()));
		
		localStorage.setItem('appScriptColor-theme-custom', JSON.stringify(customThemes));
	}
	
	/**
	 * Load custom theme from localStore
	 */
	private _loadCustomThemes(): void {
		let customThemes: { [themeName: string]: ICssThemeOptions };
		try {
			customThemes = JSON.parse(localStorage.getItem('appScriptColor-theme-custom') || '{}');
		} catch (e) {
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
	 * Add a theme in internal theme store
	 */
	private _addTheme(theme: CssTheme): void {
		if (this._themesMap[theme.themeName]) return;
		
		this._themesMap[theme.themeName] = theme;
		this._customThemeNames.push(theme.themeName);
		this._customThemeNames.sort((a, b) => b > a ? 1 : a === b ? 0 : -1);
		
		this._notifySubscribers();
	}
	
	
	/**
	 * Call every subscribers callback,
	 * called on theme added or deleted
	 */
	private _notifySubscribers(): void {
		this._callbacks.forEach(callback => callback());
	}
	
	//</editor-fold>
	
	
	/**
	 * Set the current theme
	 *
	 * Calling it will
	 * - update currentTheme value,
	 * - save currentTheme in localStorage
	 * - apply the theme in the DOM
	 */
	public setCurrentTheme(themeName: string): void {
		this._currentTheme = this.getThemeByName(themeName);
		localStorage.setItem('appScriptColor-theme', this._currentTheme.themeName);
		
		this._applyTheme(this._currentTheme);
	}
	
	/**
	 * Find a theme in store by his name
	 */
	public getThemeByName(name: string): CssTheme {
		return this._themesMap[name] || defaultTheme;
	}
	
	
	/**
	 * Duplicate a theme and modify it
	 */
	public createThemeFrom(
		rootTheme: CssTheme,
		{themeName, variables = {}, rules = {}}: ICreateThemeFromOptions,
		saveThemes = true,
	): CssTheme {
		
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
	 * Modify an existing theme
	 *
	 * This function return the theme containing the new edited theme
	 */
	public updateTheme(theme: CssTheme, {themeName, variables = {}, rules = {}}: ICreateThemeFromOptions) {
		if (defaultThemes.includes(theme)) return;
		
		// Remove theme from custom theme
		delete this._themesMap[theme.themeName];
		this._customThemeNames = this._customThemeNames
			.filter(name => name !== theme.themeName);
		
		return this.createThemeFrom(theme, {themeName, variables, rules});
	}
	
	/**
	 * Delete a theme from the custom Theme list
	 */
	public deleteTheme(theme: CssTheme): boolean {
		if (defaultThemes.includes(theme)) return false;
		
		// Remove theme from custom theme
		delete this._themesMap[theme.themeName];
		this._customThemeNames = this._customThemeNames
			.filter(name => name !== theme.themeName);
		
		this._saveCustomThemes();
		this._notifySubscribers();
		
		return true;
	}
	
	
	/**
	 * Add a subscriber to add / delete theme event
	 */
	public subscribe(callback: Function): void {
		this._callbacks.add(callback);
	}
	
	/**
	 * Remove a subscriber to add / delete theme event
	 */
	public unsubscribe(callback: Function): void {
		this._callbacks.delete(callback);
	}
	
}

export const themeService = new ThemeService();
