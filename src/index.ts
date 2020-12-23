import './__webComponents';
// webComponents import MUST BE FIRST
import { CustomizeTheme, ThemeSelector, ThemeService } from './color-theme';
import { detectIde, getScriptKey, IdeVersion } from './feature-detection';
import { setupIdeDomWatcher } from './feature-detection/newIdeDomWatcher';
import { Folders } from './folders';
import { UiMenu } from './ui-menu';
import { ItemHorizontalSeparator, ItemSubMenu } from './ui-menu/item';
import { FoldersOld } from './virtual-folder-old';


function initAppsScriptColor(scriptKey: string): void {
	const ideVersion = detectIde();

	if (ideVersion === IdeVersion.OLD) {
		const themeService = new ThemeService();
		themeService.setCurrentTheme(themeService.currentTheme.themeName);

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

	const themeService = new ThemeService();

	Folders.init(scriptKey);
	ThemeSelector.init(themeService);

	setupIdeDomWatcher();
}

// TODO: listen to navigation event on script.google.com to react to scriptKey changes
const scriptKey = getScriptKey();
scriptKey && initAppsScriptColor(scriptKey);
