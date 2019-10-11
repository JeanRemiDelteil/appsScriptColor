import {Item} from './item';

export class ItemSubMenu extends Item {
	
	constructor(label, callback) {
		super();
		
		this.label = label;
		this.callback = callback;
	}
	
	
	getItem() {
		const domItem = document.createElement('div');
		domItem.classList.add('goog-menuitem', 'apps-menuitem');
		
		domItem.innerHTML = `
<div class="goog-menuitem-content" style="-webkit-user-select: none;">
	<div class="docs-icon goog-inline-block goog-menuitem-icon asc-menu-item-icon" data-theme="${this.label}" style="-webkit-user-select:none;">
		<div class="docs-icon-img-container docs-icon-img docs-icon-arrow-more" style="-webkit-user-select: none;"></div>
	</div>
	<span class="goog-menuitem-label" style="-webkit-user-select: none;">${this.label}</span>
</div>`;
		
		// add function listeners
		domItem.addEventListener('mouseenter', () => {
			domItem.classList.toggle('goog-menuitem-highlight', true);
		});
		domItem.addEventListener('mouseleave', () => {
			domItem.classList.toggle('goog-menuitem-highlight', false);
		});
		domItem.addEventListener('click', () => {
			this.callback(this.label);
			
			this.itemUsed(domItem);
		});
		
		return domItem;
	}
	
}
