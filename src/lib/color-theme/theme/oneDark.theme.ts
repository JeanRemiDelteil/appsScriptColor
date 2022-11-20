import { darculaTheme } from "./darcula.theme";

export const oneDarkTheme = darculaTheme.createFrom({
    themeName: "OneDark",
    variables: {
        IDE_code_background: "#31343f",
        IDE_code_comment: "#616e88",
        IDE_code_comment_doc: "#6a9955",
        IDE_code_string: "#a3be8c",
        IDE_code_keyword: "#81a1c1",
        IDE_code_number: "#6897bb",
        IDE_code_class: "#f1f1f1",
        IDE_code_identifier: "#b589cc",
        IDE_code_delimiter: "#bbbbbb",
        IDE_code_regex: "#d08770",
        IDE_code_html_tag: "#ebcb8b",
        IDE_code_html_attribute: "#8fbcbb",
        IDE_code_css_selector: "#8fbcbb",
    },
});
