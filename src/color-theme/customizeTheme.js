import '../lib/webComponents';
import {html, LitElement} from 'lit-element';
import '../lib/components/uiDialog';

export class CustomizeTheme extends LitElement {
	
	static get is() {
		return 'asc-customize-theme';
	}
	
	static get properties() {
		return {
			colorTheme: {type: Object},
		};
	}
	
	constructor() {
		super();
		
		/**
		 * @type {ColorTheme | {}}
		 */
		this.colorTheme = {};
	}
	
	
	render() {
		return html`
<style>
</style>

<asc-ui-dialog header="Customize color Theme" @UI_DIALOG_CLOSE="${this.close}">
	
	<div>
		theme used: ${this.colorTheme.getCurrentThemeName()}
	</div>
	
</asc-ui-dialog>
`;
	}
	
	close() {
		this.remove();
	}
	
}

customElements.define(CustomizeTheme.is, CustomizeTheme);
