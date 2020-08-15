import { IRule } from '../interface/rule.interface';
import { IVariables } from '../interface/variables.interface';
import { ICssThemeOptions } from '../interface/cssThemeOptions.interface';
import { ICreateThemeFromOptions } from '../interface/createThemeFromOptions.interface';


export class CssTheme {

	private readonly _themeName: string;
	private readonly _variables: IVariables;
	private readonly _rules: IRule;
	private readonly _rootTheme: string;

	constructor({themeName, variables, rules, rootTheme = ''}: ICssThemeOptions) {
		this._themeName = themeName;
		this._variables = variables;
		this._rules = rules;
		this._rootTheme = rootTheme;
	}


	get css(): string {
		return CssTheme._cssBuilder(this._rules, this._variables);
	}

	get themeName(): string {
		return this._themeName;
	}

	get rootTheme(): string {
		return this._rootTheme;
	}

	get variables(): IVariables {
		return this._variables;
	}


	/**
	 * Compose rules string with variables
	 */
	public static _cssBuilder(rules: IRule, variables: IVariables): string {
		let cssSheet = '';

		for (let selector in rules) {
			// build one rule
			const cssSettings = rules[selector];
			let propertyStr = '';

			for (let property in cssSettings) {
				// replace declared variables
				propertyStr += `${property}:${cssSettings[property]
					.replace(/{{([^}{]+?)}}/g, (m, p1) => p1 in variables ? variables[p1] : m)};`;
			}

			cssSheet += `${selector}{${propertyStr}}`;
		}

		return cssSheet;
	}


	/**
	 * Convert class instance to a simple Object,
	 * compatible with the class constructor
	 *
	 * Overridden when using createFrom()
	 */
	public toObject() {
		return {
			rootTheme: this._rootTheme,
			themeName: this._themeName,
			variables: this._variables,
			rules: this._rules,
		};
	}

	/**
	 * Export the theme as JSON
	 */
	public toJSON(): string {
		return JSON.stringify(this.toObject());
	}


	/**
	 * Create a new theme derived from the current one,
	 *
	 * the relationship remains, so that once exported to JSON
	 * it does not include the parent duplicated information
	 */
	public createFrom({themeName, variables = {}, rules = {}}: ICreateThemeFromOptions): CssTheme {
		const rootTheme = this._themeName;
		const createdTheme = new CssTheme({
			themeName,
			variables: {
				...this._variables,
				...variables,
			},
			rules: {
				...this._rules,
				...rules,
			},
			rootTheme: rootTheme,
		});

		// Only export variation when stringify a copied theme
		createdTheme.toObject = function () {
			return {
				rootTheme: rootTheme,
				themeName: themeName,
				variables: variables,
				rules: rules,
			};
		};

		return createdTheme;
	}

}
