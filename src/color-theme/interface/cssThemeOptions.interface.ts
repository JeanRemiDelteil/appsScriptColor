import {IVariables} from './variables.interface';
import {IRule} from './rule.interface';

export interface ICssThemeOptions {
	themeName: string;
	variables: IVariables;
	rules: IRule;
	rootTheme?: string;
}
