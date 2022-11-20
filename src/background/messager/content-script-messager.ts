import { IMessagerEvent } from "../event";

export const sendMessageToBack = (event: IMessagerEvent) => {
    chrome.runtime.sendMessage(event);
};
