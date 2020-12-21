// webComponents import MUST BE FIRST
import './lib/webComponents';

import { CustomizeTheme, ThemeSelector, ThemeService } from './color-theme';
import { detectIde, getScriptKey, IdeVersion } from './feature-detection';
import { setupIdeDomWatcher } from './feature-detection/newIdeDomWatcher';
import { Folders } from './folders';
import { UiMenu } from './ui-menu';
import { ItemHorizontalSeparator, ItemSubMenu } from './ui-menu/item';
import { FoldersOld } from './virtual-folder-old';


function initAppsScriptColor(): void {
	const scriptKey = getScriptKey();
	const ideVersion = detectIde();

	if (ideVersion === IdeVersion.NOT_IDE) {
		return;
	}
	else if (ideVersion === IdeVersion.OLD) {
		const themeService = new ThemeService();

		const colorMenu = new UiMenu(
			'Colors',
			() => [
				...themeService.themeNames.map(themeName =>
					new ItemSubMenu(themeName, () => themeService.setCurrentTheme(themeName)),
				),
				new ItemHorizontalSeparator(),
				new ItemSubMenu('Custom themes', () => CustomizeTheme.open(themeService)),
			],
			() => themeService.currentTheme.themeName,
		);

		// Start folder system (old)
		new FoldersOld(scriptKey);

		colorMenu.init();

		themeService.subscribe(colorMenu.updateItems);

		return;
	}

	// Bootstrap current version tools
	Folders.init(scriptKey);

	const themeService = new ThemeService();
	ThemeSelector.insertThemeSelector(themeService);

	setupIdeDomWatcher();
}


// Only execute if the current page is in editing mode
/\/edit$/.test(document.location.pathname) && initAppsScriptColor();
