import { detectIde, IdeVersion } from '../../feature-detection';
import { CssTheme } from '../class/cssTheme';
import { ICreateThemeFromOptions, ICssThemeOptions, IMonacoTheme } from '../interface';
import { darculaTheme, defaultTheme, defaultThemes } from '../theme';


const CM_CUSTOM_STYLE_ID = 'cmCustomStyle';


export class ThemeService {
	private _themesMap: { [themeName: string]: CssTheme } = {};
	private _customThemeNames: string[] = [];
	private _callbacks: Set<Function> = new Set();
	private _dom_divCmCustomStyle: HTMLElement = null;
	private _defaultThemeNames: string[] = defaultThemes.map(theme => {
		this._themesMap[theme.themeName] = theme;

		return theme.themeName;
	});
	private _currentTheme: CssTheme;

	get currentTheme(): CssTheme {
		return this._currentTheme;
	}

	get defaultThemeNames(): string[] {
		return this._defaultThemeNames;
	}

	get themeNames(): string[] {
		return [
			...this._defaultThemeNames,
			...this._customThemeNames,
		];
	}


	constructor() {
		// Load custom Themes if any
		this._loadCustomThemes();

		this.setCurrentTheme(localStorage.getItem('appScriptColor-theme') || darculaTheme.themeName);

		this._setStyleObserver();
	}


	/**
	 * Set the current theme
	 *
	 * Calling it will
	 * - update currentTheme value,
	 * - save currentTheme in localStorage
	 * - apply the theme in the DOM
	 */
	setCurrentTheme(themeName: string): void {
		this._currentTheme = this.getThemeByName(themeName);
		localStorage.setItem('appScriptColor-theme', this._currentTheme.themeName);

		this._applyTheme(this._currentTheme);
	}

	/**
	 * Find a theme in store by his name
	 */
	getThemeByName(name: string): CssTheme {
		return this._themesMap[name] || defaultTheme;
	}

	/**
	 * Duplicate a theme and modify it
	 */
	createThemeFrom(
		rootTheme: CssTheme,
		{ themeName, variables = {}, rules = {} }: ICreateThemeFromOptions,
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


		const newTheme = rootTheme.createFrom({ themeName, variables, rules });
		this._addTheme(newTheme);

		saveThemes && this._saveCustomThemes();

		return newTheme;
	}

	/**
	 * Modify an existing theme
	 *
	 * This function return the theme containing the new edited theme
	 */
	updateTheme(theme: CssTheme, { themeName, variables = {}, rules = {} }: ICreateThemeFromOptions) {
		if (defaultThemes.includes(theme)) return;

		// Remove theme from custom theme
		delete this._themesMap[theme.themeName];
		this._customThemeNames = this._customThemeNames
			.filter(name => name !== theme.themeName);

		return this.createThemeFrom(theme, { themeName, variables, rules });
	}

	/**
	 * Delete a theme from the custom Theme list
	 */
	deleteTheme(theme: CssTheme): boolean {
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
	subscribe(callback: Function): void {
		this._callbacks.add(callback);
	}

	/**
	 * Remove a subscriber to add / delete theme event
	 */
	unsubscribe(callback: Function): void {
		this._callbacks.delete(callback);
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

		if (detectIde() === IdeVersion.MONACO) {
			const monacoTheme = theme.monacoTheme;

			if (monacoTheme) {
				ThemeService.setMonacoThemeFn(theme.themeName, monacoTheme);
			}
			else {
				ThemeService.resetMonacoThemeFn();
			}
		}

		// add style element last in the HEAD
		document.head.appendChild(this._dom_divCmCustomStyle);
	}

	private static setMonacoThemeFn(themeName: string, theme: IMonacoTheme): void {
		ThemeService._inject(`
function setTheme() {
	window.monaco?.editor.defineTheme('${ themeName }', ${ JSON.stringify(theme) });
	window.monaco?.editor.setTheme('${ themeName }');
}

if (window.monaco) {
	setTheme();
}
else {
	const observer = new MutationObserver(mutations => {
		mutations.some(mutation => {
			const domMonacoStyle = Array.from(mutation.addedNodes).find(node => !(node.tagName !== 'STYLE' || !node.classList.contains('monaco-colors')));
			
			if (domMonacoStyle) {
				setTheme();
				observer.disconnect();
				return true;
			}
			
			return false;
		});
	});

	observer.observe(document.head, {
		childList: true,
		attributes: false,
		characterData: false
	});
}
`);
	}

	private static resetMonacoThemeFn(): void {
		ThemeService._inject(`window.monaco?.editor.setTheme('');`);
	}

	private static _inject(code: string) {
		const domScript = document.createElement('script');

		domScript.textContent = `(function() {\n${ code }\n})()`;
		document.head.appendChild(domScript);
		document.head.removeChild(domScript);
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

		Object.keys(customThemes)
			.forEach(name => {
				const { rootTheme, themeName, variables, rules } = customThemes[name];

				this.createThemeFrom(
					this.getThemeByName(rootTheme),
					{ themeName, variables, rules },
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

}
