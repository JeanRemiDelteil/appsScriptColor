import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../element/uiDialog";
import { CssTheme } from "../class/cssTheme";
// noinspection TypeScriptPreferShortImport
import { ThemeService } from "../service/theme.service";

// Insert style needed to adapt layout
//document.head.insertAdjacentHTML('beforeend', `<style>
//.asc-main-sidebar {
//	display: flex;
//}
//.asc-main-sidebar > div:nth-child(2) {
//    position: relative!important;
//    flex: auto;
//}
//</style>`);

@customElement("asc-customize-theme")
export class CustomizeTheme extends LitElement {
    private static _domSidebarParent: HTMLElement = null;
    private static _opened: boolean = false;
    private static _themeService: ThemeService;

    private _themeService: ThemeService;

    @property({ type: Array }) themes: string[];

    @property({ type: Function }) themeClass: CssTheme = null;

    @property({ type: Object }) newColors: { [variable: string]: string } = {};

    @property({ type: String }) newThemeName: string = "";

    @property({
        type: Boolean,
        reflect: true,
        attribute: "fullscreen",
    })
    fullScreen: boolean = false;

    constructor() {
        super();

        this._themeService = CustomizeTheme._themeService;
        this.themes = CustomizeTheme._themeService.themeNames;

        this._updateThemeList = this._updateThemeList.bind(this);
    }

    //<editor-fold desc="# Lifecycle">

    connectedCallback(): void {
        super.connectedCallback();

        this._themeService.subscribe(this._updateThemeList);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        this._themeService.unsubscribe(this._updateThemeList);
    }

    firstUpdated(): void {
        this._selectTheme(this._themeService.currentTheme.themeName);
    }

    //</editor-fold>

    //<editor-fold desc="# Render">

    render() {
        return html`
            <style>
                :host {
                    display: block;
                    color: black;
                }

                :host,
                input,
                select,
                button {
                    font-family: Roboto, Arial, sans-serif;
                }

                .theme-selector {
                    display: flex;
                    align-items: baseline;
                }

                .theme-selector,
                .theme-name {
                    margin-bottom: 1em;
                }

                .theme-name {
                    display: flex;
                }

                .theme-variable {
                    display: flex;
                    align-items: baseline;

                    margin-bottom: 0.5em;
                }

                .theme-selector > label,
                .theme-name > label,
                .theme-variable > label {
                    margin-right: auto;
                }

                .theme-selector > select,
                .theme-name > input,
                .theme-variable > input {
                    margin-left: 1em;
                }

                .actions {
                    display: flex;
                    justify-content: flex-end;
                }

                .action-button {
                    margin-left: 1em;
                }
            </style>

            <asc-ui-dialog
                ?fullscreen="${this.fullScreen}"
                header="Customize color Theme"
                @UI_DIALOG_CLOSE="${this.close}"
            >
                <div class="theme-selector">
                    <label for="theme-selector">Select theme:</label>
                    <select
                        id="theme-selector"
                        .value="${(this.themeClass &&
                            this.themeClass.themeName) ||
                        ""}"
                        @input="${this._onThemeSelection}"
                    >
                        ${this._render_ThemeSelector(this.themes)}
                    </select>
                </div>

                <div class="theme-name">
                    <label for="theme-name">Theme Name</label>
                    <input
                        id="theme-name"
                        .value="${this.themeClass
                            ? this.themeClass.themeName
                            : ""}"
                        @input="${this._onEditThemeName}"
                    />
                </div>

                <div class="theme-variables">
                    ${this._render_ThemeVariables(this.themeClass)}
                </div>

                <div class="actions" slot="action">
                    ${this._render_actions(
                        this.themeClass,
                        this.newThemeName,
                        this.newColors
                    )}
                </div>
            </asc-ui-dialog>
        `;
    }

    private _render_ThemeSelector(allThemeNames: string[]) {
        return allThemeNames.map(
            (themeName) => html` <option value="${themeName}">
                ${themeName}
            </option>`
        );
    }

    private _render_ThemeVariables(theme: CssTheme) {
        if (!theme) return html``;

        const variables = theme.variables;

        return Object.keys(variables).map(
            (variableName) => html`
                <div class="theme-variable">
                    <label>${variableName}</label>
                    <input
                        .value="${variables[variableName]}"
                        @input="${(event: Event) =>
                            this._onVariableChange(variableName, event)}"
                    />
                </div>
            `
        );
    }

