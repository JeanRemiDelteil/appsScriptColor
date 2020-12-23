import { detectIde } from './environmentDetection';
import { dispatchEventIdeDomHidden, dispatchEventIdeDomUpdated } from './event';
import { IdeVersion } from './ide-version.enum';


const isCWizCodeIde = (node: HTMLElement): boolean => {
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


export const setupIdeDomWatcher = () => {
	const domFirstRendered = document.body.querySelector('body > div > c-wiz') as HTMLElement;
	const domWatchedDiv = domFirstRendered.parentElement;
	const isDomFirstRenderedIDE = isCWizCodeIde(domFirstRendered);

	let dynRefToEditorJsRenderer = isDomFirstRenderedIDE ? domFirstRendered.getAttribute('jsrenderer') : undefined;
	let isIdeShown = isDomFirstRenderedIDE;

	const observer = new MutationObserver(mutations => {
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
								       !dynRefToEditorJsRenderer && isCWizCodeIde(node)
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

			window.requestAnimationFrame(() => dispatchEventIdeDomUpdated({ node }));
		});

		if (
			!ideNodeFound
			&& isIdeShown
			&& !document.body.querySelector(`c-wiz[jsrenderer="${ dynRefToEditorJsRenderer }"][aria-hidden="false"]`)
			&& detectIde() !== IdeVersion.MONACO
		) {
			isIdeShown = false;

			window.requestAnimationFrame(() => dispatchEventIdeDomHidden());
		}
	});
	observer.observe(domWatchedDiv, {
		childList: true,
		attributes: false,
		characterData: false,
	});

	// fire first event
	isDomFirstRenderedIDE && dispatchEventIdeDomUpdated({ node: domFirstRendered as HTMLElement });
};
