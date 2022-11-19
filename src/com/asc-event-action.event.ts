import { IEventAction } from "./event";

export const EVENT_ASC_ACTION = "EVENT_ASC_ACTION";
export type EVENT_ASC_ACTION = IEventAction;

declare global {
    interface WindowEventMap {
        [EVENT_ASC_ACTION]: CustomEvent<EVENT_ASC_ACTION>;
    }
}

export const dispatchEventAscAction = (event: IEventAction) => {
    console.log(EVENT_ASC_ACTION, event);

    window.dispatchEvent(new CustomEvent(EVENT_ASC_ACTION, { detail: event }));
};
