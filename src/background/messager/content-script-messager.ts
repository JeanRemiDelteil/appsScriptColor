import { BackgroundMessageEvent } from "./message-event.enum";

export const sendMessageToBack = (event: BackgroundMessageEvent) => {
    chrome.runtime.sendMessage({ event });
}