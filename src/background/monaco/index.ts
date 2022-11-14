export * from "./define-theme";
export * from "./insert-theme-action";

declare global {
    interface Window {
        jsWireMonacoEditor: {
            _themeService: {
                _knownThemes: Map<string, {}>;
            };

            _actions: {
                [key: string]: {
                    id: string;
                    label: string;
                    alias: string;
                };
            };

            addAction: (param: {
                id: string;
                label: string;

                precondition: null;
                keybindingContext: null;
                contextMenuGroupId: string;
                contextMenuOrder: number;

                run: () => void;
            }) => void;
            getAction: (id: string) => {};
        };

        monaco: {
            editor: {
                defineTheme: (themeName: string, theme: {}) => void;
                setTheme: (themeName: string) => void;
            };
        };
    }
}
