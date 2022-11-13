export interface IRule {
    [cssPath: string]: {
        [cssProperty: string]: string;
    };
}
