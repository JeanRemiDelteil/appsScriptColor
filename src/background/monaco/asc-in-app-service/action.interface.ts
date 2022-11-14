import { InAppAction } from "./actions.enum";

export interface IInAppAction {
    action: keyof typeof InAppAction;

    themeName?: string;
}
