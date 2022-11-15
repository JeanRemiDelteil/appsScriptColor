export const EVENT_THEME_CHANGED = "EVENT_THEME_CHANGED";
export type EVENT_THEME_CHANGED = string;

declare global {
    interface WindowEventMap {
        [EVENT_THEME_CHANGED]: CustomEvent<EVENT_THEME_CHANGED>;
    }
}

export const dispatchEventThemeChanged = (themeName: EVENT_THEME_CHANGED) =>
    window.dispatchEvent(
        new CustomEvent(EVENT_THEME_CHANGED, { detail: themeName })
    );
