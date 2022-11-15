import { IMessagerEvent } from "../event";
import { BackgroundMessageEvent } from "./message-event.enum";

export const sendMessageToBack = (event: IMessagerEvent) => {
    chrome.runtime.sendMessage(event);
};
