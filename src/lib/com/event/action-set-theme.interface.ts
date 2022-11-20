import { Action } from "../action.enum";
import { IEventBase } from "./base-action.interface";

export interface IEvent_SetTheme extends IEventBase {
    action: Action.CS_SET_THEME;
    themeName: string;
}
