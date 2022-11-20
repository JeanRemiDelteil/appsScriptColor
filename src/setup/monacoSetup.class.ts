import { sendMessageToBack } from "../background/messager/content-script-messager";
import { BackgroundMessageEvent } from "../background/event/message-event.enum";
import { ThemeSelector, ThemeService } from "../color-theme";
import { IdeDomWatcher } from "../feature-detection";
import { Folders } from "../folders";

export class MonacoSetup {
    private static _themeService: ThemeService;
    private static _scriptKey: string;

    static init(scriptKey: string) {
        this._scriptKey = scriptKey;
        this._themeService = new ThemeService();

        sendMessageToBack({ event: BackgroundMessageEvent.INIT_SERVICE });

        Folders.init(this._scriptKey);
        ThemeSelector.init(this._themeService);

        IdeDomWatcher.init();
    }

    static destroy() {
        IdeDomWatcher.destroy();

        ThemeSelector.destroy();
        Folders.destroy();

        this._themeService?.destroy();
        this._themeService = undefined;
    }
}
