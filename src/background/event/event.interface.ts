import { BackgroundMessageEvent } from "../messager/message-event.enum";

export interface IMessagerEventBase {
    event: BackgroundMessageEvent;
}
