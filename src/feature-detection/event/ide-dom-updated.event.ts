export const EVENT_IDE_DOM_UPDATED = "EVENT_IDE_DOM_UPDATED";
export type EVENT_IDE_DOM_UPDATED = {
    node: HTMLElement;
};

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface WindowEventMap {
        [EVENT_IDE_DOM_UPDATED]: CustomEvent<EVENT_IDE_DOM_UPDATED>;
    }
}

export const dispatchEventIdeDomUpdated = (payload: EVENT_IDE_DOM_UPDATED) =>
    window.dispatchEvent(
        new CustomEvent(EVENT_IDE_DOM_UPDATED, {
            detail: { node: payload.node },
        })
    );
