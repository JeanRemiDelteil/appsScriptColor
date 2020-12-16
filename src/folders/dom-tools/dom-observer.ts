interface ISetDomObserverOptions {
	target: HTMLElement,
	callback: (node: HTMLElement) => void,
	immediateChildValidator?: (node: HTMLElement) => boolean,
	childSelector?: string,
	childValidator?: (node: HTMLElement) => boolean,
}


/**
 * Wait for a specific node to be added in the DOM by the page
 */
export const setDomObserver = ({
	target,
	immediateChildValidator,
	childSelector,
	childValidator,
	callback,
}: ISetDomObserverOptions): void => {
	const observerCB: MutationCallback = function (mutations, observer) {
		mutations.forEach(mutation => {
			for (let item in mutation.addedNodes) {
				if (!mutation.addedNodes.hasOwnProperty(item)) continue;

				let node = mutation.addedNodes[item] as HTMLElement;
				if (immediateChildValidator && !immediateChildValidator(node)) continue;

				if (!childSelector) {
					callback(node);
					continue;
				}

				let domChild;
				if (!childValidator) {
					domChild = node.querySelector(childSelector);
				}
				else {
					const domChildren = node.querySelectorAll(childSelector);
					domChild = Array.from(domChildren)
						.find(childValidator);
				}

				if (!domChild) continue;

				callback(domChild as HTMLElement);
			}
		});
	};

	let observer = new MutationObserver(observerCB);

	// pass in the target node, as well as the observer options
	observer.observe(target, {
		childList: true,
		attributes: false,
		characterData: false, /*,
		 subtree: false,
		 attributeOldValue: false,
		 characterDataOldValue: false,
		 attributeFilter: []
		 */
	});
};
