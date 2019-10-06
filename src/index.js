import {Folders} from './virtual-folder';
import {UiMenu} from './ui-menu';
import {colorTheme, themeNames} from './color-theme';


// Only execute if the current page is in editing mode
if (/\/edit$/.test(document.location.pathname)) {
	const colorMenu = new UiMenu(themeNames, colorTheme.applyTheme, colorTheme.getCurrent);
	
	colorTheme.initColors();
	Folders.init();
	
	colorMenu.insert();
}
