import { setDomObserver } from '../folders/dom-tools';
import { dispatchEventIdeDomUpdated } from './event';


export const setupIdeDomWatcher = () => {
	const domFirstRendered = document.body.querySelector('body > div > c-wiz');
	const domWatchedDiv = domFirstRendered.parentElement;
	const dynRefToEditorJsRenderer = domFirstRendered.getAttribute('jsrenderer');

	setDomObserver({
		target: domWatchedDiv,
		immediateChildValidator: node => {
			return node.tagName === 'C-WIZ' && node.getAttribute('jsrenderer') === dynRefToEditorJsRenderer;
		},
		callback: node => dispatchEventIdeDomUpdated({ node }),
	});

	// fire first event
	dispatchEventIdeDomUpdated({ node: domFirstRendered as HTMLElement });
};
