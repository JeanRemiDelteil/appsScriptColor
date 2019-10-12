export class Item {
	
	/**
	 * @return {HTMLElement}
	 */
	getItem() {}
	
	/**
	 * @param {HTMLDivElement} item
	 */
	itemUsed(item) {
		item.dispatchEvent(new CustomEvent('menu-item-used', {
			bubbles: true,
		}));
	}
	
}
