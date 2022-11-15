export const useTheme = (themeName: string) => {
    // console.log("Register SET", themeName);

    window.__ascInAppAction__ = {
        action: "SET",
        themeName,
    };

    window.__ascInAppService__?.doAction();
};
