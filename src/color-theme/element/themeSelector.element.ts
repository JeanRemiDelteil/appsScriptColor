import '@material/mwc-icon-button-toggle';
import { customElement, html, LitElement, property } from 'lit-element';
import { EVENT_IDE_DOM_HIDDEN, EVENT_IDE_DOM_UPDATED } from '../../feature-detection';
import { CssTheme } from '../class/cssTheme';
import { ThemeService } from '../service/theme.service';
import { darculaTheme, defaultTheme } from '../theme';


@customElement('asc-theme-selector')
export class ThemeSelector extends LitElement {
	private static _themeService: ThemeService;

	private _themeService: ThemeService;


	@property({ type: Function })
	themeClass: CssTheme = null;


	constructor() {
		super();

		this._themeService = ThemeSelector._themeService;
	}


	//<editor-fold desc="# Lifecycle">

	firstUpdated(): void {
		this._applyTheme(this._themeService.currentTheme.themeName);
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
					font-size: .875rem;
					font-weight: 500;
					letter-spacing: .0107142857em;
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
				@MDCIconButtonToggle:change="${ this._onToggle }"
				.on="${ this.themeClass !== defaultTheme }"
			></mwc-icon-button-toggle>
		`;
	}

	//</editor-fold>

	//<editor-fold desc="# Events">

	_onToggle({ detail: { isOn } }: { detail: { isOn: boolean } }) {
		this._applyTheme(isOn ? darculaTheme.themeName : defaultTheme.themeName);
	}

	//</editor-fold>

	//<editor-fold desc="# Private methods">

	private _applyTheme(themeName: string): void {
		this.themeClass = this._themeService.getThemeByName(themeName);
		this._themeService.setCurrentTheme(this.themeClass.themeName);
	}

	//</editor-fold>


	static init(themeService: ThemeService): void {
		this._themeService = themeService;

		window.addEventListener(EVENT_IDE_DOM_UPDATED, ({ detail: { node } }) => {
			// Get IDE dom element container
			const domListBox = node.querySelector('div[jsslot] div[role="listbox"]') as HTMLElement;
			if (!domListBox) return;

			const domToolBox = domListBox?.parentElement?.parentElement?.parentElement;
			const domToolBoxes = domToolBox.parentElement;

			const domSpacer = Array.from(domToolBoxes.children)
				                  .find(child => !child.classList.contains(domToolBox.className)) as HTMLElement || domToolBoxes.lastChild as HTMLElement;

			domSpacer.insertAdjacentHTML('beforebegin', `<div class="${ domToolBox.className }"><asc-theme-selector></asc-theme-selector></div>`);
		});

		window.addEventListener(EVENT_IDE_DOM_HIDDEN, () => themeService.resetTheme());
	}
}
