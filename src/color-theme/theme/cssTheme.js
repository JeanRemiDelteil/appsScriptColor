export class CssTheme {
	
	static get _themeName() {
		return '';
	}
	static get _variables() {
		return {};
	}
	static get _rules() {
		return {};
	}
	
	// noinspection JSUnusedGlobalSymbols
	static get themeCss() {
		return CssTheme._cssBuilder(this._rules, this._variables);
	}
	static get themeName() {
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
	
}
