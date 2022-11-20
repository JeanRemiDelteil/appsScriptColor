import { Action } from "../action.enum";
import { IEventBase } from "./base-action.interface";

export interface IEvent_ThemeChanged extends IEventBase {
    action: Action.ALL_THEME_CHANGED;
    themeName: string;
}
