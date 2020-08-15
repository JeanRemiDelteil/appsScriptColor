export interface Item {
	getItem(): HTMLElement;
}

export class Item implements Item {

	itemUsed(item: HTMLDivElement) {
		item.dispatchEvent(new CustomEvent('menu-item-used', {
			bubbles: true,
		}));
	}

}
