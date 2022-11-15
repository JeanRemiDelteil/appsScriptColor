import { detectIde, IdeVersion } from "../../feature-detection";
import { settingsService } from "../../storage";
import { CssTheme } from "../class/cssTheme";
import {
    ICreateThemeFromOptions,
    ICustomThemes,
    IMonacoTheme,
} from "../interface";
import { darculaTheme, defaultTheme, defaultThemes } from "../theme";
import { sendMessageToBack } from "../../background/messager/content-script-messager";
import { BackgroundMessageEvent } from "../../background/messager/message-event.enum";

export class ThemeService {
    private readonly _customStyleId = `cmCustomStyle-${new Date().toISOString()}`;

    private _themesMap: { [themeName: string]: CssTheme } = {};
    private _customThemeNames: string[] = [];
    private _callbacks: Set<Function> = new Set();
    private _dom_divCmCustomStyle: HTMLElement = null;
    private _defaultThemeNames: string[] = defaultThemes.map((theme) => {
        this._themesMap[theme.themeName] = theme;

        return theme.themeName;
    });
    private _currentTheme: CssTheme;
    private _styleObserver: MutationObserver;

    get currentTheme(): CssTheme {
        return this._currentTheme;
    }

    get defaultThemeNames(): string[] {
        return this._defaultThemeNames;
    }

    get themeNames(): string[] {
        return [...this._defaultThemeNames, ...this._customThemeNames];
    }

    constructor() {
        // Load custom Themes if any
        this._loadCustomThemes();

        // Init current theme, but do not apply it automatically
        this._currentTheme = this.getThemeByName(
            settingsService.getThemeInUse() || darculaTheme.themeName
        );
        settingsService.setThemeInUse(this._currentTheme.themeName);

        // Init style dom
        this.resetTheme();
        this._setStyleObserver();

        // Listen for changes made in the MAIN world
        settingsService.listenForThemeChange(
            (themeName) => (this._currentTheme = this.getThemeByName(themeName))
        );
    }

    /**
     * Set the current theme
     *
     * Calling it will
     * - update currentTheme value,
     * - save currentTheme
     * - apply the theme in the DOM
     */
    setCurrentTheme(themeName: string): void {
        this._currentTheme = this.getThemeByName(themeName);
        settingsService.setThemeInUse(this._currentTheme.themeName);

        this._applyTheme(this._currentTheme);
    }

    /**
     * Apply default theme, without saving it in the preference
     */
    resetTheme() {
        this._applyTheme(defaultTheme);
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
        saveThemes = true
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
    updateTheme(
        theme: CssTheme,
        { themeName, variables = {}, rules = {} }: ICreateThemeFromOptions
    ) {
        if (defaultThemes.includes(theme)) return;

        // Remove theme from custom theme
        delete this._themesMap[theme.themeName];
        this._customThemeNames = this._customThemeNames.filter(
            (name) => name !== theme.themeName
        );

        return this.createThemeFrom(theme, { themeName, variables, rules });
    }

    /**
     * Delete a theme from the custom Theme list
     */
    deleteTheme(theme: CssTheme): boolean {
        if (defaultThemes.includes(theme)) return false;

        // Remove theme from custom theme
        delete this._themesMap[theme.themeName];
        this._customThemeNames = this._customThemeNames.filter(
            (name) => name !== theme.themeName
        );

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

    destroy() {
        // Remove styles
        if (this._dom_divCmCustomStyle) {
            const domStyleParent = this._dom_divCmCustomStyle.parentElement;
            if (domStyleParent) {
                domStyleParent.removeChild(this._dom_divCmCustomStyle);
            }

            this._dom_divCmCustomStyle = undefined;
        }

        this._styleObserver?.disconnect();
        this._styleObserver = undefined;

        this._callbacks.clear();
    }

    //<editor-fold desc="# Private methods">

    /**
     * Apply chosen theme
     */
    private _applyTheme(theme: CssTheme): void {
        // Init the custom style element
        if (!this._dom_divCmCustomStyle) {
            this._dom_divCmCustomStyle = document.createElement("style");
            this._dom_divCmCustomStyle.setAttribute("id", this._customStyleId);
        }

        this._dom_divCmCustomStyle.innerHTML = theme.css;

        if (detectIde() === IdeVersion.MONACO) {
            const monacoTheme = theme.monacoTheme;

            if (monacoTheme) {
                ThemeService.setMonacoThemeFn(theme.themeName);
            } else {
                ThemeService.resetMonacoThemeFn();
            }
        }

        // add style element last in the HEAD
        document.head.appendChild(this._dom_divCmCustomStyle);
    }

    /**
     * One time set up to ensure that our stylesheet will always be the last applied style
     */
    private _setStyleObserver(): void {
        // create an observer instance to detect <style> insertion
        // to always be the last styleSheet
        this._styleObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                for (let item in mutation.addedNodes) {
                    const node = mutation.addedNodes[item] as HTMLElement;

                    // Filter for STYLE elements (other than our styleSheet)
                    if (
                        node.tagName !== "STYLE" ||
                        node.id === this._customStyleId
                    )
                        continue;

                    // Move style node to the end for the HEAD
                    document.head.appendChild(this._dom_divCmCustomStyle);
                }
            });
        });

        this._styleObserver.observe(document.head, {
            childList: true,
            attributes: false,
            characterData: false,
        });
    }

    /**
     * Store custom theme in localStore
     */
    private _saveCustomThemes(): void {
        const customThemes: ICustomThemes = {};

        this._customThemeNames.map(
            (themeName) =>
                (customThemes[themeName] = JSON.parse(
                    this._themesMap[themeName].toJSON()
                ))
        );

        settingsService.setCustomThemes(customThemes);
    }

    /**
     * Load custom theme from localStore
     */
    private _loadCustomThemes(): void {
        Object.values(settingsService.getCustomThemes()).forEach(
            ({ rootTheme, themeName, variables, rules }) => {
                this.createThemeFrom(
                    this.getThemeByName(rootTheme),
                    { themeName, variables, rules },
                    false
                );
            }
        );
    }

    /**
     * Add a theme in internal theme store
     */
    private _addTheme(theme: CssTheme): void {
        if (this._themesMap[theme.themeName]) return;

        this._themesMap[theme.themeName] = theme;
        this._customThemeNames.push(theme.themeName);
        this._customThemeNames.sort((a, b) => (b > a ? 1 : a === b ? 0 : -1));

        this._notifySubscribers();
    }

    /**
     * Call every subscribers callback,
     * called on theme added or deleted
     */
    private _notifySubscribers(): void {
        this._callbacks.forEach((callback) => callback());
    }

    //</editor-fold>

    private static setMonacoThemeFn(themeName: string): void {
        sendMessageToBack({
            event: BackgroundMessageEvent.SET_THEME,
            theme: themeName,
        });
    }

    private static resetMonacoThemeFn(): void {
        sendMessageToBack({ event: BackgroundMessageEvent.RESET_THEME });
    }
}
