import { BackgroundMessageEvent } from "../messager/message-event.enum";
import { IMessagerEventBase } from "./event.interface";

export interface IResetThemeEvent extends IMessagerEventBase {
    event: BackgroundMessageEvent.RESET_THEME;
}

export interface ISetThemeEvent extends IMessagerEventBase {
    event: BackgroundMessageEvent.SET_THEME;
    theme: string;
}
