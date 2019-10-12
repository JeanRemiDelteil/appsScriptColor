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
	
	
	//<editor-fold desc="# Lifecycle">
	
	connectedCallback() {
		super.connectedCallback();
		
		themeService.subscribe(this._updateThemeList);
	}
	
	disconnectedCallback() {
		super.disconnectedCallback();
		
		themeService.unsubscribe(this._updateThemeList);
	}
	
	firstUpdated(_changedProperties) {
		/**
		 * @type {HTMLSelectElement}
		 */
		this._domThemeSelector = this.shadowRoot.querySelector('#theme-selector');
		
		this._loadTheme(this._getSelectedTheme());
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# Render">
	
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
	.action-button {
		margin-left: 1em;
	}
</style>

<asc-ui-dialog header="Customize color Theme" @UI_DIALOG_CLOSE="${this.close}">
	
	<div class="theme-selector">
		<label for="theme-selector">Select theme:</label>
		<select id="theme-selector" .value="${this.themeClass && this.themeClass.themeName || ''}" @input="${this._onThemeSelection}">${this._render_ThemeSelector(this.themes)}</select>
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
		return html`
<button class="action-button" @click="${() => this._onDeleteTheme(themeClass)}" ?disabled="${this._isDeleteButtonDisabled(themeClass)}">Delete</button>
<button class="action-button" @click="${() => this._onSaveTheme(themeClass, newName, newColors)}" ?disabled="${this._isSaveButtonDisabled(themeClass)}">Save</button>
<button class="action-button" @click="${() => this._onCopyTheme(themeClass, newName, newColors)}">Copy</button>
`;
	}
	
	//</editor-fold>
	
	//<editor-fold desc="# onEvent">
	
	/**
	 * @private
	 */
	_onThemeSelection() {
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
	
	_onCopyTheme(themeClass, themeName, themeColors) {
		if (!themeName) themeName = themeClass.themeName;
		
		if (themeService.themeNames.includes(themeName)) {
			themeName += ' ' + new Date().toISOString();
		}
		
		const newTheme = themeService.createThemeFrom(themeClass, {themeName, variables: themeColors});
		themeService.saveCustomThemes();
		
		this._selectTheme(newTheme.themeName);
	}
	
	_onSaveTheme(themeClass, themeName, themeColors) {
		if (!themeName) themeName = themeClass.themeName;
		
		const theme = themeService.updateTheme(
			themeClass,
			{themeName, variables: themeColors},
		);
		themeService.saveCustomThemes();
		
		this._selectTheme(theme.themeName);
	}
	
	_onDeleteTheme(themeClass) {
		themeService.deleteTheme(themeClass);
		themeService.saveCustomThemes();
		
		this._onThemeSelection();
	}
	
	//</editor-fold>
	
	
	//<editor-fold desc="# Private methods">
	
	/**
	 * @return {string}
	 * @private
	 */
	_getSelectedTheme() {
		return this._domThemeSelector && this._domThemeSelector.value || '';
	}
	
	_selectTheme(themeName) {
		window.requestAnimationFrame(
			() => this.themeClass = themeService.getThemeByName(themeName),
		);
	}
	
	_loadTheme(themeName) {
		if (!themeName) return;
		
		this.themeClass = themeService.getThemeByName(themeName);
	}
	
	_updateThemeList() {
		this.themes = themeService.themeNames;
	}
	
	_isSaveButtonDisabled(themeClass) {
		return themeClass
		       && themeService
			       .defaultThemeNames
			       .includes(themeClass._themeName)
		       || (
			       !Object.keys(this.newColors).length
			       && !this.newThemeName
		       );
	}
	
	_isDeleteButtonDisabled(themeClass) {
		return themeClass
		       && themeService
			       .defaultThemeNames
			       .includes(themeClass._themeName);
	}
	
	//</editor-fold>
	
	
	close() {
		this.remove();
	}
	
	static appendToBody() {
		document.body.insertAdjacentHTML('beforeend', `<${this.is}></${this.is}>`);
	}
}

customElements.define(CustomizeTheme.is, CustomizeTheme);
