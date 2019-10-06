import {BlackFoxConsoleTheme} from './blackFoxConsole.theme';
import {DarculaTheme} from './darcula.theme';
import {DefaultTheme} from './default.theme';

export const themes = {
	[BlackFoxConsoleTheme.themeName]: BlackFoxConsoleTheme,
	[DarculaTheme.themeName]: DarculaTheme,
	[DefaultTheme.themeName]: DefaultTheme,
};

export const themeNames = [
	BlackFoxConsoleTheme.themeName,
	DarculaTheme.themeName,
	DefaultTheme.themeName,
];

export const defaultTheme = DefaultTheme;
