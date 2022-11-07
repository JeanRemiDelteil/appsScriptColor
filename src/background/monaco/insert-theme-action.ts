import {settingsService} from "../../storage";

export const insertThemeAction = () => {
    console.log('insertThemeAction');

    // Add a command for themes
    window.jsWireMonacoEditor.addAction({
        id: 'asc-set-theme-monokai',
        label: 'AppsScriptColor: Use dark theme: Monokai',

        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,

        run: function () {
            window.monaco.editor.setTheme('Monokai');
            settingsService.setterForThemeInUse('Monokai');
        }
    })
    window.jsWireMonacoEditor.addAction({
        id: 'asc-set-theme-darcula',
        label: 'AppsScriptColor: Use dark theme: Darcula',

        precondition: null,
        keybindingContext: null,
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,

        run: function () {
            window.monaco.editor.setTheme('Darcula');
            settingsService.setterForThemeInUse('Darcula');
        }
    })
}