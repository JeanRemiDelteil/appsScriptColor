import '@material/mwc-icon-button-toggle';
import { customElement, html, LitElement, property } from 'lit-element';
import { EVENT_IDE_DOM_UPDATED } from '../../feature-detection';
import { CssTheme } from '../class/cssTheme';
import { ThemeService } from '../service/theme.service';


@customElement('asc-theme-selector')
export class ThemeSelector extends LitElement {
	private static _themeService: ThemeService;

	private _themeService: ThemeService;

	@property({ type: Array })
	themes: string[];
	@property({ type: Function })
	themeClass: CssTheme = null;


	constructor() {
		super();

		this._themeService = ThemeSelector._themeService;
		this.themes = this._themeService.themeNames;
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
			
			<mwc-icon-button-toggle onIcon="brightness_2" offIcon="wb_sunny"></mwc-icon-button-toggle>
		`;
	}

	//</editor-fold>

	//<editor-fold desc="# Private methods">

	private _selectTheme(themeName: string): void {
		window.requestAnimationFrame(() => this.themeClass = this._themeService.getThemeByName(themeName));
	}

	private _updateThemeList(): void {
		this.themes = this._themeService.themeNames;
	}

	private _loadTheme(themeName: string): void {
		if (!themeName) return;

		this.themeClass = this._themeService.getThemeByName(themeName);
	}

	//</editor-fold>


	static insertThemeSelector(themeService: ThemeService): void {
		this._themeService = themeService;

		window.addEventListener(EVENT_IDE_DOM_UPDATED, ({ detail: { node } }) => {
			// Get IDE dom element container
			const domListBox = node.querySelector('div[jsslot] div[role="listbox"]') as HTMLElement;

			const domToolBox = domListBox?.parentElement?.parentElement?.parentElement;
			const domToolBoxes = domToolBox.parentElement;

			const domSpacer = Array.from(domToolBoxes.children)
				                  .find(child => !child.classList.contains(domToolBox.className)) as HTMLElement || domToolBoxes.lastChild as HTMLElement;

			domSpacer.insertAdjacentHTML('beforebegin', `<div class="${ domToolBox.className }"><asc-theme-selector></asc-theme-selector></div>`);
		});
	}
}
