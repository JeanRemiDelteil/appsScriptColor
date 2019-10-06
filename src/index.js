import {Folders} from './virtual-folder';
import {UiMenu} from './ui-menu';
import {colorTheme, themeNames} from './color-theme';

// Only execute if the current page is in editing mode
if (/\/edit$/.test(document.location.pathname)) {
	const scriptKey = document.location.pathname.match(/\/([^\/]+?)\/edit/)[1];
	
	const colorMenu = new UiMenu(themeNames, colorTheme.applyTheme, colorTheme.getCurrentThemeName);
	const folders = new Folders(scriptKey);
	
	colorTheme.init();
	folders.init();
	colorMenu.init();
}
