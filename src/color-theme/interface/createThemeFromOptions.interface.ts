import {IVariables} from './variables.interface';
import {IRule} from './rule.interface';

export interface ICreateThemeFromOptions {
	themeName: string;
	variables?: IVariables;
	rules?: IRule;
}
