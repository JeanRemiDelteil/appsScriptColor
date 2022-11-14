import { IMessagerEvent } from "../event";
import { injectInTab, injectScriptInTab } from "../injector";
import { BackgroundMessageEvent } from "./message-event.enum";
import { useTheme } from "../monaco/script-use-theme/use-theme";
import { filename as initServiceFilename } from "../monaco/asc-in-app-service/filename.const";
import { resetTheme } from "../monaco/script-reset-theme/reset-theme";

export class BackgroundMessager {
    constructor() {
        this._initialize();
    }

    private _initialize(): void {
        chrome.runtime.onMessage.addListener(
            (request: IMessagerEvent, sender) => {
                // console.log("RECEIVED", request, sender);

                if (!sender.tab || !request.event) return;

                switch (request.event) {
                    case BackgroundMessageEvent.INIT_SERVICE:
                        injectScriptInTab(sender.tab, initServiceFilename);

                        break;

                    case BackgroundMessageEvent.RESET_THEME:
                        injectInTab(sender.tab, resetTheme);

                        break;

                    case BackgroundMessageEvent.SET_THEME:
                        injectInTab(sender.tab, useTheme, [request.theme]);

                        break;

                    default:
                        break;
                }
            }
        );
    }

    static init(): void {
        new BackgroundMessager();
    }
}
