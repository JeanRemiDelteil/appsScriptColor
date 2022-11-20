import { darculaTheme } from "./darcula.theme";

export const blackFoxConsoleTheme = darculaTheme.createFrom({
    themeName: "BlackFoxConsole",
    variables: {
        IDE_code_background: "#14171A",
        IDE_code_comment: "#5C6773",
        IDE_code_comment_doc: "#6a9955",
        IDE_code_string: "#BC8154",
        IDE_code_keyword: "#bbaa44",
        IDE_code_number: "#5F9F5B",
        IDE_code_class: "#3689B2",
        IDE_code_identifier: "#b589cc",
        IDE_code_delimiter: "#CDD7E0",
        IDE_code_regex: "#ff5500",
        IDE_code_html_tag: "#A673BF",
        IDE_code_html_attribute: "#3689B2",
        IDE_code_css_selector: "#555555",
    },
});
