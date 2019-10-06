export class UiMenu {
	
	/**
	 * @param {string[]} items
	 * @param {function} onItemActionCallback
	 * @param {function} getSelectedItem
	 */
	constructor(items, onItemActionCallback, getSelectedItem) {
		this._items = items;
		this._onItemActionCallback = onItemActionCallback;
		this._getSelectedItem = getSelectedItem;
		
		this.menuColorState = false;
	}
	
	
	/**
	 * @param {HTMLElement} domSubMenu
	 * @param {string} menuLabel
	 * @param {function} callBack
	 */
	_addSubMenuItem(domSubMenu, menuLabel, callBack) {
		const domItem = document.createElement('div');
		domItem.classList.add('goog-menuitem', 'apps-menuitem');
		
		domItem.innerHTML = `
<div class="goog-menuitem-content" style="-webkit-user-select: none;">
	<div class="docs-icon goog-inline-block goog-menuitem-icon asc-menu-item-icon" data-theme="${menuLabel}" style="-webkit-user-select:none;">
		<div class="docs-icon-img-container docs-icon-img docs-icon-arrow-more" style="-webkit-user-select: none;"></div>
	</div>
	<span class="goog-menuitem-label" style="-webkit-user-select: none;">${menuLabel}</span>
</div>`;
		
		domSubMenu.appendChild(domItem);
		
		// add function listeners
		domItem.addEventListener('mouseenter', () => {
			domItem.classList.toggle('goog-menuitem-highlight', true);
		});
		domItem.addEventListener('mouseleave', () => {
			domItem.classList.toggle('goog-menuitem-highlight', false);
		});
		domItem.addEventListener('click', callBack);
	}
	
	_insertMenuButton() {
		document.head.insertAdjacentHTML('beforeend', `<style>.asc-menu-item-icon{display: none;}.asc-menu-item-icon-display{display: inherit;}</style>`);
		
		const googleScriptMenu = document.getElementById('docs-menubar');
		// no menu, we quit now
		if (!googleScriptMenu) return;
		
		let menuColor = '<div id="macros-color-menu" class="menu-button goog-control goog-inline-block" style="-webkit-user-select: none;">Colors</div>';
		
		const domMenuColorSub = document.createElement('div');
		domMenuColorSub.classList.add('goog-menu', 'goog-menu-vertical', 'goog-menu-noaccel', 'docs-menu-hide-mnemonics');
		domMenuColorSub.setAttribute('style', 'display: None;');
		
		// add menu item for each theme
		this._items.forEach(item => {
			this._addSubMenuItem(
				domMenuColorSub,
				item,
				() => {
					this._onItemActionCallback(item);
					
					domMenuColor.classList.toggle('goog-control-open', false);
					domMenuColorSub.setAttribute('style', 'display: None;');
				},
			);
		});
		
		// insert Menu
		googleScriptMenu.insertAdjacentHTML('beforeend', menuColor);
		// insert SubMenu
		document.body.appendChild(domMenuColorSub);
		
		const domMenuColor = document.getElementById('macros-color-menu');
		const domMenuShield = document.getElementById('docs-menu-shield');
		
		// add similar behaviour then other menu buttons
		domMenuColor.addEventListener('mouseenter', function () {
			domMenuColor.classList.toggle('goog-control-hover', true);
		});
		domMenuColor.addEventListener('mouseleave', function () {
			domMenuColor.classList.toggle('goog-control-hover', false);
		});
		
		// display the menu
		domMenuColor.addEventListener('click', () => {
			
			let domItemIcons = domMenuColorSub.querySelectorAll('.asc-menu-item-icon');
			for (let i = 0; i < domItemIcons.length; i++) {
				domItemIcons[i].classList.toggle('asc-menu-item-icon-display', (domItemIcons[i].getAttribute('data-theme') === this._getSelectedItem()));
			}
			
			domMenuColor.classList.toggle('goog-control-hover', false);
			domMenuColor.classList.toggle('goog-control-open', true);
			
			let menuRect = domMenuColor.getBoundingClientRect();
			
			domMenuColorSub.setAttribute('style',
				`user-select: none;
visibility: visible;
left: ${menuRect.left}px;
top: ${menuRect.bottom}px;`,
			);
			
			domMenuShield.setAttribute('style',
				`left: ${menuRect.left + 1}px;
top: ${menuRect.bottom - 1}px;
width: ${menuRect.width - 2}px;
height: 7px;`,
			);
			
			this.menuColorState = true;
		});
		
		// Close menu when click event on document
		document.body.addEventListener('click', (event) => {
			if (!this.menuColorState) return;
			
			for (let i = 0; i < event['path'].length; i++) {
				if (event['path'][i] === domMenuColorSub || event['path'][i] === domMenuColor) return;
			}
			
			domMenuColor.classList.toggle('goog-control-open', false);
			domMenuColorSub.setAttribute('style', 'display: None;');
		});
	}
	
	
	init(){
		this._insertMenuButton();
	}
	
}
