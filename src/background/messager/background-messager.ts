import { IMessagerEvent, BackgroundMessageEvent } from "../event";
import { injectScriptInTab } from "../injector";
import { filename as initServiceFilename } from "../../asc-in-app-service/filename.const";

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
