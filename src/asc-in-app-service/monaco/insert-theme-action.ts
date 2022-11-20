import { CssTheme } from "../../lib/color-theme/class/cssTheme";
import { settingsService } from "../../lib/storage";

export const insertThemeAction = (theme: CssTheme) => {
    const actionId = `asc-set-theme-${theme.themeName.toLowerCase()}`;

    // Action insert guard
    if (window.jsWireMonacoEditor._actions[actionId]) {
        return;
    }

    // console.log(`insertThemeAction for ${theme.themeName}`);
    window.jsWireMonacoEditor.addAction({
        id: actionId,
        label: `AppsScriptColor: Use ${
            theme.isDarkTheme ? "dark" : "light"
        } theme: ${theme.themeName}`,

        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: "navigation",
        contextMenuOrder: Infinity,

        run: () => {
            window.monaco.editor.setTheme(theme.themeName);
            settingsService.setThemeInUse(theme.themeName);
        },
    });
};
