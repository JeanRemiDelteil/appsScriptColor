export * from "./monaco";

declare global {
    interface Window {
        jsWireMonacoEditor: {
            _themeService: {
                _knownThemes: Map<string, {}>;
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
