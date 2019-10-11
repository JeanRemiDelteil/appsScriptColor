import {Folders} from './virtual-folder';
import {UiMenu} from './ui-menu';
import {colorTheme, themeService} from './color-theme';
import {ItemHorizontalSeparator, ItemSubMenu} from './ui-menu/item';


function initAppsScriptColor() {
	const scriptKey = document.location.pathname.match(/\/([^\/]+?)\/edit/)[1];
	
	const colorMenu = new UiMenu(
		'Colors',
		() => [
			...themeService.themeNames.map(themeName => new ItemSubMenu(themeName, colorTheme.applyTheme)),
			new ItemHorizontalSeparator(),
			new ItemSubMenu('Custom themes', colorTheme.customizeTheme),
		],
		colorTheme.getCurrentThemeName,
	);
	const folders = new Folders(scriptKey);
	
	colorTheme.init();
	folders.init();
	colorMenu.init();
	
	themeService.subscribe(colorMenu.updateItems);
}


// Only execute if the current page is in editing mode
/\/edit$/.test(document.location.pathname) && initAppsScriptColor();
