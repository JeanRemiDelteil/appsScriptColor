import { IMonacoTheme } from "./monacoTheme.interface";
import { IVariables } from "./variables.interface";
import { IRule } from "./rule.interface";

export interface ICssThemeOptions {
    themeName: string;
    isDarkTheme: boolean;
    variables: IVariables;
    rules: IRule;
    rootTheme?: string;
    monacoTheme?: IMonacoTheme;
}
