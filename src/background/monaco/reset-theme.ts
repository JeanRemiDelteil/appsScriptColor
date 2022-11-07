import {monokaiTheme, darculaTheme} from "../../color-theme/theme";
import {insertThemeAction} from "./insert-theme-action";
import {runMonacoAction} from "./monaco";

export const resetTheme = function () {
    runMonacoAction(() => {
        console.log('resetTheme', window.monaco);

        window.monaco.editor.setTheme('apps-script-light');

        if (!window.jsWireMonacoEditor?._themeService._knownThemes.has('${monokaiTheme.themeName}')) {
            window.monaco.editor.defineTheme('Monokai', JSON.stringify(monokaiTheme.monacoTheme));
            window.monaco.editor.defineTheme('Darcula', JSON.stringify(darculaTheme.monacoTheme));
        }

        insertThemeAction();
    })
}
