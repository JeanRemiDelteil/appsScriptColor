import { BackgroundMessageEvent } from "./message-event.enum";
import { IMessagerEventBase } from "./event.interface";

export interface IInitServiceEvent extends IMessagerEventBase {
    event: BackgroundMessageEvent.INIT_SERVICE;
}
