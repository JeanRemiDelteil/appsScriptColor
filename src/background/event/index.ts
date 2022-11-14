import {
    IInitServiceEvent,
    IResetThemeEvent,
    ISetThemeEvent,
} from "./theme.event";

export type IMessagerEvent =
    | IInitServiceEvent
    | IResetThemeEvent
    | ISetThemeEvent;
