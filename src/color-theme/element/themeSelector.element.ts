import "@material/mwc-icon-button-toggle";
import { customElement, html, internalProperty, LitElement } from "lit-element";
import {
    EVENT_IDE_DOM_HIDDEN,
    EVENT_IDE_DOM_UPDATED,
} from "../../feature-detection";
import { settingsService } from "../../storage";
import { ThemeService } from "../service/theme.service";
import { darculaTheme } from "../theme";

@customElement("asc-theme-selector")
export class ThemeSelector extends LitElement {
    private static _themeService: ThemeService;

    private _themeService: ThemeService;

    @internalProperty()
    get useTheme(): boolean {
        return settingsService.useTheme();
    }

    set useTheme(useTheme: boolean) {
        settingsService.useTheme(useTheme);
    }

    constructor() {
        super();

        this._themeService = ThemeSelector._themeService;
    }

    //<editor-fold desc="# Lifecycle">

    firstUpdated(): void {
        this._onToggle(this.useTheme);
    }

    //</editor-fold>

    //<editor-fold desc="# Render">

    render() {
        return html`
            <style>
                :host {
                    /*noinspection CssUnresolvedCustomProperty*/
                    color: var(--gm-neutraltextbutton-ink-color, #5f6368);
                    font-family: "Google Sans", Roboto, Arial, sans-serif;
                    font-size: 0.875rem;
                    font-weight: 500;
                    letter-spacing: 0.0107142857em;
                    text-transform: none;
                }

                mwc-icon-button-toggle {
                    --mdc-icon-button-size: 26px;
                    --mdc-icon-size: 22px;
                }
            </style>

            <mwc-icon-button-toggle
                onIcon="brightness_2"
                offIcon="wb_sunny"
                @icon-button-toggle-change="${({
                    detail: { isOn },
                }: {
                    detail: { isOn: boolean };
                }) => this._onToggle(isOn)}"
                .on="${this.useTheme}"
            ></mwc-icon-button-toggle>
        `;
    }

    //</editor-fold>

    //<editor-fold desc="# Events">

    _onToggle(isOn: boolean) {
        if (isOn) {
            this._themeService.setCurrentTheme(
                this._themeService.currentTheme.hasMonacoTheme
                    ? this._themeService.currentTheme.themeName
                    : darculaTheme.themeName
            );
        } else {
            this._themeService.resetTheme();
        }

        this.useTheme = isOn;
    }

    //</editor-fold>

    private static _onDomChanged = ({
        detail: { node },
    }: {
        detail: { node: HTMLElement };
    }): void => {
        // Get IDE dom element container
        const domListBox = node.querySelector(
            'div[jsslot] div[role="listbox"]'
        ) as HTMLElement;
        if (!domListBox) return;

        const domToolBox =
            domListBox?.parentElement?.parentElement?.parentElement;
        const domToolBoxes = domToolBox.parentElement;

        const domSpacer =
            (Array.from(domToolBoxes.children).find(
                (child) => !child.classList.contains(domToolBox.className)
            ) as HTMLElement) || (domToolBoxes.lastChild as HTMLElement);

        domSpacer.insertAdjacentHTML(
            "beforebegin",
            `<div class="${domToolBox.className}"><asc-theme-selector></asc-theme-selector></div>`
        );
    };

    private static _onDomHidden = (): void =>
        ThemeSelector._themeService.resetTheme();

    static init(themeService: ThemeService): void {
        this._themeService = themeService;

        window.addEventListener(EVENT_IDE_DOM_UPDATED, this._onDomChanged);
        window.addEventListener(EVENT_IDE_DOM_HIDDEN, this._onDomHidden);
    }

    static destroy() {
        this._themeService = undefined;

        window.removeEventListener(EVENT_IDE_DOM_UPDATED, this._onDomChanged);
        window.removeEventListener(EVENT_IDE_DOM_HIDDEN, this._onDomHidden);
    }
}
