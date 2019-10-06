export class UiMenu {
	
	/**
	 * @param {string} menuTitle
	 * @param {Item[]} items
	 * @param {function} getSelectedItem
	 */
	constructor(menuTitle, items, getSelectedItem) {
		this._menuTitle = menuTitle;
		this._items = items;
		this._getSelectedItem = getSelectedItem;
		
		this.menuColorState = false;
	}
	
	
	_insertMenuButton() {
		document.head.insertAdjacentHTML('beforeend', `<style>.asc-menu-item-icon{display: none;}.asc-menu-item-icon-display{display: inherit;}</style>`);
		
		const googleScriptMenu = document.getElementById('docs-menubar');
		// no menu, we quit now
		if (!googleScriptMenu) return;
		
		const menuColor = `<div id="macros-color-menu" class="menu-button goog-control goog-inline-block" style="-webkit-user-select: none;">${this._menuTitle}</div>`;
		
		this._domMenuColorSub = document.createElement('div');
		this._domMenuColorSub.classList.add('goog-menu', 'goog-menu-vertical', 'goog-menu-noaccel', 'docs-menu-hide-mnemonics');
		this._domMenuColorSub.setAttribute('style', 'display: None;');
		
		// add menu item for each theme
		this._items.forEach(item => {
			this._domMenuColorSub.appendChild(item.getItem(() => {
				this._domMenuColor.classList.toggle('goog-control-open', false);
				this._domMenuColorSub.setAttribute('style', 'display: None;');
			}));
		});
		
		// insert Menu
		googleScriptMenu.insertAdjacentHTML('beforeend', menuColor);
		// insert SubMenu
		document.body.appendChild(this._domMenuColorSub);
		
		this._domMenuColor = document.getElementById('macros-color-menu');
		this._domMenuShield = document.getElementById('docs-menu-shield');
		
		// add similar behaviour then other menu buttons
		this._domMenuColor.addEventListener('mouseenter', () => this._onMenuTitleEnter());
		this._domMenuColor.addEventListener('mouseleave', () => this._onMenuTitleLeave());
		
		// display the menu
		this._domMenuColor.addEventListener('click', () => this._onMenuTitleClick());
		
		// Close menu when click event on document
		document.body.addEventListener('click', (event) => this._onBodyClick(event));
	}
	
	_onMenuTitleEnter() {
		this._domMenuColor.classList.toggle('goog-control-hover', true);
	}
	
	_onMenuTitleLeave() {
		this._domMenuColor.classList.toggle('goog-control-hover', false);
	}
	
	_onMenuTitleClick() {
		const domItemIcons = this._domMenuColorSub.querySelectorAll('.asc-menu-item-icon');
		for (let i = 0; i < domItemIcons.length; i++) {
			domItemIcons[i].classList.toggle('asc-menu-item-icon-display', (domItemIcons[i].getAttribute('data-theme') === this._getSelectedItem()));
		}
		
		this._domMenuColor.classList.toggle('goog-control-hover', false);
		this._domMenuColor.classList.toggle('goog-control-open', true);
		
		const menuRect = this._domMenuColor.getBoundingClientRect();
		
		this._domMenuColorSub.setAttribute('style',
			`user-select: none;
visibility: visible;
left: ${menuRect.left}px;
top: ${menuRect.bottom}px;`,
		);
		
		this._domMenuShield.setAttribute('style',
			`left: ${menuRect.left + 1}px;
top: ${menuRect.bottom - 1}px;
width: ${menuRect.width - 2}px;
height: 7px;`,
		);
		
		this.menuColorState = true;
	}
	
	_onBodyClick(event) {
		if (!this.menuColorState) return;
		
		for (let i = 0; i < event['path'].length; i++) {
			if (event['path'][i] === this._domMenuColorSub || event['path'][i] === this._domMenuColor) return;
		}
		
		this._domMenuColor.classList.toggle('goog-control-open', false);
		this._domMenuColorSub.setAttribute('style', 'display: None;');
	}
	
	
	init() {
		this._insertMenuButton();
	}
	
}
