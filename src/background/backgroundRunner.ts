import { BackgroundMessager } from "./messager";

export class BackgroundRunner {
    constructor() {
        this._registerContentScript();

        BackgroundMessager.init();
    }

    private _registerContentScript() {
        chrome.scripting
            .unregisterContentScripts()
            .then(() => {
                return chrome.scripting.registerContentScripts([
                    {
                        id: "injectColor",
                        matches: ["https://script.google.com/*"],
                        js: ["injectColor.js"],
                        runAt: "document_start",
                        world: "MAIN",
                    },
                ]);
            })
            .then((res) => console.log("Script registered succefully", res))
            .catch((err) => console.error("Script registering error", err));
    }

    static init(): void {
        new BackgroundRunner();
    }
}