    private _render_actions(
        themeClass: CssTheme,
        newName: string,
        newColors: { [variable: string]: string }
    ) {
        return html`
            <button
                class="action-button"
                @click="${() => this._onDeleteTheme(themeClass)}"
                ?disabled="${this._isDeleteButtonDisabled(themeClass)}"
            >
                Delete
            </button>
            <button
                class="action-button"
                @click="${() =>
                    this._onCopyTheme(themeClass, newName, newColors)}"
            >
                Copy
            </button>
            <button
                class="action-button"
                @click="${() =>
                    this._onSaveTheme(themeClass, newName, newColors)}"
                ?disabled="${this._isSaveButtonDisabled(themeClass)}"
            >
                Save
            </button>
            <button
                class="action-button"
                @click="${() => this._onUseTheme(themeClass)}"
            >
                Use
            </button>
        `;
    }

    //</editor-fold>

    //<editor-fold desc="# onEvent">

    /**
     * Close the current Theme editor
     */
    close(): void {
        this.remove();

        if (CustomizeTheme._domSidebarParent) {
            CustomizeTheme._domSidebarParent.classList.remove(
                "asc-main-sidebar"
            );
            delete CustomizeTheme._domSidebarParent;
        }
        CustomizeTheme._opened = false;

        // Reload applied theme
        this._themeService.setCurrentTheme(
            this._themeService.currentTheme.themeName
        );
    }

    private _onThemeSelection(event: Event): void {
        const domSelect = event.target as HTMLSelectElement;

        this.newThemeName = "";
        this.newColors = {};

        this._loadTheme(domSelect.value || "");
    }

    private _onVariableChange(variableName: string, event: Event): void {
        const domInput = event.target as HTMLInputElement;

        this.newColors = {
            ...this.newColors,
            [variableName]: domInput.value,
        };
    }

    private _onEditThemeName(event: Event): void {
        const domInput = event.target as HTMLInputElement;

        this.newThemeName = domInput.value;
    }

    private _onUseTheme(themeClass: CssTheme): void {
        this._themeService.setCurrentTheme(themeClass.themeName);
    }

    private _onCopyTheme(
        themeClass: CssTheme,
        themeName: string,
        themeColors: { [variable: string]: string }
    ): void {
        if (!themeName) themeName = themeClass.themeName;

        if (this._themeService.themeNames.includes(themeName)) {
            themeName += " " + new Date().toISOString();
        }

        const newTheme = this._themeService.createThemeFrom(themeClass, {
            themeName,
            variables: themeColors,
        });

        this._selectTheme(newTheme.themeName);
    }

    private _onSaveTheme(
        themeClass: CssTheme,
        themeName: string,
        themeColors: { [variable: string]: string }
    ): void {
        if (!themeName) themeName = themeClass.themeName;

        const theme = this._themeService.updateTheme(themeClass, {
            themeName,
            variables: themeColors,
        });

        this._selectTheme(theme.themeName);
    }

    private _onDeleteTheme(themeClass: CssTheme): void {
        const currentIndex = this.themes.findIndex(
            (name) => name === themeClass.themeName
        );

        this._themeService.deleteTheme(themeClass);

        this.newThemeName = "";
        this.newColors = {};

        // It's not possible to delete the first default themes
        this._selectTheme(this.themes[currentIndex - 1]);
    }

    //</editor-fold>

    //<editor-fold desc="# Private methods">

    private _selectTheme(themeName: string): void {
        window.requestAnimationFrame(
            () =>
                (this.themeClass = this._themeService.getThemeByName(themeName))
        );
    }

    private _loadTheme(themeName: string): void {
        if (!themeName) return;

        this.themeClass = this._themeService.getThemeByName(themeName);
    }

    private _updateThemeList(): void {
        this.themes = this._themeService.themeNames;
    }

    private _isDeleteButtonDisabled(themeClass: CssTheme): boolean {
        return (
            themeClass &&
            this._themeService.defaultThemeNames.includes(themeClass.themeName)
        );
    }

    private _isSaveButtonDisabled(themeClass: CssTheme): boolean {
        return (
            (themeClass &&
                this._themeService.defaultThemeNames.includes(
                    themeClass.themeName
                )) ||
            (!Object.keys(this.newColors).length && !this.newThemeName)
        );
    }

    //</editor-fold>

    /**
     * Open the theme editor dialog, either in a sidebar, or as a fullscreen dialog
     */
    static open(themeService: ThemeService): void {
        if (this._opened) return;
        this._opened = true;
        this._themeService = themeService;

        const domWorkspace = document.querySelector(".workspace");

        if (!domWorkspace) {
            // Insert as a global dialog box
            document.body.insertAdjacentHTML(
                "beforeend",
                `<asc-customize-theme fullscreen></asc-customize-theme>`
            );
        } else {
            this._domSidebarParent =
                domWorkspace.parentElement.parentElement.parentElement.parentElement;

            this._domSidebarParent.classList.add("asc-main-sidebar");
            this._domSidebarParent.insertAdjacentHTML(
                "beforeend",
                `<asc-customize-theme></asc-customize-theme>`
            );
        }
    }
}
