import { darculaTheme, monokaiTheme } from "../../../color-theme/theme";
import { defineTheme } from "../define-theme";
import { insertThemeAction } from "../insert-theme-action";
import { IInAppAction } from "./action.interface";
import { InAppAction } from "./actions.enum";
import { ASC_IN_APP_SERVICE_KEY } from "./asc-service-key.const";

export class AscInAppService {
    constructor() {
        this._init();
    }

    doAction(): void {
        const action = window.__ascInAppAction__;

        if (!action) {
            return;
        }

        switch (action.action) {
            case InAppAction.RESET:
                this.resetTheme();

                break;

            case InAppAction.SET:
                this.setTheme(action.themeName ?? undefined);

                break;
        }

        delete window.__ascInAppAction__;
    }

    initializeThemes(): void {
        [monokaiTheme, darculaTheme].forEach((theme) => {
            defineTheme(theme);
            insertThemeAction(theme);
        });
    }

    resetTheme(): void {
        this.setTheme();
    }

    setTheme(themeName?: string): void {
        window.monaco.editor.setTheme(themeName ?? "apps-script-light");
    }

    private _init() {
        this._waitForMonaco()
            .then(() => {
                this.initializeThemes();

                // console.log("Monaco initialized");
            })
            .then(() => {
                // do pending action if any
                this.doAction();
            });
    }

    private async _waitForMonaco(): Promise<void> {
        if (window.monaco && window.jsWireMonacoEditor) {
            return;
        }

        // Wait for monaco to be available

        return new Promise((resolve) => {
            const observer = new MutationObserver((mutations) => {
                mutations.some((mutation) => {
                    const domMonacoStyle = Array.from(mutation.addedNodes).find(
                        (node: Element & Node) =>
                            !(
                                node.tagName !== "STYLE" ||
                                !node.classList.contains("monaco-colors")
                            )
                    );
                    if (!domMonacoStyle) return false;

                    observer.disconnect();
                    resolve();
                    return true;
                });
            });

            observer.observe(document.head, {
                childList: true,
                attributes: false,
                characterData: false,
            });
        });
    }

    static init(): void {
        if (window[ASC_IN_APP_SERVICE_KEY]) {
            return;
        }

        window[ASC_IN_APP_SERVICE_KEY] = new AscInAppService();
    }
}

declare global {
    interface Window {
        __ascInAppService__?: AscInAppService;
        __ascInAppAction__?: IInAppAction;
    }
}
