import { CssTheme } from "../../color-theme/class/cssTheme";

export const defineTheme = (theme: CssTheme): void => {
    if (
        window.jsWireMonacoEditor?._themeService._knownThemes.has(
            theme.themeName
        )
    ) {
        return;
    }

    // console.log("add theme", theme.themeName);

    window.monaco.editor.defineTheme(theme.themeName, theme.monacoTheme);
};
