export class CssTheme {
	
	constructor({themeName, variables, rules, rootTheme = ''}) {
		/**
		 * @private
		 */
		this._themeName = themeName;
		/**
		 * @private
		 */
		this._variables = variables;
		/**
		 * @private
		 */
		this._rules = rules;
		/**
		 * @type {string}
		 * @private
		 */
		this._rootTheme = rootTheme;
	}
	
	get css() {
		return CssTheme._cssBuilder(this._rules, this._variables);
	}
	
	get themeName() {
		return this._themeName;
	}
	
	get rootTheme() {
		return this._rootTheme;
	}
	
	
	/**
	 * Compose rules string with variables
	 *
	 * @param rules
	 * @param variables
	 */
	static _cssBuilder(rules, variables) {
		let cssSheet = '';
		
		for (let selector in rules) {
			// build one rule
			let propertyStr = '';
			let cssSettings = rules[selector];
			
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
	 * Overridden when using createFrom()
	 *
	 * @return {{themeName: *, variables: *, rootTheme: string, rules: *}}
	 */
	toObject() {
		return {
			rootTheme: this._rootTheme,
			themeName: this._themeName,
			variables: this._variables,
			rules: this._rules,
		};
	}
	
	toJSON() {
		return JSON.stringify(this.toObject());
	}
	
	
	/**
	 * @param themeName
	 * @param variables
	 * @param rules
	 *
	 * @return {CssTheme}
	 */
	createFrom({themeName, variables = {}, rules = {}}) {
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
			rootTheme: this._themeName,
		});
		
		// Only export variation when stringify a copied theme
		createdTheme.toObject = function () {
			return {
				rootTheme: this._rootTheme,
				themeName: this._themeName,
				variables: variables,
				rules: rules,
			};
		};
		
		return createdTheme;
	}
	
}
