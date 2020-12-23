import { customElement, html, LitElement, property } from 'lit-element';
import '@material/mwc-icon-button';
import { ICON_CLOSE } from '../icons';


@customElement('asc-ui-dialog')
export class UiDialog extends LitElement {

	static Events = {
		UI_DIALOG_CLOSE: 'UI_DIALOG_CLOSE',
	};
	@property({type: String})
	header: string = '';
	hidden: boolean = true;

	render() {
		return html`
<style>
	/* Overlay */
	:host {
		position: relative;
		z-index: auto;
		
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		
		display: flex;
		justify-content: center;
		
		max-height: 100%;
		
		background-color: #9999994d;
	}
	:host([fullscreen]) {
		position: fixed;
		z-index: 2100;
		align-items: center;
	}

	main{
		position: relative;
		
		display: flex;
		flex-direction: column;
		
		overflow: auto;
		
		padding: 32px 0;
		min-height: 200px;
		
		background-color: white;
	}
	:host([fullscreen]) main {
	    margin: 32px;
	}
	
	header {
		font-size: 1.25em;
		margin: 0 32px 1em;
	}
	.content {
		overflow: auto;
		padding: 0 32px;
	}
	footer {
		margin: 1em 32px 0;
	}
	
	.close {
		position: absolute;
		right: 0;
		top: 0;
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

	close(): void {
		this.dispatchEvent(new CustomEvent(UiDialog.Events.UI_DIALOG_CLOSE, {
			bubbles: true,
			composed: true,
		}));
	}
}
