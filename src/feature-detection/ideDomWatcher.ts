import { detectIde } from './environmentDetection';
import { dispatchEventIdeDomHidden, dispatchEventIdeDomUpdated } from './event';
import { IdeVersion } from './ideVersion.enum';


export class IdeDomWatcher {
	private static _observer: MutationObserver;
	private static _animationFrameRef: number;

	private static _isCWizCodeIde = (node: HTMLElement): boolean => {
		const domFirstLink = node.querySelector('div[role="link"]');
		if (!domFirstLink) return false;

		const domCodeLink = Array.from(domFirstLink.parentElement.children)
			.find(domLink => {
				const domIcon = domLink.querySelector('i.google-material-icons');
				if (!domIcon) return;

				// Is the icon the "code" icon ?
				return domIcon.textContent === 'code';
			});
		if (!domCodeLink) return false;

		// Simple check to detect active link. To complexifie later if it's not valid anymore
		return domCodeLink.classList.length === 2;
	};

	static init() {
		const domFirstRendered = document.body.querySelector('body > div > c-wiz') as HTMLElement;
		const domWatchedDiv = domFirstRendered.parentElement;
		const isDomFirstRenderedIDE = this._isCWizCodeIde(domFirstRendered);

		let dynRefToEditorJsRenderer = isDomFirstRenderedIDE ? domFirstRendered.getAttribute('jsrenderer') : undefined;
		let isIdeShown = isDomFirstRenderedIDE;

		this._observer = new MutationObserver(mutations => {
			let ideNodeFound = false;

			mutations.forEach(mutation => {
				const node = Array.from(mutation.addedNodes)
					.find((node: HTMLElement) => {
							return node.tagName === 'C-WIZ'
							       && (
								       (
									       dynRefToEditorJsRenderer
									       && node.getAttribute('jsrenderer') === dynRefToEditorJsRenderer
								       ) || (
									       !dynRefToEditorJsRenderer && this._isCWizCodeIde(node)
								       )
							       );
						},
					) as HTMLElement;
				if (!node) return;

				if (!dynRefToEditorJsRenderer) {
					dynRefToEditorJsRenderer = node.getAttribute('jsrenderer');
				}

				ideNodeFound = true;
				isIdeShown = true;

				window.cancelAnimationFrame(this._animationFrameRef);
				this._animationFrameRef = window.requestAnimationFrame(() => dispatchEventIdeDomUpdated({ node }));
			});

			if (
				!ideNodeFound
				&& isIdeShown
				&& !document.body.querySelector(`c-wiz[jsrenderer="${ dynRefToEditorJsRenderer }"][aria-hidden="false"]`)
				&& detectIde() !== IdeVersion.MONACO
			) {
				isIdeShown = false;

				window.cancelAnimationFrame(this._animationFrameRef);
				this._animationFrameRef = window.requestAnimationFrame(() => dispatchEventIdeDomHidden());
			}
		});
		this._observer.observe(domWatchedDiv, {
			childList: true,
			attributes: false,
			characterData: false,
		});

		// fire first event
		isDomFirstRenderedIDE && dispatchEventIdeDomUpdated({ node: domFirstRendered as HTMLElement });
	}

	static destroy() {
		this._observer?.disconnect();
		this._observer = undefined;

		window.cancelAnimationFrame(this._animationFrameRef);
		this._animationFrameRef = undefined;
	}
}
