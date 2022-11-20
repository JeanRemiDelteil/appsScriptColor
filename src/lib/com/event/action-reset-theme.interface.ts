import { Action } from "../action.enum";
import { IEventBase } from "./base-action.interface";

export interface IEvent_ResetTheme extends IEventBase {
    action: Action.CS_RESET_THEME;
}
