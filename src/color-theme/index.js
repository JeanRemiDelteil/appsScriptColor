import {ColorTheme} from './class/colorTheme';
import {themeService} from './service/theme.service';
import {CustomizeTheme} from './element/customizeTheme';

export const colorTheme = new ColorTheme(themeService, CustomizeTheme);
export {
	themeService,
};
