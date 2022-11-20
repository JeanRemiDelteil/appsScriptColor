import { Action } from "../action.enum";
import { IEventBase } from "./base-action.interface";

export interface IEvent_InsertTheme extends IEventBase {
    action: Action.CS_INSERT_THEME_ACTION;
}
