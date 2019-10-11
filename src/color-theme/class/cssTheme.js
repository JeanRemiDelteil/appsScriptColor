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
					.replace(/{{(\w+)}}/g, (m, p1) => p1 in variables ? variables[p1] : m)};`;
			}
			
			cssSheet += `${selector}{${propertyStr}}`;
		}
		
		return cssSheet;
	}
	
	
	toJSON() {
		return JSON.stringify({
			rootTheme: this._rootTheme,
			themeName: this._themeName,
			variables: this._variables,
			rules: this._rules,
		});
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
		createdTheme.toJSON = function () {
			return JSON.stringify({
				rootTheme: this._rootTheme,
				themeName: this._themeName,
				variables: variables,
				rules: rules,
			});
		};
		
		return createdTheme;
	}
	
}
