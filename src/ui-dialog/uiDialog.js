import {html, LitElement} from 'lit-element';

export class UiDialog extends LitElement {
	
	static get is() {
		return 'asc-ui-dialog';
	}
	
	static get properties() {
		return {
			title: {type: String},
		};
	}
	
	constructor() {
		super();
		
		this.title = '';
	}
	
	render() {
		return html`
<style>
	.title {
		font-size: 2em;
	}
</style>

<main>
	<div class="title">${this.title}</div>
	<div>Dialog Content</div>
</main>
`;
	}
	
}

customElements.define(UiDialog.is, UiDialog);
