import { IEvent_InsertTheme } from "./insert-theme-action.interface";
import { IEvent_SetTheme } from "./action-set-theme.interface";
import { IEvent_ResetTheme } from "./action-reset-theme.interface";
import { IEvent_MonacoReady } from "./action-monaco-ready.interface";
import { IEvent_ThemeChanged } from "./action-theme-changed.interface";

export * from "./insert-theme-action.interface";
export * from "./base-action.interface";

export type IEventAction =
    // ALL
    | IEvent_ThemeChanged

    // CS
    | IEvent_InsertTheme
    | IEvent_SetTheme
    | IEvent_ResetTheme

    // MAIN
    | IEvent_MonacoReady;
