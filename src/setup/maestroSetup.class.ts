import { CustomizeTheme, ThemeService } from '../color-theme';
import { UiMenu } from '../ui-menu';
import { ItemHorizontalSeparator, ItemSubMenu } from '../ui-menu/item';
import { FoldersOld } from '../virtual-folder-old';


export class MaestroSetup {
	static init(scriptKey: string) {
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
	}

	static destroy() {}
}
