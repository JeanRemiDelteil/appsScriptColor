import '../webComponents';
import {html, LitElement} from 'lit-element';
import '@material/mwc-icon-button';
import {ICON_CLOSE} from '../icons';

export const Events = {
	UI_DIALOG_CLOSE: 'UI_DIALOG_CLOSE',
};


export class UiDialog extends LitElement {
	
	static get is() {
		return 'asc-ui-dialog';
	}
	
	static get properties() {
		return {
			header: {type: String},
		};
	}
	
	constructor() {
		super();
		
		this.header = '';
		this.hidden = true;
	}
	
	render() {
		return html`
<style>
	/* Overlay */
	:host {
		position: fixed;
		z-index: 2100;
		
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		background-color: #9999994d;
	}

	main{
		position: relative;
		
	    margin: 32px;
		padding: 32px;
		min-height: 200px;
		
		background-color: white;
	}
	header {
		margin-bottom: 1em;
		font-size: 1.25em;
	}
	footer {
		
	}
	
	.close {
		position: absolute;
		right: 0;
		top: 0;
	}
	
	.content {
		
	}
</style>

<main>
	<header>${this.header}</header>
	<mwc-icon-button class="close" @click="${this.close}">${ICON_CLOSE}</mwc-icon-button>
	
	<div class="content">
		<slot></slot>
	</div>
	
	<footer>
		<slot name="action"></slot>
	</footer>
</main>
`;
	}
	
	close() {
		this.dispatchEvent(new CustomEvent(Events.UI_DIALOG_CLOSE, {
			bubbles: true,
			composed: true,
		}));
	}
}

customElements.define(UiDialog.is, UiDialog);
