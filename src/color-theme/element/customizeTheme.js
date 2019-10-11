import '../../lib/webComponents';
import {html, LitElement} from 'lit-element';
import '../../lib/components/uiDialog';
import {themeService} from '../service/theme.service';

export class CustomizeTheme extends LitElement {
	
	static get is() {
		return 'asc-customize-theme';
	}
	
	static get properties() {
		return {
			themes: {type: Array},
			themeClass: {type: Function},
			newColors: {type: Object},
			newThemeName: {type: String},
		};
	}
	
	constructor() {
		super();
		
		this.themes = themeService.themeNames;
		
		/**
		 * @type {CssTheme}
		 */
		this.themeClass = null;
		
		/**
		 * @type {Object<string, string>}
		 */
		this.newColors = {};
		
		this.newThemeName = '';
		
		this._updateThemeList = this._updateThemeList.bind(this);
	}
	
	connectedCallback() {
		super.connectedCallback();
		
		themeService.subscribe(this._updateThemeList);
	}
	
	disconnectedCallback() {
		super.disconnectedCallback();
		
		themeService.unsubscribe(this._updateThemeList);
	}
	
	render() {
		return html`
<style>
	.theme-selector {
		display: flex;
		align-items: baseline;
	}
	.theme-selector,
	.theme-name,
	.theme-variables {
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
</style>

<asc-ui-dialog header="Customize color Theme" @UI_DIALOG_CLOSE="${this.close}">
	
	<div class="theme-selector">
		<label for="theme-selector">Select theme:</label>
		<select id="theme-selector" @input="${this._onThemeSelection}">${this._render_ThemeSelector(this.themes)}</select>
	</div>
	
	<div class="theme-name">
		<label for="theme-name">Theme Name</label>
		<input id="theme-name" .value="${this.themeClass ? this.themeClass.themeName : ''}" @input="${event => this._onEditThemeName(event)}">
	</div>
	
	<div class="theme-variables">${this._render_ThemeVariables(this.themeClass)}</div>
	
	<div class="actions">${this._render_actions(this.themeClass, this.newThemeName, this.newColors)}</div>
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
	<input .value="${variables[variableName]}" @input="${event => this._onVariableChange(variableName, event)}">
</div>
`);
	}
	
	_render_actions(themeClass, newName, newColors) {
		if (!themeClass || !newName || Object.keys(newColors).length === 0) return html``;
		
		if (themeService.defaultThemeNames.includes(themeClass._themeName)) {
			return html`
<button @click="${() => this._onCreateFromTheme(themeClass, newName, newColors)}">Create from</button>
`;
		}
		
		return html`
<button @click="${() => this._onSaveTheme(themeClass)}>Save theme</button>
`;
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
		this.newThemeName = '';
		this.newColors = {};
		
		this._loadTheme(this._getSelectedTheme());
	}
	
	/**
	 * @param {string} variableName
	 * @param {Event} event
	 * @private
	 */
	_onVariableChange(variableName, event) {
		/**
		 * @type {HTMLInputElement}
		 */
		const domInput = event['path'][0];
		
		this.newColors = {
			...this.newColors,
			[variableName]: domInput.value,
		};
	}
	
	/**
	 * @param {Event} event
	 * @private
	 */
	_onEditThemeName(event) {
		/**
		 * @type {HTMLInputElement}
		 */
		const domInput = event['path'][0];
		
		this.newThemeName = domInput.value;
	}
	
	_onCreateFromTheme(themeClass, themeName, themeColors) {
		const newTheme = themeService.createThemeFrom(themeClass, {themeName, variables: themeColors});
		
		themeService.addTheme(newTheme);
		themeService.saveCustomThemes();
	}
	
	_onSaveTheme(themeClass) {
		console.log('Save theme ', themeClass._themeName);
	}
	
	/**
	 * Definition reset at firstUpdated() lifecycle callback
	 * @return {string}
	 * @private
	 */
	_getSelectedTheme() {
		return '';
	}
	
	
	_loadTheme(themeName) {
		if (!themeName) return;
		
		this.themeClass = themeService.getThemeByName(themeName);
	}
	
	_updateThemeList() {
		this.themes = themeService.themeNames;
	}
	
	close() {
		this.remove();
	}
	
}

customElements.define(CustomizeTheme.is, CustomizeTheme);
