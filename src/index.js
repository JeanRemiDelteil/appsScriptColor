import {ColorTheme} from './color-theme';
import {Folders} from './virtual-folder';
import {themeNames} from './color-theme/theme';
import {UiMenu} from './uiMenu/uiMenu';


// Only execute if the current page is in editing mode
if (/\/edit$/.test(document.location.pathname)) {
	const colorTheme = new ColorTheme();
	const colorMenu = new UiMenu(themeNames, colorTheme.applyTheme, colorTheme.getCurrent);
	
	colorTheme.initColors();
	colorMenu.insert();
	
	Folders.insertCSS();
	Folders.waitInitialization();
}
