import {
    darculaTheme,
    monokaiTheme,
    blackFoxConsoleTheme,
} from "../lib/color-theme/theme";
import {
    Action,
    dispatchAscAction,
    EVENT_ASC_ACTION,
    IEventAction,
} from "../lib/com";
import { defineTheme } from "./monaco/define-theme";
import { insertThemeAction } from "./monaco/insert-theme-action";

export class AscInAppService {
    private _isMonacoInitialized: boolean = false;
    private _pendingAction: IEventAction | undefined;

    constructor() {
        this._init();
    }

    initializeThemes(): void {
        [monokaiTheme, darculaTheme, blackFoxConsoleTheme].forEach((theme) => {
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
        window.addEventListener(EVENT_ASC_ACTION, (event) => {
            this._onAscAction(event.detail);
        });

        this._waitForMonaco().then(() => {
            this.initializeThemes();
            this._isMonacoInitialized = true;

            dispatchAscAction({ action: Action.MAIN_MONACO_READY });
            this._onAscAction(undefined);
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

    private _onAscAction(event: IEventAction | undefined): void {
        if (!this._isMonacoInitialized) {
            this._pendingAction = event;

            return;
        }
        if (!event && !this._pendingAction) {
            return;
        }

        const todoAction = event ?? this._pendingAction;
        this._pendingAction = undefined;

        switch (todoAction.action) {
            case Action.CS_INSERT_THEME_ACTION:
                this.initializeThemes();

                break;

            case Action.CS_RESET_THEME:
                this.resetTheme();

                break;

            case Action.CS_SET_THEME:
                this.setTheme(todoAction.themeName ?? undefined);

                break;

            default:
                break;
        }
    }

    static init(): void {
        if (window["__ascInAppService__"]) {
            return;
        }

        window["__ascInAppService__"] = new AscInAppService();
    }
}

declare global {
    interface Window {
        __ascInAppService__?: AscInAppService;
    }
}
