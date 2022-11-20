export const EVENT_IDE_DOM_HIDDEN = "EVENT_IDE_DOM_HIDDEN";
export type EVENT_IDE_DOM_HIDDEN = void;

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface WindowEventMap {
        [EVENT_IDE_DOM_HIDDEN]: CustomEvent<EVENT_IDE_DOM_HIDDEN>;
    }
}

export const dispatchEventIdeDomHidden = () => {
    // console.log(EVENT_IDE_DOM_HIDDEN);

    window.dispatchEvent(new CustomEvent(EVENT_IDE_DOM_HIDDEN));
};
