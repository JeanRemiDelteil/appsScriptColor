import { CssTheme } from "../class/cssTheme";

export const darculaTheme = new CssTheme({
    themeName: "Darcula",
    isDarkTheme: true,
    variables: {
        IDE_code_background: "#2B2B2B",
        IDE_code_comment: "#888888",
        IDE_code_comment_doc: "#6a9955",
        IDE_code_string: "#6a8759",
        IDE_code_keyword: "#cc7832",
        IDE_code_number: "#6897bb",
        IDE_code_class: "#ffc66d",
        IDE_code_identifier: "#b589cc",
        IDE_code_delimiter: "#bbbbbb",
        IDE_code_regex: "#ff5500",
        IDE_code_html_tag: "#ffc66d",
        IDE_code_html_attribute: "#A772D0",
        IDE_code_css_selector: "#FF861E",
    },
    rules: {
        // // Page theme
        // 'c-wiz': {
        // 	'background-color': '#3c3f41',
        // },
        // 'c-wiz>div>div:first-child>div': {
        // 	'background-color': '#3c3f41',
        // },
        // 'header': {
        // 	'background-color': '#272727!important',
        // },
        //
        // // Folder fixes
        // '.asc_FolderRoot': {
        // 	'background-color': 'unset',
        // },

        // Monaco IDE fixes
        ".monaco-editor .reference-zone-widget .preview .reference-decoration":
            {
                "background-color": "#864b00b3",
            },
    },
    // Find help here: https://github.com/brijeshb42/monaco-themes/blob/master/themes/Monokai.json
    monacoTheme: {
        base: "vs-dark",
        inherit: true,
        rules: [
            {
                background: "IDE_code_background",
                token: "",
            },
            {
                foreground: "IDE_code_comment",
                token: "comment",
            },
            {
                foreground: "IDE_code_comment_doc",
                token: "comment.doc",
            },
            {
                foreground: "IDE_code_string",
                token: "string",
            },
            {
                foreground: "IDE_code_number",
                token: "number",
            },
            {
                foreground: "IDE_code_keyword",
                token: "keyword",
            },
            {
                foreground: "IDE_code_identifier",
                token: "identifier",
            },
            {
                foreground: "IDE_code_class",
                token: "type.identifier",
            },
            {
                foreground: "IDE_code_delimiter",
                token: "delimiter",
            },
            {
                foreground: "IDE_code_regex",
                token: "regexp",
            },
            {
                foreground: "IDE_code_html_tag",
                token: "tag.html",
            },
            {
                foreground: "IDE_code_html_attribute",
                token: "attribute.name.html",
            },
            {
                foreground: "IDE_code_string",
                token: "attribute.value.html",
            },
            {
                foreground: "IDE_code_comment",
                token: "metatag.html",
            },
            {
                foreground: "IDE_code_comment",
                token: "metatag.content.html",
            },
            {
                foreground: "IDE_code_css_selector",
                token: "tag.css",
            },
            {
                foreground: "IDE_code_html_attribute",
                token: "attribute.name.css",
            },
            {
                foreground: "IDE_code_string",
                token: "attribute.value.css",
            },
            {
                foreground: "IDE_code_identifier",
                token: "string.key.json",
            },
            {
                foreground: "IDE_code_string",
                token: "string.value.json",
            },
        ],
        colors: {
            "editor.foreground": "#bbbbbb",
            "editor.background": "IDE_code_background",
            "editor.selectionBackground": "#49483E",
            "editor.lineHighlightBackground": "#3E3D32",
            "editorCursor.foreground": "#F8F8F0",
            "editorWhitespace.foreground": "#3B3A32",
            "editorIndentGuide.activeBackground": "#9D550FB0",
            "editor.selectionHighlightBorder": "#222218",
        },
    },
});
