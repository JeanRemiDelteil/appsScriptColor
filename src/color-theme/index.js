import {ColorTheme} from './class/colorTheme';
import {themeService} from './service/theme.service';

export {CustomizeTheme} from './element/customizeTheme';

export const colorTheme = new ColorTheme(themeService);
export {
	themeService,
};
