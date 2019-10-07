import '../lib/webComponents';
import {html, LitElement} from 'lit-element';
import '../lib/components/uiDialog';
import {themeNames, themes} from './theme';

export class CustomizeTheme extends LitElement {
	
	static get is() {
		return 'asc-customize-theme';
	}
	
	static get properties() {
		return {
			colorTheme: {type: Object},
			themes: {type: Array},
			themeClass: {type: Function},
		};
	}
	
	constructor() {
		super();
		
		/**
		 * @type {ColorTheme | {}}
		 */
		this.colorTheme = {};
		
		//TODO: add new custom theme to this list
		this.themes = themeNames;
		
		/**
		 * @type {CssTheme}
		 */
		this.themeClass = null;
	}
	
	
	render() {
		return html`
<style>
	.theme-selector {
		display: flex;
		align-items: baseline;
		
		margin-bottom: 1em;
	}
	.theme-variable {
		display: flex;
		align-items: baseline;
		
		margin-bottom: 0.5em;
	}
	.theme-selector > label,
	.theme-variable > label {
		margin-right: auto;
	}
	.theme-selector > select,
	.theme-variable > input {
		margin-left: 1em;
	}
</style>

<asc-ui-dialog header="Customize color Theme" @UI_DIALOG_CLOSE="${this.close}">
	
	<div class="theme-selector">
		<label for="theme-selector">Select theme:</label>
		<select id="theme-selector" @input="${this._onThemeSelection}">${this._render_ThemeSelector(this.themes)}</select>
	</div>
	
	<div class="theme-variables">${this._render_ThemeVariables(this.themeClass)}</div>
</asc-ui-dialog>
`;
	}
	
	_render_ThemeSelector(allThemeNames) {
		return allThemeNames.map(themeName => html`<option value="${themeName}">${themeName}</option>`);
	}
	
	
	_render_ThemeVariables(theme) {
		if (!theme) return html``;
		
		const variables = theme._variables;
		
		return Object.keys(variables).map(variableName => html`
<div class="theme-variable">
	<label>${variableName}</label>
	<input value="${variables[variableName]}">
</div>
`);
	}
	
	
	firstUpdated(_changedProperties) {
		/**
		 * @type {HTMLSelectElement}
		 */
		const domThemeSelector = this.shadowRoot.querySelector('#theme-selector');
		this._getSelectedTheme = () => domThemeSelector.value;
		
		this._loadTheme(this._getSelectedTheme());
	}
	
	
	/**
	 * @param {Event} event
	 * @private
	 */
	_onThemeSelection(event) {
		this._loadTheme(this._getSelectedTheme());
	}
	
	
	_getSelectedTheme() {
		return '';
	}
	
	
	_loadTheme(themeName) {
		if (!themeName) return;
		
		this.themeClass = themes[themeName];
	}
	
	
	close() {
		this.remove();
	}
	
}

customElements.define(CustomizeTheme.is, CustomizeTheme);
