import { IMessagerEvent } from "../event";
import { injectInTab, injectScriptInTab } from "../injector";
import { BackgroundMessageEvent } from "./message-event.enum";
import { setTheme } from "../monaco/set-theme";

export class BackgroundMessager {
    constructor() {
        this._initialize();
    }

    private _initialize(): void {
        chrome.runtime.onMessage.addListener(
            (request: IMessagerEvent, sender) => {
                console.log("RECEIVED", request, sender);

                if (!sender.tab || !request.event) return;

                switch (request.event) {
                    case BackgroundMessageEvent.RESET_THEME:
                        injectScriptInTab(sender.tab, "resetTheme.js");

                        break;

                    case BackgroundMessageEvent.SET_THEME:
                        injectInTab(sender.tab, setTheme(request.theme));

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
