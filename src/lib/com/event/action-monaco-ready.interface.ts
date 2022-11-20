import { Action } from "../action.enum";
import { IEventBase } from "./base-action.interface";

export interface IEvent_MonacoReady extends IEventBase {
    action: Action.MAIN_MONACO_READY;
}
