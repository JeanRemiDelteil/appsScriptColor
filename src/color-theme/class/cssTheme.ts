import {
    ICreateThemeFromOptions,
    ICssThemeOptions,
    IMonacoTheme,
    IRule,
    IVariables,
} from "../interface";

export class CssTheme {
    private readonly _themeName: string;
    private readonly _variables: IVariables;
    private readonly _rules: IRule;
    private readonly _monacoTheme: IMonacoTheme;
    private readonly _rootTheme: string;

    constructor({
        themeName,
        variables,
        rules,
        monacoTheme,
        rootTheme = "",
    }: ICssThemeOptions) {
        this._themeName = themeName;
        this._variables = variables;
        this._rules = rules;
        this._monacoTheme = monacoTheme;
        this._rootTheme = rootTheme;
    }

    get css(): string {
        return CssTheme._cssBuilder(this._rules, this._variables);
    }

    get monacoTheme(): IMonacoTheme | undefined {
        return this._monacoTheme
            ? CssTheme._monacoThemeBuilder(this._monacoTheme, this._variables)
            : undefined;
    }

    get hasMonacoTheme(): boolean {
        return !!this._monacoTheme;
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
    private static _cssBuilder(rules: IRule, variables: IVariables): string {
        let cssSheet = "";

        for (let selector in rules) {
            // build one rule
            const cssSettings = rules[selector];
            let propertyStr = "";

            for (let property in cssSettings) {
                // replace declared variables
                propertyStr += `${property}:${cssSettings[property].replace(
                    /{{([^}{]+?)}}/g,
                    (m, p1) => (p1 in variables ? variables[p1] : m)
                )};`;
            }

            cssSheet += `${selector}{${propertyStr}}`;
        }

        return cssSheet;
    }

    private static _monacoThemeBuilder(
        theme: IMonacoTheme,
        variables: IVariables
    ): IMonacoTheme {
        function getRuleColorFromVariable(key: string): string | undefined {
            if (!key) return undefined;

            const color = variables[key];
            if (!color) return key;

            return color.replace(/^#/, "");
        }

        return {
            base: theme.base,
            inherit: theme.inherit,
            rules: theme.rules.map((rule) => {
                const ruleSet = {
                    ...rule,
                };

                let foreGround = getRuleColorFromVariable(rule.foreground);
                let backGround = getRuleColorFromVariable(rule.background);

                if (foreGround) ruleSet.foreground = foreGround;
                if (backGround) ruleSet.background = backGround;

                return ruleSet;
            }),
            colors: Object.keys(theme.colors).reduce((acc, key) => {
                acc[key] = variables[theme.colors[key]] || theme.colors[key];

                return acc;
            }, {} as { [key: string]: string }),
        };
    }

    /**
     * Convert class instance to a simple Object,
     * compatible with the class constructor
     *
     * Overridden when using createFrom()
     */
    toObject() {
        return {
            rootTheme: this._rootTheme,
            themeName: this._themeName,
            variables: this._variables,
            rules: this._rules,
            monacoTheme: this._monacoTheme,
        };
    }

    /**
     * Export the theme as JSON
     */
    toJSON(): string {
        return JSON.stringify(this.toObject());
    }

    /**
     * Create a new theme derived from the current one,
     *
     * the relationship remains, so that once exported to JSON
     * it does not include the parent duplicated information
     */
    createFrom({
        themeName,
        variables = {},
        rules = {},
    }: ICreateThemeFromOptions): CssTheme {
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
            rootTheme,
            monacoTheme: this._monacoTheme,
        });

        // Only export variation when stringifying a copied theme
        createdTheme.toObject = function () {
            return {
                rootTheme,
                themeName,
                variables,
                rules,
                monacoTheme: undefined,
            };
        };

        return createdTheme;
    }
}
