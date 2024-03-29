import { detectIde, getScriptKey } from "./environmentDetection";
import { IdeVersion } from "./ideVersion.enum";

interface INavigationCallbackParam {
    scriptKey: string;
}

export enum NavigationEvent {
    SCRIPT_OPEN = "SCRIPT_OPEN",
    SCRIPT_CLOSE = "SCRIPT_CLOSE",
}

export class NavigationDetection {
    private _interval: number;
    private _location: string;
    private _ideVersion: IdeVersion;
    private _scriptKey: string;

    constructor(
        private _eventMap: {
            [event: string]: (param: INavigationCallbackParam) => void;
        }
    ) {
        window.setTimeout(() => {
            this._interval = window.setInterval(
                () => this._checkLocation(),
                50
            );
        }, 1500);
    }

    private _checkLocation() {
        // Quick OUT
        if (document.location.pathname === this._location) return;

        const previousScriptKey = this._scriptKey;

        this._location = document.location.pathname;
        this._ideVersion = detectIde();
        this._scriptKey = getScriptKey();

        if (previousScriptKey === this._scriptKey) return;

        this._fireEvent(
            this._scriptKey
                ? NavigationEvent.SCRIPT_OPEN
                : NavigationEvent.SCRIPT_CLOSE
        );
    }

    private _fireEvent(event: NavigationEvent) {
        const callback = this._eventMap[event];
        if (!callback) return;

        callback({
            scriptKey: this._scriptKey,
        });
    }

    static init(eventMap: {
        [event: string]: (param: INavigationCallbackParam) => void;
    }) {
        new NavigationDetection(eventMap);
    }
}
