import {IMonacoTheme} from "../../color-theme";
import {darculaTheme, monokaiTheme} from "../../color-theme/theme";
import {insertThemeAction} from "./insert-theme-action";

export const setTheme = (themeName: string) => {
    let theme: IMonacoTheme;

    if (themeName === darculaTheme.themeName) {
        theme = darculaTheme.monacoTheme;
    } else if (themeName === monokaiTheme.themeName) {
        theme = monokaiTheme.monacoTheme;
    }

    return () => {
        if (!window.jsWireMonacoEditor._themeService._knownThemes.has(themeName)) {
            window.monaco.editor.defineTheme(themeName, JSON.stringify(theme));
        }
        window.monaco.editor.setTheme(themeName);

        insertThemeAction();
    }
}