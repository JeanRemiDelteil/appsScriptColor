import { injectInTab } from "../injector";
import { BackgroundMessageEvent } from "./message-event.enum";

export class BackgroundMessager {
    constructor() {
        this._initialize();
    }

    private _initialize(): void {
        chrome.runtime.onMessage.addListener(
            (request: { event: BackgroundMessageEvent }, sender) => {
                console.log('RECEIVED', request, sender);

                if (!sender.tab || !request.event) return;

                switch (request.event) {
                    case BackgroundMessageEvent.INJECT:
                        injectInTab(sender.tab, () => {
                            console.log('injected', window.monaco)
                        });

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